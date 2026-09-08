"use client"

import { useEffect, useState } from "react"
import { Check, Circle } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

const steps = [
  { label: "Reading your resume", delay: 400 },
  { label: "Extracting skills & experience", delay: 1000 },
  { label: "Matching against role requirements", delay: 1800 },
  { label: "Calculating your CareerFit score", delay: 2400 },
]

export function AnalysisLoading() {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    const timers = steps.map((step, index) =>
      setTimeout(() => setCompleted(index + 1), step.delay),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="loading-page editorial-shell">
      <p className="eyebrow">CareerFit AI · Analysis Engine</p>
      <h1>Analyzing your career fit</h1>

      <div className="loading-viz">
        <div className="loading-ring" />
        <div className="loading-ring" />
        <div className="loading-ring" />
        <div className="loading-ring-center">
          <div className="loading-ring-dot" />
        </div>
      </div>

      <div className="loading-steps">
        {steps.map((step, index) => {
          const isDone = index < completed
          const isActive = index === completed
          return (
            <div
              key={step.label}
              className={cn(
                "loading-step",
                isDone && "text-foreground",
                isActive && "text-foreground",
                !isDone && !isActive && "text-muted-foreground/50",
              )}
            >
              {isDone ? (
                <Check className="h-4 w-4" style={{ color: "var(--accent)" }} />
              ) : (
                <Circle
                  className={cn(
                    "h-4 w-4",
                    isActive && "animate-pulse",
                  )}
                  style={isActive ? { color: "var(--accent)" } : undefined}
                />
              )}
              <span>{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}