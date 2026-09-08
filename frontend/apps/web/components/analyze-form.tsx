"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

/* ─── Career demo data ─── */
const CAREER_RESULTS: Record<string, { matched: string[]; missing: string[]; gaps: [string, number, string][]; recs: string[] }> = {
  "AI / ML Engineer": {
    matched: [], missing: ["Python", "TensorFlow", "PyTorch", "ML", "SQL", "Docker", "FastAPI", "Linux", "Pandas", "NumPy"],
    gaps: [["Python", 10, "Critical"], ["Machine Learning", 9, "Critical"], ["SQL", 8, "High"], ["FastAPI", 7, "High"], ["Docker", 6, "Useful"], ["Linux", 5, "Useful"]],
    recs: ["Start with Python — it's the foundation of AI/ML.", "Learn SQL for data pipeline work.", "Take an intro ML course on Coursera or fast.ai.", "Build a small ML project and deploy with FastAPI."],
  },
  "Software Engineer": {
    matched: [], missing: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Docker", "System Design", "CI/CD", "AWS", "Testing"],
    gaps: [["JavaScript", 10, "Critical"], ["React", 9, "Critical"], ["SQL", 8, "High"], ["Docker", 7, "High"], ["System Design", 8, "High"], ["AWS", 6, "Useful"]],
    recs: ["Master JavaScript and TypeScript first.", "Learn React for frontend development.", "Study SQL and database design.", "Practice system design for interviews."],
  },
  "Data Scientist": {
    matched: [], missing: ["SQL", "Pandas", "Statistics", "Scikit-learn", "Data Viz", "ML", "Tableau", "NumPy", "Feature Engineering"],
    gaps: [["SQL", 10, "Critical"], ["Pandas", 9, "Critical"], ["Statistics", 8, "High"], ["Scikit-learn", 8, "High"], ["Data Visualization", 7, "High"], ["Machine Learning", 9, "Critical"]],
    recs: ["Start with SQL — essential for every data role.", "Learn Pandas and NumPy for data manipulation.", "Study statistics fundamentals.", "Build projects using Scikit-learn."],
  },
  "Full Stack Developer": {
    matched: [], missing: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "MongoDB", "REST API", "Git", "Docker"],
    gaps: [["JavaScript", 10, "Critical"], ["React", 9, "Critical"], ["Node.js", 8, "High"], ["SQL", 7, "High"], ["CSS", 6, "Useful"], ["Docker", 5, "Useful"]],
    recs: ["Start with HTML, CSS, and JavaScript basics.", "Learn React for modern frontend development.", "Build a full-stack project with Node.js.", "Deploy your project and build a portfolio."],
  },
  "Cloud Engineer": {
    matched: [], missing: ["AWS", "Docker", "Kubernetes", "Linux", "Terraform", "CI/CD", "Networking", "Python", "Bash", "Monitoring"],
    gaps: [["Linux", 10, "Critical"], ["AWS", 9, "Critical"], ["Docker", 8, "High"], ["Kubernetes", 7, "High"], ["Terraform", 6, "Useful"], ["CI/CD", 6, "Useful"]],
    recs: ["Start with Linux fundamentals.", "Get AWS Cloud Practitioner certified.", "Learn Docker containerization.", "Study Kubernetes for orchestration."],
  },
  "Cybersecurity Engineer": {
    matched: [], missing: ["Linux", "Networking", "Python", "Security Tools", "Cryptography", "Penetration Testing", "Firewalls", "SIEM"],
    gaps: [["Linux", 10, "Critical"], ["Networking", 9, "Critical"], ["Python", 8, "High"], ["Security Tools", 7, "High"], ["Cryptography", 6, "Useful"]],
    recs: ["Master Linux administration.", "Study computer networking fundamentals.", "Learn Python for security scripting.", "Practice on platforms like TryHackMe."],
  },
}

