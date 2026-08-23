from .extractor import read_file 
from .matcher import find_skills, find_matching_skills ,find_missing_skills, calculate_match_score
from .score import calculate_weighted_score
from .recommender import prioritize_missing_skills, generate_recommendation


resume = read_file("input/resume.txt")


job_description = read_file("input/job_description.txt")



resume_skills = find_skills(resume)
job_skills = find_skills(job_description)

matched_skills = find_matching_skills(resume_skills,job_skills)
missing_skills = find_missing_skills(resume_skills,job_skills)



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

basic_score = calculate_match_score(matched_skills, job_skills)
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



print("Resume skills:", resume_skills)

print("Job skills:", job_skills)

print("Matched skills:", matched_skills)

print("Missing skills:", missing_skills)

print("Basic CareerFit Score:", round(basic_score, 2), "%")

print("Weighted CareerFit Score:", round(weighted_score, 2), "%")

print("Skill Gap Priority:", priority_skills)

print("Recommendations:")
for recommendation in recommendations:
    print("-", recommendation)











