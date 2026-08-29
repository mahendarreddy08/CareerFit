import asyncio
import logging

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

from .extractor import ExtractionError, extract_text_from_file
from .matcher import (
    calculate_match_score,
    find_matching_skills,
    find_missing_skills,
    find_skills,
)
from .recommender import generate_recommendation, prioritize_missing_skills
from .score import calculate_weighted_score


app = FastAPI()
logger = logging.getLogger(__name__)
MAX_REQUEST_SIZE = 12 * 1024 * 1024
MAX_RESUME_TEXT_CHARS = 200_000
MAX_JOB_DESCRIPTION_CHARS = 100_000
ANALYSIS_TIMEOUT_SECONDS = 30
analysis_semaphore = asyncio.Semaphore(1)


class CareerFitRequest(BaseModel):
    resume: str
    job_description: str


job_weights = {
    "python": 5,
    "fastapi": 5,
    "rest api": 5,
    "c": 4,
    "sql": 4,
    "git": 3,
    "github": 2,
    "docker": 2,
    "linux": 2,
}


def analyze_resume_text(resume: str, job_description: str):
    resume_text = (resume or "").strip()
    job_text = (job_description or "").strip()

    if len(resume_text) > MAX_RESUME_TEXT_CHARS or len(job_text) > MAX_JOB_DESCRIPTION_CHARS:
        raise HTTPException(status_code=413, detail="Resume or job description is too large to analyze.")

    resume_skills = find_skills(resume_text)
    job_skills = find_skills(job_text)

    matched_skills = find_matching_skills(resume_skills, job_skills)
    missing_skills = find_missing_skills(resume_skills, job_skills)

    basic_score = calculate_match_score(matched_skills, job_skills)
    weighted_score = calculate_weighted_score(matched_skills, job_skills, job_weights)
    priority_skills = prioritize_missing_skills(missing_skills, job_weights)
    recommendations = generate_recommendation(priority_skills)

    logger.info(
        "Analysis input: resume_chars=%d job_chars=%d resume_skills=%s job_skills=%s matched=%s basic_score=%.2f weighted_score=%.2f",
        len(resume_text),
        len(job_text),
        resume_skills,
        job_skills,
        matched_skills,
        basic_score,
        weighted_score,
    )

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "basic_score": round(basic_score, 2),
        "weighted_score": round(weighted_score, 2),
        "skill_gap_priority": priority_skills,
        "recommendations": recommendations,
    }


@app.get("/")
def home():
    return {"message": "CareerFit API is running"}


@app.middleware("http")
async def limit_request_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length:
        try:
            if int(content_length) > MAX_REQUEST_SIZE:
                return JSONResponse(status_code=413, content={"detail": "Request is too large."})
        except ValueError:
            return JSONResponse(status_code=400, content={"detail": "Invalid Content-Length header."})
    return await call_next(request)


@app.post("/analyze")
async def analyze(request: CareerFitRequest):
    try:
        async with analysis_semaphore:
            return await asyncio.wait_for(
                run_in_threadpool(analyze_resume_text, request.resume, request.job_description),
                timeout=ANALYSIS_TIMEOUT_SECONDS,
            )
    except asyncio.TimeoutError as exc:
        raise HTTPException(status_code=504, detail="Analysis timed out. Please try a smaller input and retry.") from exc


@app.post("/analyze-file")
async def analyze_file(
    resume_file: UploadFile = File(...),
    job_description: str = Form(...),
):
    if not job_description or not job_description.strip():
        raise HTTPException(status_code=400, detail="Job description is required.")

    try:
        async with analysis_semaphore:
            extracted_text = await asyncio.wait_for(
                run_in_threadpool(extract_text_from_file, resume_file.file, resume_file.filename),
                timeout=ANALYSIS_TIMEOUT_SECONDS,
            )
            result = await asyncio.wait_for(
                run_in_threadpool(analyze_resume_text, extracted_text, job_description),
                timeout=ANALYSIS_TIMEOUT_SECONDS,
            )
    except asyncio.TimeoutError as exc:
        raise HTTPException(status_code=504, detail="Analysis timed out. Please try a smaller input and retry.") from exc
    except ExtractionError as exc:
        status_code = 415 if "unsupported file type" in str(exc).lower() else 400
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc

    if not extracted_text.strip():
        raise HTTPException(status_code=400, detail="The uploaded resume file is empty or could not be read.")

    logger.info(
        "Resume extraction: filename=%s extracted_chars=%d preview=%r",
        resume_file.filename,
        len(extracted_text),
        extracted_text[:160],
    )

    return result