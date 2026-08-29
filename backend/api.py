import logging

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel

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


@app.post("/analyze")
def analyze(request: CareerFitRequest):
    return analyze_resume_text(request.resume, request.job_description)


@app.post("/analyze-file")
async def analyze_file(
    resume_file: UploadFile = File(...),
    job_description: str = Form(...),
):
    if not job_description or not job_description.strip():
        raise HTTPException(status_code=400, detail="Job description is required.")

    try:
        extracted_text = extract_text_from_file(resume_file.file, resume_file.filename)
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

    return analyze_resume_text(extracted_text, job_description)