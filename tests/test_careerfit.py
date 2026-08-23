from backend.matcher import (
    find_skills,
    find_matching_skills,
    find_missing_skills,
    calculate_match_score
)

from backend.score import calculate_weighted_score

from backend.recommender import (
    prioritize_missing_skills,
    generate_recommendation
)



def test_false_c_detection():
    text = "I worked on cloud computing projects."

    skills = find_skills(text)

    assert "c" not in skills


def test_rest_api_normalization():
    text = "I have experience with REST APIs."

    skills = find_skills(text)

    assert "rest api" in skills


def test_zero_match():
    resume_skills = []
    job_skills = ["python", "sql"]

    matched = find_matching_skills(
        resume_skills,
        job_skills
    )

    assert matched == []


def test_perfect_match():
    resume_skills = ["python", "sql"]
    job_skills = ["python", "sql"]

    matched = find_matching_skills(
        resume_skills,
        job_skills
    )

    score = calculate_match_score(
        matched,
        job_skills
    )

    assert score == 100


def test_missing_skills():
    resume_skills = ["python"]
    job_skills = ["python", "sql", "docker"]

    missing = find_missing_skills(
        resume_skills,
        job_skills
    )

    assert missing == ["sql", "docker"]


def test_weighted_score():
    matched_skills = ["python", "git"]

    job_skills = ["python", "git", "sql"]

    job_weights = {
        "python": 5,
        "git": 3,
        "sql": 4
    }

    score = calculate_weighted_score(
        matched_skills,
        job_skills,
        job_weights
    )

    assert round(score, 2) == 66.67


def test_skill_priority():
    missing_skills = ["sql", "fastapi", "docker"]

    job_weights = {
        "sql": 4,
        "fastapi": 5,
        "docker": 2
    }

    priority = prioritize_missing_skills(
        missing_skills,
        job_weights
    )

    assert priority[0][0] == "fastapi"
    assert priority[1][0] == "sql"
    assert priority[2][0] == "docker"



def test_empty_resume():
    skills = find_skills("")

    assert skills == []


def test_empty_job_score():
    matched_skills = []
    job_skills = []

    score = calculate_match_score(
        matched_skills,
        job_skills
    )

    assert score == 0


def test_perfect_weighted_score():
    matched_skills = ["python", "sql"]
    job_skills = ["python", "sql"]

    job_weights = {
        "python": 5,
        "sql": 4
    }

    score = calculate_weighted_score(
        matched_skills,
        job_skills,
        job_weights
    )

    assert score == 100


def test_zero_weighted_score():
    matched_skills = []

    job_skills = ["python", "sql"]

    job_weights = {
        "python": 5,
        "sql": 4
    }

    score = calculate_weighted_score(
        matched_skills,
        job_skills,
        job_weights
    )

    assert score == 0


def test_full_careerfit_pipeline():

    # 1. Resume text
    resume = """
    Python
    Git
    GitHub
    REST APIs
    """

    # 2. Job description text
    job_description = """
    Python
    Git
    GitHub
    REST API
    SQL
    FastAPI
    Docker
    Linux
    """

    # 3. Extract skills from the resume
    resume_skills = find_skills(resume)

    # 4. Extract skills from the job description
    job_skills = find_skills(job_description)

    # 5. Find skills that both have
    matched_skills = find_matching_skills(
        resume_skills,
        job_skills
    )

    # 6. Find skills the candidate is missing
    missing_skills = find_missing_skills(
        resume_skills,
        job_skills
    )

    # 7. Calculate the basic CareerFit score
    basic_score = calculate_match_score(
        matched_skills,
        job_skills
    )

    # 8. Check the matched skills
    assert matched_skills == [
        "python",
        "git",
        "github",
        "rest api"
    ]

    # 9. Check the missing skills
    assert missing_skills == [
        "sql",
        "fastapi",
        "docker",
        "linux"
    ]

    # 10. Check the basic score
    assert basic_score == 50

    # 11. Job skill weights
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

    # 12. Calculate weighted score
    weighted_score = calculate_weighted_score(
        matched_skills,
        job_skills,
        job_weights
    )

    # 13. Prioritize missing skills
    priority_skills = prioritize_missing_skills(
        missing_skills,
        job_weights
    )

    # 14. Generate recommendations
    recommendations = generate_recommendation(
        priority_skills
    )

    # 15. Check weighted score
    assert round(weighted_score, 2) == 53.57

    # 16. Check priority order
    assert priority_skills == [
        ("fastapi", 5, "Critical"),
        ("sql", 4, "High"),
        ("docker", 2, "Useful"),
        ("linux", 2, "Useful")
    ]

    # 17. Check recommendations
    assert recommendations == [
        "Critical: Learn fastapi",
        "High: Learn sql",
        "Useful: Learn docker",
        "Useful: Learn linux"
    ]

  