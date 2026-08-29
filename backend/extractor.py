import io
import zipfile

from docx import Document
from pypdf import PdfReader

MAX_FILE_SIZE = 10 * 1024 * 1024


class ExtractionError(ValueError):
    """Raised when a resume file cannot be read or is not supported."""


def read_file(filename):
    with open(filename, "r", encoding="utf-8", errors="ignore") as file:
        return file.read()


def _is_supported_pdf(file_bytes):
    return file_bytes.startswith(b"%PDF")


def _is_supported_docx(file_bytes):
    source = file_bytes if hasattr(file_bytes, "read") else io.BytesIO(file_bytes)
    try:
        source.seek(0)
        with zipfile.ZipFile(source) as archive:
            return "word/document.xml" in archive.namelist()
    except zipfile.BadZipFile:
        return False
    finally:
        if hasattr(file_bytes, "read"):
            source.seek(0)


def _validate_uploaded_file(file_bytes, filename):
    if not file_bytes:
        raise ExtractionError("The uploaded resume file is empty.")

    if len(file_bytes) > MAX_FILE_SIZE:
        raise ExtractionError("The uploaded resume file is too large. Please use a file smaller than 10 MB.")

    normalized_name = (filename or "").lower()

    if normalized_name.endswith(".pdf"):
        if not _is_supported_pdf(file_bytes):
            raise ExtractionError("The uploaded PDF file is unreadable or corrupt.")
        return

    if normalized_name.endswith(".docx"):
        if not _is_supported_docx(file_bytes):
            raise ExtractionError("The uploaded DOCX file is unreadable or corrupt.")
        return

    raise ExtractionError("Unsupported file type. Please upload a PDF or DOCX resume.")


def extract_text_from_pdf(file_bytes):
    try:
        source = file_bytes if hasattr(file_bytes, "read") else io.BytesIO(file_bytes)
        source.seek(0)
        reader = PdfReader(source)
        pages = []
        for page in reader.pages:
            text = page.extract_text() or ""
            if text.strip():
                pages.append(text)
        return "\n".join(pages).strip()
    except Exception as exc:  # pragma: no cover - defensive branch
        raise ExtractionError("The uploaded PDF could not be read. Please upload a valid PDF resume.") from exc


def extract_text_from_docx(file_bytes):
    try:
        source = file_bytes if hasattr(file_bytes, "read") else io.BytesIO(file_bytes)
        source.seek(0)
        document = Document(source)
    except Exception as exc:  # pragma: no cover - defensive branch
        raise ExtractionError("The uploaded DOCX could not be read. Please upload a valid DOCX resume.") from exc

    paragraphs = []
    for paragraph in document.paragraphs:
        text = paragraph.text.strip()
        if text:
            paragraphs.append(text)

    for table in document.tables:
        for row in table.rows:
            cells = [cell.text.strip() for cell in row.cells if cell.text and cell.text.strip()]
            if cells:
                paragraphs.append(" ".join(cells))

    return "\n".join(paragraphs).strip()


def extract_text_from_file(file_obj, filename=None):
    resolved_filename = filename or getattr(file_obj, "filename", "") or ""

    if hasattr(file_obj, "read"):
        stream = file_obj
        try:
            stream.seek(0, io.SEEK_END)
            file_size = stream.tell()
            stream.seek(0)
            file_header = stream.read(4)
            stream.seek(0)
        except (AttributeError, OSError) as exc:
            raise ExtractionError("The uploaded resume file could not be read.") from exc

        if file_size == 0:
            raise ExtractionError("The uploaded resume file is empty.")
        if file_size > MAX_FILE_SIZE:
            raise ExtractionError("The uploaded resume file is too large. Please use a file smaller than 10 MB.")

        normalized_name = resolved_filename.lower()
        if normalized_name.endswith(".pdf"):
            if file_header != b"%PDF":
                raise ExtractionError("The uploaded PDF file is unreadable or corrupt.")
            return extract_text_from_pdf(stream)
        if normalized_name.endswith(".docx"):
            if not _is_supported_docx(stream):
                raise ExtractionError("The uploaded DOCX file is unreadable or corrupt.")
            return extract_text_from_docx(stream)

        raise ExtractionError("Unsupported file type. Please upload a PDF or DOCX resume.")

    file_bytes = file_obj
    if isinstance(file_bytes, str):
        file_bytes = file_bytes.encode("utf-8")
    if file_bytes is None:
        raise ExtractionError("The uploaded resume file is empty.")

    _validate_uploaded_file(file_bytes, resolved_filename)

    normalized_name = resolved_filename.lower()
    if normalized_name.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)
    if normalized_name.endswith(".docx"):
        return extract_text_from_docx(file_bytes)

    raise ExtractionError("Unsupported file type. Please upload a PDF or DOCX resume.")