const SKILL_MAP: Record<string, string[]> = {
  "Python": ["Python"], "C": ["C"], "C++": ["C++"], "Java": ["Java"], "JavaScript": ["JavaScript"],
  "HTML": ["HTML"], "CSS": ["CSS"], "React": ["React"],
  "SQL": ["SQL"], "Excel": ["Excel"],
  "Git": ["Git"], "GitHub": ["GitHub"], "Linux": ["Linux"],
  "Machine Learning": ["Machine Learning", "ML"], "Generative AI": ["Generative AI"],
}

const INTEREST_OPTIONS = [
  "Artificial Intelligence", "Machine Learning", "Software Development", "Web Development",
  "Data Science", "Cybersecurity", "Cloud Computing", "UI/UX", "Business", "Not sure yet",
]

const SKILL_CATEGORIES = [
  { label: "Programming", skills: ["Python", "C", "C++", "Java", "JavaScript"] },
  { label: "Web", skills: ["HTML", "CSS", "React"] },
  { label: "Data", skills: ["SQL", "Excel"] },
  { label: "Tools", skills: ["Git", "GitHub", "Linux"] },
  { label: "AI", skills: ["Machine Learning", "Generative AI"] },
]

const EXPERIENCE_OPTIONS = ["Projects", "Internships", "Hackathons", "Certifications", "College coursework", "Nothing yet"]

const CAREER_OPTIONS = [
  { title: "AI / ML Engineer", icon: "🧠", desc: "Build intelligent systems" },
  { title: "Software Engineer", icon: "💻", desc: "Design scalable software" },
  { title: "Data Scientist", icon: "📊", desc: "Extract insights from data" },
  { title: "Full Stack Developer", icon: "🌐", desc: "Build web applications" },
  { title: "Cloud Engineer", icon: "☁️", desc: "Automate infrastructure" },
  { title: "Cybersecurity Engineer", icon: "🔒", desc: "Protect digital systems" },
]

type Step = "welcome" | "name" | "year" | "interests" | "skills" | "experience" | "resume" | "career" | "analyzing"

