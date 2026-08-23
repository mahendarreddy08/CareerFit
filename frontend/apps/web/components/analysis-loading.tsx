"use client"

import { useEffect, useState } from "react"
import { Check, Circle } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

const steps = [
  { label: "Reading your resume", delay: 400 },
  { label: "Identifying skills", delay: 1000 },
  { label: "Comparing role requirements", delay: 1600 },
  { label: "Calculating fit", delay: 2200 },
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
      <p className="eyebrow">CareerFit / Analysis engine</p>
      <h1>Analyzing your career fit</h1>

      <ul className="mt-12 w-full space-y-4">
        {steps.map((step, index) => {
          const isDone = index < completed
          const isActive = index === completed
          return (
            <li
              key={step.label}
              className={cn(
                "loading-step",
                isDone && "text-foreground",
                isActive && "text-foreground",
                !isDone && !isActive && "text-muted-foreground/50",
              )}
            >
              {isDone ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Circle
                  className={cn(
                    "h-4 w-4",
                    isActive && "animate-pulse text-accent",
                  )}
                />
              )}
              <span>{step.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}