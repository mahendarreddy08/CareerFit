"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { analyzeCareerFit, CareerFitResponse } from "@/lib/api"

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export function AnalyzeForm() {
  const router = useRouter()
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  function handleFile(file: File | undefined) {
    if (!file) return

    const isSupportedType = /\.pdf$/i.test(file.name) || /\.docx$/i.test(file.name)
    if (!isSupportedType) {
      setSelectedFile(null)
      setFileError("Please choose a PDF or DOCX file.")
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setSelectedFile(null)
      setFileError("Your file is too large. Please upload a resume smaller than 10 MB.")
      return
    }

    setFileError(null)
    setSelectedFile(file)
    setResumeText("")
    setSubmitError(null)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const hasResumeText = resumeText.trim().length > 0
    const hasFile = selectedFile !== null

    if (!hasResumeText && !hasFile) {
      setSubmitError("Add your resume by uploading a PDF/DOCX or pasting the text.")
      return
    }

    if (!jobDescription.trim()) {
      setSubmitError("Add the job description for the role you want to target.")
      return
    }

    setSubmitError(null)
    setIsAnalyzing(true)

    try {
      const result: CareerFitResponse = hasFile
        ? await analyzeCareerFit({
            file: selectedFile,
            job_description: jobDescription.trim(),
          })
        : await analyzeCareerFit({
            resume: resumeText.trim(),
            job_description: jobDescription.trim(),
          })

      sessionStorage.setItem("careerfit-analysis", JSON.stringify(result))
      router.push("/analyzing")
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "CareerFit could not complete this analysis. Please try again.")
      setIsAnalyzing(false)
    }
  }

  const canAnalyze = Boolean((resumeText.trim() || selectedFile) && jobDescription.trim())

  return (
    <form onSubmit={handleSubmit} className="workflow-page editorial-shell">
      <header className="workflow-header">
        <p className="eyebrow">CareerFit / New analysis</p>
        <h1>Compare your experience with the role you want.</h1>
        <p>Give CareerFit your context. We&apos;ll show you what matches, what is missing, and what to do next.</p>
      </header>
      <div className="workflow-grid">
        <header>
          <p className="workflow-number">01 / Your resume</p>
          <p className="workflow-note">Upload a resume file or paste your experience directly.</p>
        </header>
        <div className="workflow-fields">
          <section className="workflow-section">
            <div className="field-heading"><h2 className="field-label">Upload resume</h2><span className="field-meta">PDF / DOCX</span></div>
            <label htmlFor="resume-upload" className={`upload-zone ${selectedFile ? "upload-zone-filled" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files[0]) }}>
              <span className="upload-title">{selectedFile ? selectedFile.name : "Click to upload or drag and drop"}</span>
              <span className="upload-support">PDF or DOCX / paste text below to analyze</span>
              <input id="resume-upload" type="file" accept=".pdf,.docx" className="sr-only" onChange={(event) => handleFile(event.target.files?.[0])} />
            </label>
            {selectedFile && (
              <div className="file-summary">
                <p className="form-hint">File: {selectedFile.name}</p>
                <p className="form-hint">Type: {selectedFile.type || (selectedFile.name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}</p>
                <p className="form-hint">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <button type="button" className="file-action" onClick={() => setSelectedFile(null)}>Remove file</button>
              </div>
            )}
            {fileError && <p className="form-error">{fileError}</p>}
            <div className="paste-row"><button type="button" onClick={() => document.getElementById("resume-text")?.focus()} className="secondary-action">Or paste resume text</button></div>
            <textarea id="resume-text" value={resumeText} onChange={(event) => setResumeText(event.target.value)} placeholder="Paste your resume text here" rows={5} className="workflow-textarea" />
            {selectedFile && !resumeText.trim() && <p className="form-hint">Resume file ready. Click Analyze when your job description is ready.</p>}
          </section>
          <section className="workflow-section">
            <div className="field-heading"><h2 className="field-label">02 / Target role</h2><span className="field-meta">Job description</span></div>
            <textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the job description here" rows={10} className="workflow-textarea workflow-textarea-large" />
          </section>
          <section className="workflow-section workflow-submit">
            <p className="field-label">03 / Analyze</p>
            {submitError && <p className="form-error">{submitError}</p>}
            <button type="submit" disabled={isAnalyzing || !canAnalyze} className="primary-action primary-action-wide">{isAnalyzing ? "Analyzing your fit..." : "Analyze my fit →"}</button>
            {!submitError && !canAnalyze && <p className="form-hint">{selectedFile ? "Add the job description to continue." : !resumeText.trim() ? "Paste your resume text or add a PDF/DOCX resume to continue." : "Add the job description to continue."}</p>}
          </section>
        </div>
      </div>
    </form>
  )
}
