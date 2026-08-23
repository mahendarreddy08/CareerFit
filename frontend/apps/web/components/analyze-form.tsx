"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { analyzeCareerFit, CareerFitResponse } from "@/lib/api"

export function AnalyzeForm() {
  const router = useRouter()
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  function handleFile(file: File | undefined) {
    if (!file) return
    if (!/\.(pdf|docx)$/i.test(file.name)) {
      setFileName(null)
      setFileError("Please choose a PDF or DOCX file.")
      return
    }
    setFileError(null)
    setFileName(file.name)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!resumeText.trim()) {
      setSubmitError(fileName ? "This file is selected, but file text extraction is not available yet. Paste your resume text to continue." : "Add your resume by pasting the text.")
      return
    }
    if (!jobDescription.trim()) {
      setSubmitError("Add the job description for the role you want to target.")
      return
    }
    setSubmitError(null)
    setIsAnalyzing(true)
    try {
      const result: CareerFitResponse = await analyzeCareerFit({
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

  const canAnalyze = Boolean(resumeText.trim()) && Boolean(jobDescription.trim())

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
          <p className="workflow-note">Start with a resume file or paste your experience directly.</p>
        </header>
        <div className="workflow-fields">
          <section className="workflow-section">
            <div className="field-heading"><h2 className="field-label">Upload resume</h2><span className="field-meta">PDF / DOCX</span></div>
            <label htmlFor="resume-upload" className={`upload-zone ${fileName ? "upload-zone-filled" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files[0]) }}>
              <span className="upload-title">{fileName ?? "Click to upload or drag and drop"}</span>
              <span className="upload-support">PDF or DOCX / paste text below to analyze</span>
              <input id="resume-upload" type="file" accept=".pdf,.docx" className="sr-only" onChange={(event) => handleFile(event.target.files?.[0])} />
            </label>
            {fileName && <button type="button" className="file-action" onClick={() => setFileName(null)}>Remove file</button>}
            {fileError && <p className="form-error">{fileError}</p>}
            <div className="paste-row"><button type="button" onClick={() => document.getElementById("resume-text")?.focus()} className="secondary-action">Or paste resume text</button></div>
            <textarea id="resume-text" value={resumeText} onChange={(event) => setResumeText(event.target.value)} placeholder="Paste your resume text here" rows={5} className="workflow-textarea" />
            {fileName && !resumeText.trim() && <p className="form-hint">File parsing is coming soon. Paste the resume text to use this analysis.</p>}
          </section>
          <section className="workflow-section">
            <div className="field-heading"><h2 className="field-label">02 / Target role</h2><span className="field-meta">Job description</span></div>
            <textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the job description here" rows={10} className="workflow-textarea workflow-textarea-large" />
          </section>
          <section className="workflow-section workflow-submit">
            <p className="field-label">03 / Analyze</p>
            {submitError && <p className="form-error">{submitError}</p>}
            <button type="submit" disabled={isAnalyzing || !canAnalyze} className="primary-action primary-action-wide">{isAnalyzing ? "Analyzing your fit..." : "Analyze my fit →"}</button>
            {!submitError && !canAnalyze && <p className="form-hint">{fileName && !resumeText.trim() ? "Paste the selected resume text to continue." : !resumeText.trim() ? "Paste your resume text to continue." : "Add the job description to continue."}</p>}
          </section>
        </div>
      </div>
    </form>
  )
}
