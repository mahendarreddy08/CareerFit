from fastapi import FastAPI
from pydantic import BaseModel

from .matcher import (
    find_skills,
    find_matching_skills,
    find_missing_skills,
    calculate_match_score
)

from .score import calculate_weighted_score

from .recommender import (
    prioritize_missing_skills,
    generate_recommendation
)


app = FastAPI()


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
    "linux": 2
}


@app.get("/")
def home():
    return {
        "message": "CareerFit API is running"
    }


@app.post("/analyze")
def analyze(request: CareerFitRequest):

    resume_skills = find_skills(request.resume)

    job_skills = find_skills(request.job_description)

    matched_skills = find_matching_skills(
        resume_skills,
        job_skills
    )

    missing_skills = find_missing_skills(
        resume_skills,
        job_skills
    )

    basic_score = calculate_match_score(
        matched_skills,
        job_skills
    )

    weighted_score = calculate_weighted_score(
        matched_skills,
        job_skills,
        job_weights
    )

    priority_skills = prioritize_missing_skills(
        missing_skills,
        job_weights
    )

    recommendations = generate_recommendation(
        priority_skills
    )

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "basic_score": round(basic_score, 2),
        "weighted_score": round(weighted_score, 2),
        "skill_gap_priority": priority_skills,
        "recommendations": recommendations
    }