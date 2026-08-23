import re

skills_list = [
    "python",
    "c",
    "git",
    "github",
    "rest api",
    "sql",
    "fastapi",
    "docker",
    "linux"
]

skill_aliases = {
    "rest apis": "rest api",
    "restful api": "rest api"
}




def normalize_text(txt):
    txt = txt.lower()

    for alias, canonical in skill_aliases.items():
        txt = txt.replace(alias, canonical)

    return txt


def find_skills(txt):
    skills = []
    txt = normalize_text(txt)

    for skill in skills_list:
        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, txt):
            skills.append(skill)

    return skills

def find_matching_skills(resume_skills,job_skills):
    match = []

    for skill in job_skills:
        if skill in resume_skills:
            match.append(skill)
    return match


def find_missing_skills(resume_skills,job_skills):
    missing = []

    for skill in job_skills:
        if skill not in resume_skills:
            missing.append(skill)

    return missing 

def calculate_match_score(matched_skills, job_skils):
    if len(job_skils) == 0:
        return 0

    score = (len(matched_skills)  / len(job_skils)) * 100

    return score


