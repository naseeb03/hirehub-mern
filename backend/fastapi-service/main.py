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
import logging
from google.api_core.exceptions import ResourceExhausted
import aiohttp

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
XAI_API_KEY = os.getenv("XAI_API_KEY")
if not GEMINI_API_KEY:
    logger.error("GEMINI_API_KEY not found in .env file")
    raise ValueError("GEMINI_API_KEY not found in .env file")
if not XAI_API_KEY:
    logger.error("XAI_API_KEY not found in .env file")
    raise ValueError("XAI_API_KEY not found in .env file")

# Configure Gemini API
try:
    configure(api_key=GEMINI_API_KEY)
    logger.info("Gemini API configured successfully")
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {str(e)}")
    raise

# Initialize FastAPI app
app = FastAPI(title="Job Marketplace CV Search API")

# Enable CORS to allow requests from MERN frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ChromaDB client and collection
try:
    chroma_client = chromadb.PersistentClient(path="./data")
    embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
    collection = chroma_client.get_or_create_collection(
        name="job_applicants",
        embedding_function=embedding_function
    )
    logger.info("ChromaDB initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize ChromaDB: {str(e)}")
    raise

# Download NLTK data for tokenization
try:
    nltk.download('punkt')
    logger.info("NLTK data downloaded successfully")
except Exception as e:
    logger.error(f"Failed to download NLTK data: {str(e)}")
    raise

# Pydantic models
class CVUpload(BaseModel):
    cloudinary_url: str
    filename: str
    job_id: str  # To associate CV with job application
    applicant_id: str  # Applicant ID from MongoDB

class CVQuery(BaseModel):
    query: str  # e.g., "Shopify specialist"
    job_id: str  # To filter CVs by job

# Function to fetch and extract text from Cloudinary PDF URL
def extract_text_from_cloudinary(url: str) -> str:
    try:
        logger.debug(f"Fetching PDF from Cloudinary URL: {url}")
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
            logger.warning("CV is empty or unreadable")
            raise ValueError("CV is empty or unreadable")
        logger.debug(f"Extracted text length: {len(text)} characters")
        return text
    except Exception as e:
        logger.error(f"Error processing CV from URL: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error processing CV from URL: {str(e)}")

