from fastapi.testclient import TestClient

from backend.api import app


client = TestClient(app)


def test_analyze_endpoint():

    response = client.post(
        "/analyze",
        json={
            "resume": "Python\nGit\nGitHub\nREST APIs",
            "job_description": (
                "Python\n"
                "Git\n"
                "GitHub\n"
                "REST API\n"
                "SQL\n"
                "FastAPI\n"
                "Docker\n"
                "Linux"
            )
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["basic_score"] == 50

    assert data["weighted_score"] == 53.57

    assert data["matched_skills"] == [
        "python",
        "git",
        "github",
        "rest api"
    ]

    assert data["missing_skills"] == [
        "sql",
        "fastapi",
        "docker",
        "linux"
    ]

def test_empty_resume():
    response = client.post(
        "/analyze",
        json={
            "resume": "",
            "job_description": "Python\nSQL\nFastAPI"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["resume_skills"] == []
    assert data["matched_skills"] == []
    assert data["basic_score"] == 0
    assert data["weighted_score"] == 0


def test_empty_job_description():
    response = client.post(
        "/analyze",
        json={
            "resume": "Python\nGit\nGitHub",
            "job_description": ""
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["job_skills"] == []
    assert data["matched_skills"] == []
    assert data["missing_skills"] == []
    assert data["basic_score"] == 0
    assert data["weighted_score"] == 0


def test_missing_required_field():
    response = client.post(
        "/analyze",
        json={
            "resume": "Python\nGit"
        }
    )

    assert response.status_code == 422