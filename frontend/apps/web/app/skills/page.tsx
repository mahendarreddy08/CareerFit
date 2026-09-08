"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Filter } from "lucide-react"
import { getActiveStudent, StudentProfile } from "@/lib/demo-data"

export default function SkillsPage() {
  const [student, setStudent] = useState<StudentProfile | null>(null)
  const [filter, setFilter] = useState<"All" | "High" | "Medium" | "Useful">("All")

  useEffect(() => {
    setStudent(getActiveStudent())
  }, [])

  if (!student) return null

  const filteredGaps =
    filter === "All"
      ? student.missingSkills
      : student.missingSkills.filter((s) => s.priority === filter)

  return (
    <div className="cf-bg-atmosphere min-h-screen py-10">
      <div className="editorial-shell space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 mb-2">
            <span className="accent-badge">Skill Gap Analysis</span>
            <span className="text-xs text-white/40 font-mono">
              Target: {student.targetCareer}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
            What stands between you and your target career?
          </h1>
          <p className="text-sm text-white/60 max-w-2xl">
            CareerFit analyzes real hiring benchmarks for {student.targetCareer} roles to distinguish
            between critical blockers and nice-to-have skills.
          </p>
        </div>

        {/* ─── Current vs Missing Overview ─── */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Validated Skills */}
          <div className="editorial-card p-6 md:col-span-1">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
              <span className="text-xs font-mono uppercase text-white/40">
                Skills You Have ({student.currentSkills.length})
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#5ce1e6]" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {student.currentSkills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-white/90 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6]" />
                  {s}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed border-t border-white/[0.06] pt-3">
              Validated through your profile questions, coursework, and past projects.
            </p>
          </div>

          {/* Missing Skills Summary */}
          <div className="editorial-card p-6 md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase text-[#5ce1e6]">
                  Identified Gaps ({student.missingSkills.length})
                </span>
                <span className="text-xs text-white/40">Ranked by hiring impact</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Not all missing skills carry equal weight. Learning{" "}
                <span className="text-white font-medium">JavaScript</span> and{" "}
                <span className="text-white font-medium">SQL</span> will immediately bridge 60% of
                your gap toward a junior Full Stack Developer profile.
              </p>
            </div>

            {/* Filter tags */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Priority:
              </span>
              {(["All", "High", "Medium", "Useful"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilter(p)}
                  className={`px-2.5 py-1 rounded text-xs transition-all ${
                    filter === p
                      ? "bg-white/[0.1] text-white font-medium"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Prioritized Skills List ─── */}
        <div className="space-y-4">
          <h2 className="text-xl font-normal text-white">Prioritized Competency Gaps</h2>

          <div className="space-y-3">
            {filteredGaps.map((gap, idx) => {
              const isHigh = gap.priority === "High"
              const isMedium = gap.priority === "Medium"
              return (
                <div
                  key={gap.name}
                  className={`editorial-card p-5 transition-all ${
                    isHigh ? "border-l-2 border-l-[#5ce1e6]" : ""
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-medium text-white">{gap.name}</span>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold ${
                            isHigh
                              ? "bg-[#5ce1e6]/10 text-[#5ce1e6] border border-[#5ce1e6]/30"
                              : isMedium
                              ? "bg-white/[0.06] text-white/80 border border-white/[0.1]"
                              : "bg-white/[0.02] text-white/40 border border-white/[0.06]"
                          }`}
                        >
                          {gap.priority} Priority
                        </span>
                      </div>

                      <p className="text-xs text-white/70 leading-relaxed">{gap.why}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                        <span className="text-white/40">
                          Current:{" "}
                          <span className="text-white/70 font-medium">{gap.currentLevel}</span>
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-white/40">
                          Target Level:{" "}
                          <span className="text-white font-medium">{gap.requiredLevel}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col sm:items-end justify-between gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/[0.06]">
                      <span className="text-[11px] font-mono text-white/40 uppercase">
                        Recommended Action
                      </span>
                      <Link
                        href={gap.name === "JavaScript" ? "/learning" : "/roadmap"}
                        className="btn-secondary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                      >
                        <span>{gap.action}</span>
                        <ArrowRight className="w-3 h-3 text-[#5ce1e6]" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