# Function to call xAI Grok API
async def call_xai_llm(query: str, cvs: list, applicant_ids: list) -> dict:
    logger.debug(f"Calling xAI Grok API with query: {query}, CV count: {len(cvs)}")
    
    prompt = f"""
    You are a hiring expert evaluating CVs for a job requiring a '{query}'. 
    Below are up to 5 CVs with their applicant IDs. Your task is:
    1. Determine if any CVs are relevant to the query.
    2. If no CVs are relevant, return an empty array.
    3. If any CVs are relevant, rank them by how well they fulfill the query (most relevant first).
    4. For each relevant CV, provide a short statement (1-2 sentences) explaining why it fulfills the query.

    CVs:
    {json.dumps({aid: cv[:1000] for aid, cv in zip(applicant_ids, cvs)}, indent=2)}  # Truncate CVs to 1000 chars

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
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                "https://api.x.ai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {XAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "grok-3",
                    "messages": [{"role": "user", "content": prompt}],
                    "response_format": {"type": "json_object"},
                    "max_tokens": 500,
                    "temperature": 0.3
                }
            ) as response:
                response.raise_for_status()
                result = await response.json()
                logger.debug(f"xAI Grok response received: {json.dumps(result)[:100]}...")
                # Extract the JSON content from the response
                content = result.get("choices", [{}])[0].get("message", {}).get("content", "{}")
                try:
                    parsed_result = json.loads(content)
                    if not isinstance(parsed_result, dict) or "applicants" not in parsed_result:
                        logger.warning("Invalid xAI Grok response format")
                        return {"applicants": []}
                    logger.info(f"xAI Grok returned {len(parsed_result['applicants'])} relevant applicants")
                    return parsed_result
                except json.JSONDecodeError as e:
                    logger.error(f"Failed to parse xAI Grok JSON response: {str(e)}")
                    return {"applicants": []}
        except Exception as e:
            logger.error(f"xAI Grok API error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"xAI Grok API error: {str(e)}")

# Function to call LLM (tries Gemini, falls back to xAI Grok on quota error)
async def call_llm(query: str, cvs: list, applicant_ids: list) -> dict:
    logger.debug(f"Calling Gemini API with query: {query}, CV count: {len(cvs)}")
    
    # Construct prompt for Gemini
    prompt = f"""
    You are a hiring expert evaluating CVs for a job requiring a '{query}'. 
    Below are up to 5 CVs with their applicant IDs. Your task is:
    1. Determine if any CVs are relevant to the query.
    2. If no CVs are relevant, return an empty array.
    3. If any CVs are relevant, rank them by how well they fulfill the query (most relevant first).
    4. For each relevant CV, provide a short statement (1-2 sentences) explaining why it fulfills the query.

    CVs:
    {json.dumps({aid: cv[:1000] for aid, cv in zip(applicant_ids, cvs)}, indent=2)}  # Truncate CVs to 1000 chars

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
    
    # Try Gemini API first
    try:
        model = GenerativeModel("gemini-2.0-flash")
        logger.debug("Gemini model initialized")
        
        response = model.generate_content(
            prompt,
            generation_config={
                "response_mime_type": "application/json",
                "temperature": 0.3,
                "max_output_tokens": 500,
            }
        )
        
        logger.debug(f"Gemini response received: {response.text[:100]}...")
        try:
            result = json.loads(response.text)
            if not isinstance(result, dict) or "applicants" not in result:
                logger.warning("Invalid Gemini response format")
                return {"applicants": []}
            logger.info(f"Gemini returned {len(result['applicants'])} relevant applicants")
            return result
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse Gemini JSON response: {str(e)}")
            return {"applicants": []}
        
    except ResourceExhausted as e:
        logger.warning(f"Gemini quota exceeded: {str(e)}. Falling back to xAI Grok API.")
        # Fall back to xAI Grok API
        return await call_xai_llm(query, cvs, applicant_ids)
    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")

# Endpoint to process CV from Cloudinary URL and store in ChromaDB
@app.post("/upload_cv/")
async def upload_cv(cv_data: CVUpload):
    try:
        logger.debug(f"Uploading CV for applicant_id: {cv_data.applicant_id}")
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
        logger.info(f"CV uploaded successfully for applicant_id: {applicant_id}")
        return {"message": "CV processed successfully", "applicant_id": applicant_id}
    except Exception as e:
        logger.error(f"Error storing CV: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error storing CV: {str(e)}")

# Endpoint to query applicants by general query for a specific job
@app.post("/search_applicants/")
async def search_applicants(query: CVQuery):
    logger.debug(f"Received search request: query={query.query}, job_id={query.job_id}")
    
    if not query.query.strip():
        logger.warning("Query is empty")
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    if not query.job_id.strip():
        logger.warning("Job ID is empty")
        raise HTTPException(status_code=400, detail="Job ID cannot be empty")

    try:
        # Query ChromaDB for top 5 matching CVs filtered by job_id
        logger.debug("Querying ChromaDB")
        results = collection.query(
            query_texts=[query.query],
            n_results=5,
            where={"job_id": query.job_id}
        )
        logger.debug(f"ChromaDB returned {len(results['documents'][0])} results")

        # Extract CV texts and applicant IDs
        cv_texts = results["documents"][0]
        applicant_ids = [metadata["applicant_id"] for metadata in results["metadatas"][0]]

        if not cv_texts:
            logger.info("No CVs found in ChromaDB")
            return {"applicants": []}

        # Call LLM (Gemini or xAI Grok)
        llm_result = await call_llm(query, cv_texts, applicant_ids)
        logger.info("Search completed successfully")
        print(llm_result)
        return llm_result
    except Exception as e:
        logger.error(f"Error querying applicants: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error querying applicants: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    logger.debug("Health check requested")
    return {"status": "healthy"}