export function AnalyzeForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("welcome")
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [experience, setExperience] = useState<string[]>([])
  const [career, setCareer] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  function toggleItem(arr: string[], item: string, setter: (v: string[]) => void) {
    setter(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item])
  }

  function generateResults() {
    const careerData = CAREER_RESULTS[career] || CAREER_RESULTS["AI / ML Engineer"]!
    const userSkills = skills.flatMap((s) => SKILL_MAP[s] || [s])
    const matched = userSkills.filter((s) => [...careerData.missing, ...careerData.matched].some((m) => m.toLowerCase() === s.toLowerCase()))
    const missing = careerData.missing.filter((m) => !userSkills.some((s) => s.toLowerCase() === m.toLowerCase()))
    const gaps = careerData.gaps.filter(([g]) => !userSkills.some((s) => s.toLowerCase() === g.toLowerCase()))
    const totalSkills = matched.length + missing.length
    const score = totalSkills > 0 ? Math.round((matched.length / totalSkills) * 100) : 0
    const basicScore = Math.max(score - 8, 0)

    // For zero-skill students
    const finalMatched = matched.length > 0 ? matched : skills.length > 0 ? skills.slice(0, 2) : []
    const finalScore = skills.length === 0 ? (experience.includes("Nothing yet") || experience.length === 0 ? 5 : 15) : score

    return {
      resume_skills: userSkills,
      job_skills: careerData.missing,
      matched_skills: finalMatched,
      missing_skills: missing.length > 0 ? missing : careerData.missing,
      basic_score: basicScore,
      weighted_score: Math.max(finalScore, 5),
      skill_gap_priority: gaps.length > 0 ? gaps : careerData.gaps,
      recommendations: careerData.recs,
    }
  }

  function handleAnalyze() {
    const result = generateResults()
    sessionStorage.setItem("careerfit-analysis", JSON.stringify(result))
    sessionStorage.setItem("careerfit-profile", JSON.stringify({ name, year, interests, skills, experience, career }))
    router.push("/analyzing")
  }

  const stepNumber =
    step === "welcome" ? 0 : step === "name" ? 1 : step === "year" ? 2 :
    step === "interests" ? 3 : step === "skills" ? 4 : step === "experience" ? 5 :
    step === "resume" ? 6 : step === "career" ? 7 : 8
  const progress = Math.round((stepNumber / 8) * 100)

  return (
    <div className="workflow-page editorial-shell">
      {/* Progress bar */}
      {step !== "welcome" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "3px", background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent)", transition: "width 0.5s ease", boxShadow: "0 0 10px rgba(0,212,255,0.4)" }} />
        </div>
      )}

      {/* ── WELCOME ── */}
      {step === "welcome" && (
        <div className="fade-in-up" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "36rem" }}>
          <p className="eyebrow">CareerFit AI</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 1.1 }}>
            Let&apos;s start with what you already know.
          </h1>
          <p style={{ marginTop: "1.2rem", color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Don&apos;t have a resume? That&apos;s completely fine.<br />
            We&apos;ll build your career profile together.
          </p>
          <div style={{ display: "grid", gap: "0.75rem", marginTop: "2.5rem", maxWidth: "24rem" }}>
            <button onClick={() => setStep("name")} className="primary-action" style={{ justifyContent: "center" }}>
              Build My Profile →
            </button>
            <label className="secondary-cta" style={{ justifyContent: "center", cursor: "pointer" }}>
              Upload My Resume
              <input type="file" accept=".pdf,.docx" className="sr-only" onChange={(e) => {
                const f = e.target.files?.[0]; if (f) { setResumeFile(f); setStep("career") }
              }} />
            </label>
            <button onClick={() => { setSkills([]); setExperience(["Nothing yet"]); setStep("name") }} className="secondary-cta" style={{ justifyContent: "center", borderColor: "rgba(0,212,255,0.2)" }}>
              Start From Scratch ✨
            </button>
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--muted-foreground)", fontStyle: "italic" }}>
            For first-year students: &quot;Start From Scratch&quot; is the perfect way to begin.
          </p>
        </div>
      )}

      {/* ── NAME ── */}
      {step === "name" && (
        <div className="fade-in-up" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "30rem" }}>
          <p className="eyebrow">Step 01</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            What should we call you?
          </h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
            className="workflow-textarea"
            style={{ marginTop: "2rem", fontSize: "1.2rem", padding: "1rem" }}
          />
          <button
            onClick={() => setStep("year")}
            disabled={!name.trim()}
            className="primary-action"
            style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── YEAR ── */}
      {step === "year" && (
        <div className="fade-in-up" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "30rem" }}>
          <p className="eyebrow">Step 02</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            Which year are you in, {name.split(" ")[0]}?
          </h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", marginTop: "2rem" }}>
            {["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"].map((y) => (
              <button
                key={y}
                type="button"
                className={`career-option ${year === y ? "selected" : ""}`}
                onClick={() => { setYear(y); setTimeout(() => setStep("interests"), 400) }}
              >
                <span className="career-option-title">{y}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── INTERESTS ── */}
      {step === "interests" && (
        <div className="fade-in-up" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "36rem" }}>
          <p className="eyebrow">Step 03</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            What are you interested in?
          </h1>
          <p style={{ marginTop: "0.75rem", color: "var(--muted-foreground)", fontSize: "0.9rem" }}>
            Select all that apply. Not sure yet? That&apos;s okay.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem", marginTop: "1.5rem" }}>
            {INTEREST_OPTIONS.map((item) => (
              <button
                key={item}
                type="button"
                className={`career-option ${interests.includes(item) ? "selected" : ""}`}
                onClick={() => toggleItem(interests, item, setInterests)}
              >
                <span className="career-option-title" style={{ fontSize: "0.8rem" }}>{item}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep("skills")} disabled={interests.length === 0} className="primary-action" style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}>
            Continue →
          </button>
        </div>
      )}

      {/* ── SKILLS ── */}
      {step === "skills" && (
        <div className="fade-in-up" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "40rem" }}>
          <p className="eyebrow">Step 04</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            What do you already know?
          </h1>
          <p style={{ marginTop: "0.75rem", color: "var(--muted-foreground)", fontSize: "0.9rem" }}>
            Don&apos;t worry if you don&apos;t know many — everyone starts somewhere.
          </p>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.label} style={{ marginTop: "1.25rem" }}>
              <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                {cat.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {cat.skills.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`career-option ${skills.includes(s) ? "selected" : ""}`}
                    onClick={() => toggleItem(skills, s, setSkills)}
                    style={{ padding: "0.45rem 0.85rem", flexDirection: "row" }}
                  >
                    <span style={{ fontSize: "0.8rem" }}>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <button onClick={() => setStep("experience")} className="primary-action">
              {skills.length === 0 ? "I don't know any of these yet →" : `Continue with ${skills.length} skill${skills.length > 1 ? "s" : ""} →`}
            </button>
          </div>
        </div>
      )}

      {/* ── EXPERIENCE ── */}
      {step === "experience" && (
        <div className="fade-in-up" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "32rem" }}>
          <p className="eyebrow">Step 05</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            Have you built anything yet?
          </h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem", marginTop: "1.5rem" }}>
            {EXPERIENCE_OPTIONS.map((item) => (
              <button
                key={item}
                type="button"
                className={`career-option ${experience.includes(item) ? "selected" : ""}`}
                onClick={() => {
                  if (item === "Nothing yet") { setExperience(["Nothing yet"]) }
                  else { toggleItem(experience.filter((e) => e !== "Nothing yet"), item, setExperience) }
                }}
              >
                <span className="career-option-title" style={{ fontSize: "0.8rem" }}>{item}</span>
              </button>
            ))}
          </div>
          {experience.includes("Nothing yet") && (
            <p style={{ marginTop: "1rem", color: "var(--accent)", fontSize: "0.85rem", lineHeight: 1.6 }}>
              That&apos;s completely fine. CareerFit will help you decide what to build next.
            </p>
          )}
          <button onClick={() => setStep("resume")} disabled={experience.length === 0} className="primary-action" style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}>
            Continue →
          </button>
        </div>
      )}

      {/* ── RESUME / OPTIONAL ── */}
      {step === "resume" && (
        <div className="fade-in-up" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "32rem" }}>
          <p className="eyebrow">Step 06 · Optional</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            Already have a resume?
          </h1>
          <p style={{ marginTop: "0.75rem", color: "var(--muted-foreground)", fontSize: "0.9rem" }}>
            These are completely optional. Skip if you don&apos;t have them.
          </p>

          <label
            className={`upload-zone ${resumeFile ? "upload-zone-filled" : ""}`}
            style={{ marginTop: "1.5rem" }}
          >
            <span className="upload-title">{resumeFile ? resumeFile.name : "Upload Resume (Optional)"}</span>
            <span className="upload-support">PDF or DOCX</span>
            <input type="file" accept=".pdf,.docx" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) setResumeFile(f) }} />
          </label>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <button onClick={() => setStep("career")} className="primary-action">
              {resumeFile ? "Continue →" : "Skip — I don't have one →"}
            </button>
          </div>
        </div>
      )}

      {/* ── CAREER GOAL ── */}
      {step === "career" && (
        <div className="fade-in-up" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "36rem" }}>
          <p className="eyebrow">Step 07</p>
          <h1 style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            Where do you want to go?
          </h1>
          <div className="career-options-grid" style={{ marginTop: "1.5rem" }}>
            {CAREER_OPTIONS.map((opt) => (
              <button
                key={opt.title}
                type="button"
                className={`career-option ${career === opt.title ? "selected" : ""}`}
                onClick={() => setCareer(opt.title)}
              >
                <span className="career-option-icon">{opt.icon}</span>
                <span className="career-option-title">{opt.title}</span>
                <span className="career-option-desc">{opt.desc}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!career}
            className="primary-action"
            style={{ marginTop: "2rem", alignSelf: "flex-start" }}
          >
            Analyze My Career Fit →
          </button>
        </div>
      )}
    </div>
  )
}
