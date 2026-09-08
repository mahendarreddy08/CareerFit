"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TrendingUp, CheckCircle2, Award, Calendar, ArrowRight, BarChart3 } from "lucide-react"
import { getActiveStudent, StudentProfile } from "@/lib/demo-data"

export default function ProgressPage() {
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
              <span className="accent-badge">Measurable Growth</span>
              <span className="text-xs text-white/40 font-mono">Continuous Tracking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
              Career Journey Progress
            </h1>
            <p className="text-sm text-white/60 max-w-xl">
              CareerFit doesn&apos;t just diagnose gaps once. We track your incremental improvements
              across projects, practice tasks, and mock interviews.
            </p>
          </div>

          <div className="p-3.5 rounded bg-white/[0.02] border border-white/[0.08] text-right">
            <span className="text-[10px] font-mono text-white/40 block uppercase">
              Current Readiness
            </span>
            <span className="text-2xl font-mono font-bold text-[#5ce1e6]">
              {student.careerReadiness}%
            </span>
          </div>
        </div>

        {/* ─── Journey Checkpoint Stages ─── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Foundation", status: "Completed", icon: CheckCircle2, done: true },
            { label: "Skill Building", status: "Completed", icon: CheckCircle2, done: true },
            {
              label: "Projects Target",
              status: `${student.projectsCompleted}/${student.totalProjectsTarget}`,
              icon: BarChart3,
              done: false,
            },
            {
              label: "Interview Practice",
              status: `${student.interviewPracticeCount}/${student.totalInterviewTarget}`,
              icon: BarChart3,
              done: false,
            },
            {
              label: "Placement Target",
              status: "Year 4 Target",
              icon: Calendar,
              done: false,
            },
          ].map((c) => {
            const Icon = c.icon
            return (
              <div key={c.label} className="editorial-card p-4 text-center">
                <Icon
                  className={`w-5 h-5 mx-auto mb-2 ${c.done ? "text-[#5ce1e6]" : "text-white/30"}`}
                />
                <span className="text-xs font-semibold text-white block mb-0.5">{c.label}</span>
                <span className="text-[11px] font-mono text-white/50">{c.status}</span>
              </div>
            )
          })}
        </div>

        {/* ─── Historical Readiness Growth Curve ─── */}
        <div className="editorial-card p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-8">
            <div>
              <span className="eyebrow block text-[#5ce1e6] mb-1">Empirical Improvement</span>
              <h2 className="text-xl font-normal text-white">Career Readiness Growth Index</h2>
            </div>
            <span className="text-xs font-mono text-white/40">+26% Over Academic Year</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="grid grid-cols-4 gap-4 sm:gap-8 items-end h-56 pt-6 pb-2 border-b border-white/[0.08]">
            {student.progressHistory.map((item, idx) => {
              const isCurrent = idx === student.progressHistory.length - 1
              return (
                <div key={item.checkpoint} className="flex flex-col items-center h-full justify-end">
                  <span
                    className={`font-mono text-xs mb-2 font-semibold ${
                      isCurrent ? "text-[#5ce1e6]" : "text-white/60"
                    }`}
                  >
                    {item.score}%
                  </span>
                  <div className="w-full max-w-[64px] bg-white/[0.03] rounded-t overflow-hidden h-full flex items-end">
                    <div
                      className={`w-full rounded-t transition-all duration-700 ${
                        isCurrent
                          ? "bg-gradient-to-t from-[#5ce1e6]/40 to-[#5ce1e6]"
                          : "bg-white/20"
                      }`}
                      style={{ height: `${(item.score / 100) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* X-axis labels */}
          <div className="grid grid-cols-4 gap-4 sm:gap-8 pt-3 text-center">
            {student.progressHistory.map((item, idx) => {
              const isCurrent = idx === student.progressHistory.length - 1
              return (
                <div key={item.checkpoint} className="space-y-0.5">
                  <span
                    className={`block text-xs truncate ${
                      isCurrent ? "text-white font-medium" : "text-white/60"
                    }`}
                  >
                    {item.checkpoint}
                  </span>
                  <span className="block text-[10px] font-mono text-white/40">{item.date}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-4 rounded bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/70">
              Next projected score upon completing JavaScript Fundamentals:{" "}
              <span className="text-[#5ce1e6] font-mono font-semibold">72% Readiness</span>
            </span>
            <Link href="/learning" className="btn-accent text-xs py-1.5 px-4">
              Continue Current Module <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
