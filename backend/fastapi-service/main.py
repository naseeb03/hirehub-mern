from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
from chromadb.utils import embedding_functions
import requests
import PyPDF2
import nltk
from sentence_transformers import SentenceTransformer
import io
import json
import os
from dotenv import load_dotenv
from google.generativeai import GenerativeModel, configure
from google.api_core.exceptions import ResourceExhausted
import aiohttp

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
HAS_GEMINI_KEY = bool(GEMINI_API_KEY)

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env file")

if HAS_GEMINI_KEY:
    configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="Job Marketplace CV Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chroma_client = chromadb.PersistentClient(path="./data")
embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
collection = chroma_client.get_or_create_collection(
    name="job_applicants",
    embedding_function=embedding_function
)

nltk.download('punkt')

class CVUpload(BaseModel):
    cloudinary_url: str
    filename: str
    job_id: str
    applicant_id: str

class CVQuery(BaseModel):
    query: str
    job_id: str

def extract_text_from_cloudinary(url: str) -> str:
    response = requests.get(url)
    response.raise_for_status()
    
    pdf_file = io.BytesIO(response.content)
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"
    
    if not text.strip():
        raise ValueError("CV is empty or unreadable")
    return text

def construct_prompt(query: str, cvs: list, applicant_ids: list) -> str:
    return f"""
    You are a hiring expert evaluating CVs for a job requiring a '{query}'. 
    Below are up to 5 CVs with their applicant IDs. Your task is:
    1. Determine if any CVs are relevant to the query.
    2. If no CVs are relevant, return an empty array.
    3. If any CVs are relevant, rank them by how well they fulfill the query (most relevant first).
    4. For each relevant CV, provide a short statement (1-2 sentences) explaining why it fulfills the query.

    CVs:
    {json.dumps({aid: cv[:1000] for aid, cv in zip(applicant_ids, cvs)}, indent=2)}

    Return a JSON object with:
    - 'applicants': A list of objects with 'applicant_id' and 'statement' for each relevant CV, sorted by relevance.
    - If no CVs are relevant, return {{'applicants': []}}.
    
    Example output:
    {{
      "applicants": [
        {{"applicant_id": "id1", "statement": "This applicant has 3 years of Shopify experience."}},
        {{"applicant_id": "id2", "statement": "This applicant has 1 year of Shopify work."}}
      ]
    }}
    """

async def call_groq_llm(query: str, cvs: list, applicant_ids: list) -> dict:
    prompt = construct_prompt(query, cvs, applicant_ids)
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                    "messages": [{"role": "user", "content": prompt}],
                    "response_format": {"type": "json_object"},
                    "max_tokens": 500,
                    "temperature": 0.3
                }
            ) as response:
                status = response.status
                content = await response.text()
                if status != 200:
                    raise HTTPException(status_code=500, detail=f"Groq API request failed: {content}")
                
                result = await response.json()
                content = result.get("choices", [{}])[0].get("message", {}).get("content", "{}")
                try:
                    parsed_result = json.loads(content)
                    if not isinstance(parsed_result, dict) or "applicants" not in parsed_result:
                        return {"applicants": []}
                    return parsed_result
                except json.JSONDecodeError:
                    return {"applicants": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

async def call_llm(query: str, cvs: list, applicant_ids: list) -> dict:
    if not HAS_GEMINI_KEY:
        return await call_groq_llm(query, cvs, applicant_ids)
    
    prompt = construct_prompt(query, cvs, applicant_ids)
    try:
        model = GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(
            prompt,
            generation_config={
                "response_mime_type": "application/json",
                "temperature": 0.3,
                "max_output_tokens": 500,
            }
        )
        try:
            result = json.loads(response.text)
            if not isinstance(result, dict) or "applicants" not in result:
                return {"applicants": []}
            return result
        except json.JSONDecodeError:
            return {"applicants": []}
    except ResourceExhausted:
        return await call_groq_llm(query, cvs, applicant_ids)
    except Exception:
        return await call_groq_llm(query, cvs, applicant_ids)

@app.post("/upload_cv/")
async def upload_cv(cv_data: CVUpload):
    try:
        cv_text = extract_text_from_cloudinary(cv_data.cloudinary_url)
        applicant_id = cv_data.applicant_id
        collection.add(
            documents=[cv_text],
            metadatas=[{
                "applicant_id": applicant_id,
                "filename": cv_data.filename,
                "cloudinary_url": cv_data.cloudinary_url,
                "job_id": cv_data.job_id
            }],
            ids=[applicant_id]
        )
        return {"message": "CV processed successfully", "applicant_id": applicant_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error storing CV: {str(e)}")

@app.post("/search_applicants/")
async def search_applicants(query: CVQuery):
    if not query.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    if not query.job_id.strip():
        raise HTTPException(status_code=400, detail="Job ID cannot be empty")
    try:
        results = collection.query(
            query_texts=[query.query],
            n_results=5,
            where={"job_id": query.job_id}
        )
        cv_texts = results["documents"][0]
        applicant_ids = [metadata["applicant_id"] for metadata in results["metadatas"][0]]
        if not cv_texts:
            return {"applicants": []}
        llm_result = await call_llm(query.query, cv_texts, applicant_ids)
        return llm_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying applicants: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}