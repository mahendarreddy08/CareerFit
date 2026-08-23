import { cn } from "@workspace/ui/lib/utils"
import { placeholderAnalysis } from "@/data/careerfit"

export function AnalysisPreview({ className }: { className?: string }) {
  const { score, matchedSkills, skillGaps } = placeholderAnalysis

  return (
    <div
      className={cn(
        "w-full max-w-xl border border-border bg-card/80 p-4 md:p-5",
        className,
      )}
    >
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            CareerFit / Analysis
          </p>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-[-0.08em] tabular-nums md:text-6xl">
              {score.toFixed(2)}
            </span>
            <span className="pb-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Fit
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Match
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-[-0.06em] tabular-nums">
            {matchedSkills.length}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Matched
          </div>
          <ul className="mt-3 space-y-2">
            {matchedSkills.map((skill) => (
              <li key={skill} className="flex items-center gap-3 text-sm text-foreground">
                <span className="h-1.5 w-1.5 bg-accent" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:pl-4 md:border-l md:border-border">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Gaps
          </div>
          <ul className="mt-3 space-y-2">
            {skillGaps.map((gap, index) => (
              <li key={gap.name} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground">{gap.name}</span>
                </div>
                <span
                  className={cn(
                    "text-[9px] uppercase tracking-[0.18em]",
                    gap.priority === "Critical" && "text-[#8b3a2f]",
                    gap.priority === "High" && "text-muted-foreground",
                    gap.priority === "Useful" && "text-muted-foreground/70",
                  )}
                >
                  {gap.priority}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}