import Link from "next/link"

import { placeholderAnalysis } from "@/data/careerfit"

const analysis = placeholderAnalysis

export default function Page() {
  return (
    <div className="home-page">
      <section className="home-hero editorial-shell">
        <div className="home-hero-copy fade-in-up">
          <p className="eyebrow">CareerFit / Analysis Engine</p>
          <h1>Know your fit.<br />Close your gap.</h1>
          <p className="home-lede">Compare your experience with a role and see what matches, what is missing, and what matters next.</p>
          <Link href="/analyze" className="primary-action">Analyze your career fit <span aria-hidden="true">→</span></Link>
        </div>

        <div className="analysis-instrument fade-in-up" style={{ animationDelay: "120ms" }}>
          <div className="instrument-header"><div><p className="instrument-kicker">CareerFit Analysis</p><p className="instrument-context">Python developer / sample profile</p></div><span className="instrument-status">Ready</span></div>
          <div className="instrument-score-row"><div className="instrument-score">{analysis.score.toFixed(2)}<span>%</span></div><div className="instrument-score-label">Fit<br /><span>calculated match</span></div></div>
          <div className="instrument-rule" />
          <div className="instrument-grid">
            <div><div className="instrument-label">Matched <span>04</span></div><ul className="instrument-list">{analysis.matchedSkills.map((skill) => <li key={skill}><i />{skill}</li>)}</ul></div>
            <div><div className="instrument-label">Gaps <span>04</span></div><div className="top-gap"><p className="instrument-label">Top gap</p><strong>{analysis.skillGaps[0]?.name ?? "FastAPI"}</strong><span>Critical priority</span></div></div>
          </div>
          <div className="instrument-footer"><span>Analysis / 001</span><span>01 — 04</span></div>
        </div>
      </section>

      <div>
        <section className="story-section editorial-shell story-context"><div className="story-index">01 / Context</div><div className="story-content"><h2>Bring your context.</h2><p>Add your resume and the role you&apos;re targeting. CareerFit turns both into a clear, comparable view of your experience.</p><div className="context-lines"><span>Resume</span><b>+</b><span>Target role</span><b>↓</b><strong>CareerFit analysis</strong></div></div></section>
        <section className="story-section editorial-shell story-signal"><div className="story-index">02 / Signal</div><div className="story-content"><h2>See what matches.</h2><p>Get a signal you can trust. The skills already present in your experience stay visible and easy to scan.</p><div className="match-strip">{analysis.matchedSkills.map((skill, index) => <span key={skill}><b>{String(index + 1).padStart(2, "0")}</b>{skill}<i>✓</i></span>)}</div></div></section>
        <section className="story-section editorial-shell story-gap"><div className="story-index">03 / Gap</div><div className="story-content"><h2>Know what you&apos;re missing.</h2><p>Prioritized gaps turn a vague feeling into an honest, useful list of what to work on next.</p><ol className="priority-list">{analysis.skillGaps.slice(0, 3).map((gap, index) => <li key={gap.name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{gap.name}</strong><em className={gap.priority.toLowerCase()}>{gap.priority}</em></li>)}</ol></div></section>
        <section className="next-move editorial-shell"><div className="story-index">04 / Next move</div><div className="next-move-content"><p className="eyebrow">Your first move</p><h2>Start with {analysis.nextMove.skill}.</h2><Link href="/analyze" className="text-action">View learning path <span aria-hidden="true">↗</span></Link></div></section>
      </div>
      <section className="final-cta editorial-shell"><p className="eyebrow">Ready when you are</p><h2>Make your next move clearer.</h2><Link href="/analyze" className="primary-action">Analyze your career fit <span aria-hidden="true">→</span></Link></section>
      <footer className="home-footer editorial-shell"><strong>CareerFit</strong><span>Know your fit. Close your gap.</span></footer>
    </div>
  )
}