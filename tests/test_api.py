from io import BytesIO

from docx import Document
from fastapi.testclient import TestClient
from pypdf import PdfWriter

from backend.api import app


client = TestClient(app)


def make_pdf_bytes(text: str) -> bytes:
    content = (
        "BT\n"
        "/F1 12 Tf\n"
        "50 100 Td\n"
        f"({text}) Tj\n"
        "ET\n"
    ).encode("utf-8")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
        f"<< /Length {len(content)} >>\nstream\n".encode("latin-1") + content + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ]

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for idx, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{idx} 0 obj\n".encode("latin-1"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_start = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("latin-1"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("latin-1"))
    pdf.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode("latin-1"))
    return bytes(pdf)


def make_docx_bytes(text: str) -> bytes:
    document = Document()
    document.add_paragraph(text)
    buffer = BytesIO()
    document.save(buffer)
    return buffer.getvalue()


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


def test_extract_pdf_resume_file():
    response = client.post(
        "/analyze-file",
        data={
            "job_description": "Python SQL FastAPI",
        },
        files={
            "resume_file": ("resume.pdf", make_pdf_bytes("Python Git FastAPI"), "application/pdf")
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert "python" in data["matched_skills"]
    assert "fastapi" in data["matched_skills"]
    assert data["basic_score"] >= 0


def test_extract_docx_resume_file():
    response = client.post(
        "/analyze-file",
        data={
            "job_description": "Python SQL FastAPI",
        },
        files={
            "resume_file": ("resume.docx", make_docx_bytes("Python Git FastAPI"), "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert "python" in data["matched_skills"]
    assert "fastapi" in data["matched_skills"]


def test_empty_resume_file():
    response = client.post(
        "/analyze-file",
        data={
            "job_description": "Python SQL FastAPI",
        },
        files={
            "resume_file": ("empty.pdf", b"", "application/pdf")
        },
    )

    assert response.status_code == 400
    assert "empty" in response.json()["detail"].lower()


def test_unsupported_resume_file_type():
    response = client.post(
        "/analyze-file",
        data={
            "job_description": "Python SQL FastAPI",
        },
        files={
            "resume_file": ("resume.txt", b"Python Git", "text/plain")
        },
    )

    assert response.status_code == 415
    assert "pdf or docx" in response.json()["detail"].lower()