import Link from "next/link"
import { AnalysisPreview } from "@/components/analysis-preview"

export function Hero() {
  return (
    <section className="editorial-shell px-4 pt-28 pb-8 md:pt-32 md:pb-14">
      <div className="fade-in-up border-t border-border pt-8 md:pt-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          CareerFit / Analysis Engine
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-5xl leading-[0.9] tracking-[-0.08em] text-foreground md:text-7xl lg:text-[7rem]">
              Know your fit.
              <br />
              Close the gap.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Compare your experience with any role and see exactly what matches,
              what is missing, and what matters next.
            </p>

            <div className="mt-8">
              <Link
                href="/analyze"
                className="inline-flex items-center gap-3 border border-border bg-primary px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:opacity-90"
              >
                Analyze your career fit
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="lg:pb-2">
            <AnalysisPreview />
          </div>
        </div>
      </div>
    </section>
  )
}