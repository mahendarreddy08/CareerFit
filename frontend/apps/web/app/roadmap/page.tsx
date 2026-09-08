"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, Lock, ArrowRight, Clock, Flag, Sparkles } from "lucide-react"
import { getActiveStudent, StudentProfile } from "@/lib/demo-data"

export default function RoadmapPage() {
  const [student, setStudent] = useState<StudentProfile | null>(null)

  useEffect(() => {
    setStudent(getActiveStudent())
  }, [])

  if (!student) return null

  return (
    <div className="cf-bg-atmosphere min-h-screen py-10">
      <div className="editorial-shell space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="accent-badge">Personalized Roadmap</span>
              <span className="text-xs text-white/40 font-mono">
                Target: {student.targetCareer}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
              Your Path to {student.targetCareer}
            </h1>
            <p className="text-sm text-white/60 max-w-xl">
              A structured progression from fundamentals to production readiness. Every step is
              unlocked only when prerequisite skills are verified.
            </p>
          </div>

          <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] text-right">
            <span className="text-[10px] font-mono uppercase text-white/40 block">Milestones</span>
            <span className="text-sm font-semibold text-white">
              2 of {student.roadmap.length} Completed
            </span>
          </div>
        </div>

        {/* ─── Roadmap Timeline ─── */}
        <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-2.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/[0.08]">
          {student.roadmap.map((item) => {
            const isCompleted = item.status === "completed"
            const isCurrent = item.status === "current"
            const isLocked = item.status === "locked"

            return (
              <div key={item.id} className="relative group">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-3.5 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                    isCompleted
                      ? "bg-[#5ce1e6] text-[#0d0f12]"
                      : isCurrent
                      ? "bg-[#5ce1e6]/20 border-2 border-[#5ce1e6] text-[#5ce1e6] animate-pulse"
                      : "bg-[#13161c] border border-white/20 text-white/30"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6]" />
                  ) : (
                    <Lock className="w-2.5 h-2.5" />
                  )}
                </div>

                {/* Content card */}
                <div
                  className={`editorial-card p-5 sm:p-6 transition-all ${
                    isCurrent
                      ? "border-[#5ce1e6]/40 bg-[#5ce1e6]/[0.03] shadow-[0_4px_24px_rgba(92,225,230,0.06)]"
                      : isCompleted
                      ? "border-white/[0.08] opacity-80"
                      : "border-white/[0.05] opacity-50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-white/40">0{item.id}</span>
                      <h3
                        className={`text-base font-medium ${
                          isCurrent ? "text-white" : isCompleted ? "text-white/90" : "text-white/60"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-white/40">
                        {item.estimatedWeeks}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          isCompleted
                            ? "bg-white/[0.05] text-white/70"
                            : isCurrent
                            ? "bg-[#5ce1e6]/10 text-[#5ce1e6] border border-[#5ce1e6]/30"
                            : "bg-white/[0.02] text-white/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed mb-4">{item.description}</p>

                  {isCurrent && (
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs text-[#5ce1e6] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Next recommended checkpoint
                      </span>
                      <Link href="/learning" className="btn-accent text-xs py-1.5 px-3">
                        Continue Learning <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="text-[11px] text-white/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#5ce1e6]" /> Verified competency
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
