"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { CareerFitResponse } from "@/lib/api"

function AnimatedScore({ target }: { target: number }) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const duration = 2000
    const start = performance.now()
    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    setTimeout(() => requestAnimationFrame(animate), 300)
  }, [target])

  return <>{value}</>
}

export function Results() {
  const [analysis, setAnalysis] = useState<CareerFitResponse | null>(null)
  const [profile, setProfile] = useState<{ name?: string; year?: string; career?: string } | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("careerfit-analysis")
    if (!stored) return
    try {
      setAnalysis(JSON.parse(stored) as CareerFitResponse)
    } catch {
      sessionStorage.removeItem("careerfit-analysis")
    }
    const profileData = sessionStorage.getItem("careerfit-profile")
    if (profileData) {
      try { setProfile(JSON.parse(profileData)) } catch { /* ignore */ }
    }
  }, [])

  if (!analysis) {
    return (
      <div className="results-page editorial-shell">
        <p className="eyebrow">CareerFit AI · Analysis</p>
        <div className="results-empty">
          <h1>No analysis yet.</h1>
          <p>Start with your resume and a target role to generate your CareerFit analysis.</p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/analyze" className="primary-action">
              Start Analysis <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const recommendations = Array.isArray(analysis.recommendations)
    ? analysis.recommendations
    : [analysis.recommendations]

  const circumference = 2 * Math.PI * 90
  const offset = circumference - (Math.min(Math.max(analysis.weighted_score, 0), 100) / 100) * circumference

  const roadmapItems = analysis.skill_gap_priority.map(
    ([skill, , priority], index) => ({
      weeks: `Week ${index * 2 + 1}–${(index + 1) * 2}`,
      skill,
      priority,
      description: `Master ${skill} fundamentals and apply to real projects`,
    }),
  )
  roadmapItems.push({
    weeks: `Week ${roadmapItems.length * 2 + 1}–${roadmapItems.length * 2 + 4}`,
    skill: "Build Projects + Interview Prep",
    priority: "Final",
    description: "Apply all skills to portfolio projects and prepare for interviews",
  })

  const unprioritizedGaps = analysis.missing_skills.filter(
    (skill) => !analysis.skill_gap_priority.some(([s]) => s === skill),
  )

  return (
    <div className="results-page editorial-shell fade-in-up">
      <p className="eyebrow">CareerFit AI · Analysis Complete</p>

      {/* Score Hero */}
      <div className="results-hero">
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: "0.5rem" }}>
          {profile?.name ? `${profile.name.split(" ")[0]}'s Career Readiness` : "Your Career Readiness"}
        </h1>
        {profile?.career && (
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
            Target: {profile.career} {profile?.year ? `· ${profile.year}` : ""}
          </p>
        )}
        <div className="results-score-ring">
          <svg viewBox="0 0 200 200">
            <circle className="ring-bg" cx="100" cy="100" r="90" />
            <circle
              className="ring-fill"
              cx="100"
              cy="100"
              r="90"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="results-score-inner">
            <span className="results-score-number">
              <AnimatedScore target={Math.round(analysis.weighted_score)} />
            </span>
            <span className="results-score-pct">%</span>
            <span className="results-score-label">Career Match</span>
          </div>
        </div>
        <p className="results-basic-score">
          Basic score: {analysis.basic_score.toFixed(1)}%
        </p>

        <div className="results-stats-row">
          <div className="results-stat-card">
            <span className="result-stat-label">Matched</span>
            <span className="result-stat-value">{analysis.matched_skills.length}</span>
          </div>
          <div className="results-stat-card">
            <span className="result-stat-label">Missing</span>
            <span className="result-stat-value">{analysis.missing_skills.length}</span>
          </div>
          <div className="results-stat-card">
            <span className="result-stat-label">Priorities</span>
            <span className="result-stat-value">{analysis.skill_gap_priority.length}</span>
          </div>
          <div className="results-stat-card">
            <span className="result-stat-label">Readiness</span>
            <span className="result-stat-value">{Math.round(analysis.weighted_score)}%</span>
          </div>
        </div>
      </div>

      {/* Matched & Gaps */}
      <div className="results-details" style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        <section>
          <h2 className="results-section-title">Matched Skills</h2>
          <div className="matched-skills-grid">
            {analysis.matched_skills.map((skill) => (
              <span key={skill} className="matched-skill-tag">
                <span className="matched-skill-dot" />
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="results-section-title">Skill Gaps</h2>
          {analysis.skill_gap_priority.map(([skill, weight, priority], index) => (
            <div key={skill} className="gap-card">
              <div className="gap-card-info">
                <span className="gap-card-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span className="gap-card-name">{skill}</span>
                  <p className="gap-card-weight">Priority weight: {weight}</p>
                </div>
              </div>
              <span className={`skill-priority skill-priority-${priority.toLowerCase()}`}>
                {priority}
              </span>
            </div>
          ))}
          {unprioritizedGaps.map((skill, index) => (
            <div key={skill} className="gap-card">
              <div className="gap-card-info">
                <span className="gap-card-index">
                  {String(analysis.skill_gap_priority.length + index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="gap-card-name">{skill}</span>
                  <p className="gap-card-weight">Missing from resume</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Recommendations */}
      <section style={{ marginTop: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        <h2 className="results-section-title">AI Recommendations</h2>
        {recommendations.map((rec, i) => (
          <div key={i} className="recommendation-card">{rec}</div>
        ))}
      </section>

      {/* Roadmap */}
      <section className="roadmap-section">
        <h2 className="results-section-title">Your Personalized Roadmap</h2>
        <div className="roadmap-timeline">
          <div className="roadmap-line" />
          {roadmapItems.map((item, index) => (
            <div
              key={item.skill}
              className="roadmap-item"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="roadmap-dot" />
              <span className="roadmap-weeks">{item.weeks}</span>
              <p className="roadmap-skill">{item.skill}</p>
              <p className="roadmap-desc">{item.description}</p>
              <span
                className={`skill-priority skill-priority-${item.priority.toLowerCase()}`}
                style={{ marginTop: "0.4rem", display: "inline-block" }}
              >
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom actions */}
      <section style={{ marginTop: "4rem", borderTop: "1px solid var(--border)", paddingTop: "2rem", paddingBottom: "4rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/analyze" className="secondary-action">
          ← Start New Analysis
        </Link>
        <Link href="/" className="secondary-action">
          Back to Home
        </Link>
      </section>
    </div>
  )
}
