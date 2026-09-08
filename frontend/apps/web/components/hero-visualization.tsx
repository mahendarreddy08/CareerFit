"use client"

import { useEffect, useState } from "react"

export function HeroVisualization() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t0 = setTimeout(() => setVisible(true), 300)
    const t1 = setTimeout(() => setStep(1), 1500)
    const t2 = setTimeout(() => setStep(2), 2800)
    const t3 = setTimeout(() => setStep(3), 4200)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const items = [
    { label: "Career goal", value: step >= 1 ? "AI / ML Engineer" : "Not selected", done: step >= 1 },
    { label: "Skills", value: step >= 2 ? "Python, Git, C" : "Not added", done: step >= 2 },
    { label: "Experience", value: "Not added", done: false },
    { label: "Resume", value: "Not uploaded", done: false },
  ]

  const pct = step === 0 ? 0 : step === 1 ? 25 : step === 2 ? 50 : 50

  return (
    <div className={`hero-viz ${visible ? "hero-viz-visible" : ""}`}>
      <div className="hero-viz-header">
        <div className="hero-viz-title">
          <span className="hero-viz-dot" />
          Your Career Profile
        </div>
        <div className="hero-viz-status">
          <span className="hero-viz-live-dot" />
          Building
        </div>
      </div>

      <div className="hero-viz-body">
        {/* Completeness */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
            <span className="hero-viz-label" style={{ margin: 0 }}>PROFILE COMPLETENESS</span>
            <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", fontVariantNumeric: "tabular-nums" }}>
              {pct}<span style={{ fontSize: "0.7rem", color: "var(--accent)" }}>%</span>
            </span>
          </div>
          <div className="hero-viz-bar-container">
            <div className="hero-viz-bar" style={{ width: `${pct}%`, transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1)" }} />
          </div>
        </div>

        {/* Profile items */}
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {items.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.55rem 0.7rem",
                background: item.done ? "rgba(0, 212, 255, 0.05)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${item.done ? "rgba(0, 212, 255, 0.15)" : "rgba(255,255,255,0.04)"}`,
                borderRadius: "3px",
                transition: "all 0.6s ease",
              }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--muted-foreground)", letterSpacing: "0.04em" }}>
                {item.label}
              </span>
              <span style={{
                fontSize: "0.7rem",
                fontWeight: item.done ? 600 : 400,
                color: item.done ? "var(--foreground)" : "var(--muted-foreground)",
                transition: "all 0.6s ease",
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "0.75rem", fontSize: "0.65rem", color: "var(--muted-foreground)", textAlign: "center", letterSpacing: "0.04em" }}>
          Start your journey to fill your profile →
        </p>
      </div>
    </div>
  )
}
