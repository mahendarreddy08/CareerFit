"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  School,
  Briefcase,
  Upload,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import {
  getActiveStudent,
  saveActiveStudent,
  DEFAULT_DEMO_STUDENT,
  FIRST_YEAR_PRESET,
  StudentProfile,
} from "@/lib/demo-data"

export default function ProfilePage() {
  const router = useRouter()
  const [student, setStudent] = useState<StudentProfile | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

  useEffect(() => {
    setStudent(getActiveStudent())
  }, [])

  if (!student) return null

  function handleSwitchProfile(profile: StudentProfile) {
    saveActiveStudent(profile)
    setStudent(profile)
    router.refresh()
  }

  return (
    <div className="cf-bg-atmosphere min-h-screen py-10">
      <div className="editorial-shell space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#5ce1e6]/10 border border-[#5ce1e6]/30 flex items-center justify-center text-xl text-[#5ce1e6] font-bold font-mono">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="accent-badge">{student.yearStage}</span>
                <span className="text-xs text-white/40 font-mono">{student.year}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-normal text-white">{student.name}</h1>
              <p className="text-xs text-white/50">{student.college}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono text-white/40 block uppercase">
              Career Readiness
            </span>
            <span className="text-2xl font-mono font-bold text-[#5ce1e6]">
              {student.careerReadiness}%
            </span>
          </div>
        </div>

        {/* ─── SIH Demo Persona Switcher ─── */}
        <div className="editorial-card p-6 border-[#5ce1e6]/20 bg-[#5ce1e6]/[0.02]">
          <div className="flex items-center justify-between mb-3">
            <span className="eyebrow block text-[#5ce1e6]">SIH Demo Experience Switcher</span>
            <span className="text-[10px] font-mono text-white/40">Switch persona in 1 click</span>
          </div>
          <p className="text-xs text-white/70 mb-4 leading-relaxed">
            Demonstrate to judges how CareerFit completely reshapes its recommendations and
            readiness indicators between a 1st-year explorer and a 2nd-year specialization path:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleSwitchProfile(DEFAULT_DEMO_STUDENT)}
              className={`p-4 rounded border text-left transition-all ${
                student.name === DEFAULT_DEMO_STUDENT.name
                  ? "bg-white/[0.06] border-[#5ce1e6]"
                  : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
              }`}
            >
              <span className="text-xs font-semibold text-white block mb-0.5">
                Mahendar Reddy · 2nd Year (Build Stage)
              </span>
              <span className="text-[11px] text-white/50 block">
                Target: Full Stack Developer · 68% Readiness
              </span>
            </button>

            <button
              onClick={() => handleSwitchProfile(FIRST_YEAR_PRESET)}
              className={`p-4 rounded border text-left transition-all ${
                student.name === FIRST_YEAR_PRESET.name
                  ? "bg-white/[0.06] border-[#5ce1e6]"
                  : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
              }`}
            >
              <span className="text-xs font-semibold text-white block mb-0.5">
                Ananya Sharma · 1st Year (Discover Stage)
              </span>
              <span className="text-[11px] text-white/50 block">
                Zero resume · 24% Readiness · Exploring
              </span>
            </button>
          </div>
        </div>

        {/* ─── Student Profile Context ─── */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="editorial-card p-6 space-y-4">
            <h3 className="text-base font-normal text-white">Academic Profile</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-white/40">Academic Year:</span>
                <span className="text-white font-medium">{student.year}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-white/40">Branch:</span>
                <span className="text-white font-medium">{student.branch}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-white/40">Target Role:</span>
                <span className="text-[#5ce1e6] font-medium">{student.targetCareer}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-white/40">Active Next Action:</span>
                <span className="text-white font-medium truncate max-w-xs">
                  {student.nextBestAction.title}
                </span>
              </div>
            </div>
          </div>

          <div className="editorial-card p-6 space-y-4">
            <h3 className="text-base font-normal text-white">Verified Skills Summary</h3>
            <div className="flex flex-wrap gap-2">
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
            <p className="text-[11px] text-white/40 leading-relaxed pt-3 border-t border-white/[0.06]">
              Skills are automatically refreshed as you submit projects and pass assessments.
            </p>
          </div>
        </div>

        {/* ─── Resume Parsing & Update ─── */}
        <div className="editorial-card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-normal text-white">Resume Sync</h3>
            <span className="text-xs text-white/40 font-mono">Optional Verification</span>
          </div>
          <p className="text-xs text-white/60 mb-4">
            Upload an updated PDF or DOCX to re-evaluate ATS compatibility and extract newly added
            internships or certifications.
          </p>

          <label className="border border-dashed border-white/[0.12] hover:border-white/30 rounded p-6 block text-center cursor-pointer transition-all bg-white/[0.01]">
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) setUploadedFileName(f.name)
              }}
            />
            <Upload className="w-6 h-6 text-white/40 mx-auto mb-2" />
            <span className="text-xs font-medium text-white block">
              {uploadedFileName ? uploadedFileName : "Upload latest resume (PDF / DOCX)"}
            </span>
          </label>

          {uploadedFileName && (
            <div className="mt-3 p-2.5 rounded bg-[#5ce1e6]/[0.06] border border-[#5ce1e6]/30 text-xs text-[#5ce1e6] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{uploadedFileName} parsed successfully. Skills synced to profile.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
