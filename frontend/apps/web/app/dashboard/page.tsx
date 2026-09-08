"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Code2,
  Mic,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react"
import { getActiveStudent, StudentProfile } from "@/lib/demo-data"

export default function DashboardPage() {
  const [student, setStudent] = useState<StudentProfile | null>(null)

  useEffect(() => {
    setStudent(getActiveStudent())
  }, [])

  if (!student) return null

  const firstName = student.name.split(" ")[0]

  return (
    <div className="cf-bg-atmosphere min-h-screen py-10">
      <div className="editorial-shell space-y-8">
        {/* ─── Greeting & Overview Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="accent-badge">{student.yearStage}</span>
              <span className="text-xs text-white/40 font-mono">
                {student.branch} · {student.year}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white mb-1">
              Good morning, {firstName}.
            </h1>
            <p className="text-sm text-white/60">Your career journey is moving forward.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-white/40 block uppercase">
                Target Role
              </span>
              <span className="text-sm font-semibold text-white">{student.targetCareer}</span>
            </div>
            <div className="h-8 w-[1px] bg-white/[0.1] mx-1" />
            <div className="text-right">
              <span className="text-[10px] font-mono text-white/40 block uppercase">
                Career Readiness
              </span>
              <span className="text-xl font-mono font-bold text-[#5ce1e6]">
                {student.careerReadiness}%
              </span>
            </div>
          </div>
        </div>

        {/* ─── Focal Component: NEXT BEST ACTION ─── */}
        <div className="nba-hero-card relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#5ce1e6] animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#5ce1e6] font-bold">
                  YOUR NEXT BEST ACTION
                </span>
                <span className="text-white/20 text-xs">•</span>
                <span className="text-xs text-white/50">{student.nextBestAction.estimatedTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-normal text-white mb-3">
                {student.nextBestAction.title}
              </h2>

              <div className="p-3 rounded bg-black/30 border border-white/[0.06] mb-4">
                <span className="text-[11px] font-mono uppercase text-white/40 block mb-1">
                  Why this action now?
                </span>
                <p className="text-xs text-white/80 leading-relaxed">
                  {student.nextBestAction.reason}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href={student.nextBestAction.link} className="btn-accent text-xs py-2.5 px-5">
                  Continue Learning <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
                <Link
                  href="/practice"
                  className="btn-secondary text-xs py-2.5 px-4 text-white/80 hover:text-white"
                >
                  Skip to Practice Task
                </Link>
              </div>
            </div>

            {/* Quick module preview widget */}
            <div className="lg:w-72 p-4 rounded bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/40 block uppercase mb-1">
                  Module Blueprint
                </span>
                <span className="text-xs font-semibold text-white block mb-2">
                  JavaScript ES6+ & Async Patterns
                </span>
                <div className="space-y-1.5 text-[11px] text-white/60">
                  <div className="flex items-center gap-1.5 text-white/80">
                    <CheckCircle2 className="w-3 h-3 text-[#5ce1e6]" /> 1. Concept Video & Guide
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border border-white/30 inline-block" /> 2.
                    Async Array Filter Lab
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border border-white/30 inline-block" /> 3.
                    API Fetch Mini-Project
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.06] mt-4 flex items-center justify-between text-[11px]">
                <span className="text-white/40">Expected Impact:</span>
                <span className="text-[#5ce1e6] font-mono font-medium">+4% Readiness</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Grid: Readiness Breakdown & Quick Actions ─── */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Readiness Assessment Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className="editorial-card p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <h3 className="text-lg font-normal text-white">Career Readiness Breakdown</h3>
                  <p className="text-xs text-white/50">
                    Multidimensional score computed across technical depth, portfolio, and
                    communication.
                  </p>
                </div>
                <Link
                  href="/progress"
                  className="text-xs text-[#5ce1e6] hover:underline flex items-center gap-1"
                >
                  Full analytics <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Technical Skills", val: student.metrics.technicalSkills, note: "Strong in Python/C; JS/SQL in progress" },
                  { label: "Projects & Portfolio", val: student.metrics.projects, note: "2 completed out of 4 targeted" },
                  { label: "Resume & ATS Optimization", val: student.metrics.resume, note: "Standard format verified" },
                  { label: "Communication Confidence", val: student.metrics.communication, note: "Moderate interview articulation" },
                  { label: "Mock Interview Readiness", val: student.metrics.interview, note: "3 technical questions completed" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white/90">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-white/40 hidden sm:inline">{item.note}</span>
                        <span className="font-mono font-semibold text-white/90">{item.val}%</span>
                      </div>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/skills"
                className="editorial-card p-4 hover:border-white/20 transition-all text-decoration-none block group"
              >
                <div className="w-7 h-7 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white mb-3 group-hover:text-[#5ce1e6] transition-colors">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Skill Gap Analysis</h4>
                <p className="text-[11px] text-white/50 leading-snug">
                  5 skills missing for Full Stack Developer role.
                </p>
              </Link>

              <Link
                href="/roadmap"
                className="editorial-card p-4 hover:border-white/20 transition-all text-decoration-none block group"
              >
                <div className="w-7 h-7 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white mb-3 group-hover:text-[#5ce1e6] transition-colors">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Personalized Roadmap</h4>
                <p className="text-[11px] text-white/50 leading-snug">
                  Timeline-based milestones from now to placement.
                </p>
              </Link>

              <Link
                href="/interview"
                className="editorial-card p-4 hover:border-white/20 transition-all text-decoration-none block group"
              >
                <div className="w-7 h-7 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white mb-3 group-hover:text-[#5ce1e6] transition-colors">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">AI Interview Coach</h4>
                <p className="text-[11px] text-white/50 leading-snug">
                  Practice HR & technical answers with AI feedback.
                </p>
              </Link>
            </div>
          </div>

          {/* Right Column: Skills Snapshot & Milestones */}
          <div className="space-y-6">
            {/* Validated Skills */}
            <div className="editorial-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow block text-white/60">Current Validated Skills</span>
                <span className="text-xs font-mono text-[#5ce1e6]">
                  {student.currentSkills.length} Verified
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {student.currentSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-white/80 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6]" />
                    {s}
                  </span>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-white/40">Priority Missing:</span>
                <span className="text-white/80 font-medium">JavaScript, SQL</span>
              </div>
            </div>

            {/* Target Timeline Progress */}
            <div className="editorial-card p-5">
              <span className="eyebrow block text-white/60 mb-3">Semester Checkpoint</span>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#5ce1e6] mt-1" />
                  <div>
                    <span className="text-white font-medium block">Year 2 Milestone Target</span>
                    <span className="text-white/40">
                      Reach 75% Career Readiness before 5th semester internship season.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs opacity-60">
                  <div className="w-2 h-2 rounded-full bg-white/30 mt-1" />
                  <div>
                    <span className="text-white font-medium block">Year 3 Target</span>
                    <span className="text-white/40">
                      Complete Full Stack Capstone + 10 DSA mock assessments.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
