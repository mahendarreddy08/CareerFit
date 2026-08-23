"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { CareerFitResponse } from "@/lib/api"

export function Results() {
  const [analysis, setAnalysis] = useState<CareerFitResponse | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("careerfit-analysis")
    if (!stored) return
    try {
      setAnalysis(JSON.parse(stored) as CareerFitResponse)
    } catch {
      sessionStorage.removeItem("careerfit-analysis")
    }
  }, [])

  if (!analysis) {
    return <div className="results-page editorial-shell"><p className="eyebrow">CareerFit Analysis</p><div className="results-empty"><h1>No analysis to show yet.</h1><p>Start with your resume text and a target role to generate your CareerFit analysis.</p><Link href="/analyze" className="primary-action">Analyze your career fit <span aria-hidden="true">→</span></Link></div></div>
  }

  const recommendations = Array.isArray(analysis.recommendations) ? analysis.recommendations : [analysis.recommendations]
  const nextSkill = analysis.skill_gap_priority[0]?.[0] ?? analysis.missing_skills[0]
  const unprioritizedGaps = analysis.missing_skills.filter((skill) => !analysis.skill_gap_priority.some(([prioritySkill]) => prioritySkill === skill))

  return (
    <div className="results-page editorial-shell">
      <p className="eyebrow">CareerFit Analysis / Complete</p>
      <div className="mt-8 border-t border-border pt-8 md:pt-10">
        <h1>Your fit</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="results-score"><div className="flex items-end gap-3"><span className="results-score-number">{analysis.weighted_score.toFixed(2)}</span><span className="pb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">%</span></div><div className="score-meter mt-5 h-1 w-full max-w-sm overflow-hidden"><div style={{ width: `${Math.min(Math.max(analysis.weighted_score, 0), 100)}%` }} /></div><p className="results-basic-score">Basic score {analysis.basic_score.toFixed(2)}%</p></div>
          <div className="grid gap-6 md:grid-cols-2"><div className="border-t border-border pt-4"><p className="result-stat-label">{String(analysis.matched_skills.length).padStart(2, "0")} matched</p><p className="result-stat-value">Skills already in your experience</p></div><div className="border-t border-border pt-4"><p className="result-stat-label">{String(analysis.missing_skills.length).padStart(2, "0")} gaps</p><p className="result-stat-value">Priorities to work on next</p></div></div>
        </div>
      </div>

      <div className="results-details">
        <section className="border-t border-border pt-6"><h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Matched</h2><ul className="mt-6 space-y-3">{analysis.matched_skills.map((skill) => <li key={skill} className="flex items-center gap-3 text-sm text-foreground"><span className="h-1.5 w-1.5 bg-accent" />{skill}</li>)}</ul></section>
        <section className="border-t border-border pt-6"><h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Skill gaps</h2><ul className="mt-6 space-y-4">{analysis.skill_gap_priority.map(([skill, weight, priority], index) => <li key={skill} className="flex gap-4 border-b border-border pb-4"><div className="w-8 pt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{String(index + 1).padStart(2, "0")}</div><div className="flex-1"><div className="flex flex-wrap items-baseline justify-between gap-3"><span className="text-xl font-medium tracking-[-0.05em] text-foreground">{skill}</span><span className={`skill-priority skill-priority-${priority.toLowerCase()}`}>{priority}</span></div><p className="mt-2 text-sm text-muted-foreground">Priority weight {weight}</p></div></li>)}{unprioritizedGaps.map((skill, index) => <li key={skill} className="flex gap-4 border-b border-border pb-4"><div className="w-8 pt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{String(analysis.skill_gap_priority.length + index + 1).padStart(2, "0")}</div><div className="flex-1"><span className="text-xl font-medium tracking-[-0.05em] text-foreground">{skill}</span><p className="mt-2 text-sm text-muted-foreground">Missing from your resume</p></div></li>)}</ul></section>
      </div>

      <section className="mt-16 border-t border-border pt-8"><p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Your next move</p><div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-3xl leading-none tracking-[-0.06em] text-foreground md:text-5xl">{nextSkill ? `Start with ${nextSkill}.` : "You are ready for this role."}</p><ul className="mt-4 max-w-lg space-y-2 text-sm leading-relaxed text-muted-foreground">{recommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}</ul></div><Link href="/analyze" className="secondary-action">Back to analyze <span aria-hidden="true">↗</span></Link></div></section>
    </div>
  )
}
