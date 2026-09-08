"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Code2, Hammer, CheckCircle2, Play, ExternalLink } from "lucide-react"
import { getActiveStudent, StudentProfile } from "@/lib/demo-data"

export default function LearningPage() {
  const [student, setStudent] = useState<StudentProfile | null>(null)

  useEffect(() => {
    setStudent(getActiveStudent())
  }, [])

  if (!student) return null

  const steps = [
    {
      num: "01",
      tag: "LEARN",
      icon: BookOpen,
      title: "Core Concepts & Modern ES6+",
      desc: "Deep dive into arrow functions, array manipulation (map, filter, reduce), closures, and asynchronous Promises.",
      time: "25 mins read & video",
      resource: "The Modern JavaScript Tutorial (javascript.info) · Part 1",
    },
    {
      num: "02",
      tag: "PRACTICE",
      icon: Code2,
      title: "Interactive Code Task: Array Transformer",
      desc: "Write an ES6 function to filter and aggregate student placement statistics asynchronously.",
      time: "15 mins hands-on",
      actionLink: "/practice",
      actionText: "Launch Interactive Practice Lab",
    },
    {
      num: "03",
      tag: "BUILD",
      icon: Hammer,
      title: "Mini-Project: Async Currency / Crypto Tracker",
      desc: "Connect to a public REST API, fetch live price objects, handle loading/error states, and render dynamically.",
      time: "45 mins project",
      resource: "Guided Starter Template with GitHub repository",
    },
    {
      num: "04",
      tag: "TEST",
      icon: CheckCircle2,
      title: "Competency Verification Assessment",
      desc: "5 conceptual questions + 1 code challenge to prove readiness and unlock React in your roadmap.",
      time: "10 mins assessment",
      actionLink: "/practice",
      actionText: "Take Competency Quiz",
    },
  ]

  return (
    <div className="cf-bg-atmosphere min-h-screen py-10">
      <div className="editorial-shell space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 mb-2">
            <span className="accent-badge">Targeted Learning</span>
            <span className="text-xs text-white/40 font-mono">
              Philosophy: Learn → Practice → Build → Test
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
            YOUR RECOMMENDED RESOURCE
          </h1>
          <p className="text-sm text-white/60 max-w-xl">
            CareerFit curates single, high-signal pathways so you never waste time sorting through
            hundreds of repetitive tutorials.
          </p>
        </div>

        {/* ─── Hero Resource Card ─── */}
        <div className="editorial-card p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5ce1e6] mb-1">
                <span>MODULE 03</span>
                <span>•</span>
                <span>BEGINNER TO PROFICIENT</span>
              </div>
              <h2 className="text-2xl font-normal text-white mb-2">
                JavaScript Fundamentals for Full Stack
              </h2>
              <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] text-xs text-white/70 max-w-2xl">
                <span className="text-white/40 font-mono block mb-1 uppercase text-[10px]">
                  Why this is recommended:
                </span>
                {student.nextBestAction.reason}
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-white/40 font-mono block mb-1">Total Effort:</span>
              <span className="text-lg font-mono font-semibold text-white block">~1.5 Hours</span>
              <span className="text-xs text-[#5ce1e6] font-mono">Unlocks: React Roadmap</span>
            </div>
          </div>

          {/* ── 4-Part Structure ── */}
          <div className="grid md:grid-cols-2 gap-6 pt-6">
            {steps.map((st) => {
              const Icon = st.icon
              return (
                <div
                  key={st.num}
                  className="p-5 rounded bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#5ce1e6] font-bold">{st.num}</span>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-white/50 px-2 py-0.5 rounded bg-white/[0.04]">
                          {st.tag}
                        </span>
                      </div>
                      <span className="text-[11px] text-white/40">{st.time}</span>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded bg-white/[0.04] flex items-center justify-center text-[#5ce1e6] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white mb-1">{st.title}</h3>
                        <p className="text-xs text-white/60 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] mt-2 flex items-center justify-between">
                    {st.actionLink ? (
                      <Link
                        href={st.actionLink}
                        className="text-xs text-[#5ce1e6] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        {st.actionText} <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-[11px] text-white/50 truncate max-w-xs">
                        {st.resource}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50">
              Finished reviewing the concepts? Jump straight into practice.
            </span>
            <Link href="/practice" className="btn-accent text-xs py-2.5 px-6">
              Start Practice Task <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
