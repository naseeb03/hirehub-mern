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
chroma_client = chromadb.PersistentClient(path="./data")
embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
collection = chroma_client.get_or_create_collection(
    name="job_applicants",
    embedding_function=embedding_function
)

# Download NLTK data for tokenization
nltk.download('punkt')

# Pydantic models
class CVUpload(BaseModel):
    cloudinary_url: str
    filename: str
    job_id: str  # To associate CV with job application
    applicant_id: str  # Applicant ID from MongoDB

class CVQuery(BaseModel):
    query: str  # e.g., "MERN stack with 3 years of experience"
    job_id: str  # To filter CVs by job

# Function to fetch and extract text from Cloudinary PDF URL
def extract_text_from_cloudinary(url: str) -> str:
    try:
        # Fetch the PDF from Cloudinary
        response = requests.get(url)
        response.raise_for_status()
        
        # Read PDF content
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
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing CV from URL: {str(e)}")

# Endpoint to process CV from Cloudinary URL and store in ChromaDB
@app.post("/upload_cv/")
async def upload_cv(cv_data: CVUpload):
    # Extract text from Cloudinary URL
    cv_text = extract_text_from_cloudinary(cv_data.cloudinary_url)

    # Use the provided applicant_id from MongoDB
    applicant_id = cv_data.applicant_id

    # Store in ChromaDB as a single document
    try:
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

# Endpoint to query applicants by general query for a specific job
@app.post("/search_applicants/")
async def search_applicants(query: CVQuery):
    if not query.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    if not query.job_id.strip():
        raise HTTPException(status_code=400, detail="Job ID cannot be empty")

    try:
        # Query ChromaDB for top 5 matching CVs filtered by job_id
        results = collection.query(
            query_texts=[query.query],
            n_results=5,
            where={"job_id": query.job_id}  # Filter by job_id
        )

        # Process results to return only applicant IDs
        applicant_ids = [metadata["applicant_id"] for metadata in results["metadatas"][0]]

        return {"applicant_ids": applicant_ids}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying applicants: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}