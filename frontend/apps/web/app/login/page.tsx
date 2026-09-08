"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, UserCheck, Sparkles, ShieldCheck } from "lucide-react"
import { saveActiveStudent, DEFAULT_DEMO_STUDENT, FIRST_YEAR_PRESET } from "@/lib/demo-data"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("mahendar.reddy@stanley.edu.in")
  const [password, setPassword] = useState("••••••••••••")

  function handleDirectLogin(profile = DEFAULT_DEMO_STUDENT) {
    saveActiveStudent(profile)
    router.push("/dashboard")
  }

  return (
    <div className="cf-bg-atmosphere min-h-screen flex flex-col justify-center items-center px-4 py-20">
      <div className="w-full max-w-md editorial-card p-8 relative">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6]" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
              SIH 2026 Judge Demo Access
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-normal text-white mb-2">
            Sign in to CareerFit AI
          </h1>
          <p className="text-xs text-white/50">
            Select a verified student profile or continue with custom credentials.
          </p>
        </div>

        {/* ── Judge Quick Access ── */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleDirectLogin(DEFAULT_DEMO_STUDENT)}
            className="w-full p-3.5 rounded bg-white/[0.04] border border-[#5ce1e6]/30 hover:border-[#5ce1e6] hover:bg-[#5ce1e6]/[0.05] transition-all text-left group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#5ce1e6]/20 border border-[#5ce1e6]/40 flex items-center justify-center text-[#5ce1e6]">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white group-hover:text-[#5ce1e6] block">
                  Mahendar Reddy · 2nd Year (Recommended Demo)
                </span>
                <span className="text-[11px] text-white/50 block">
                  CSE AI/ML · Target: Full Stack · 68% Readiness
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5ce1e6] group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => handleDirectLogin(FIRST_YEAR_PRESET)}
            className="w-full p-3 rounded bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all text-left group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/70">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-medium text-white/90 block">
                  Ananya Sharma · 1st Year (Discover Stage)
                </span>
                <span className="text-[10px] text-white/40 block">
                  Beginner profile with zero experience
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white" />
          </button>
        </div>

        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-white/[0.06]" />
          <span className="flex-shrink mx-3 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            Or Standard Login
          </span>
          <div className="flex-grow border-t border-white/[0.06]" />
        </div>

        {/* ── Standard form ── */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleDirectLogin()
          }}
          className="space-y-4 mt-2"
        >
          <div>
            <label className="block text-[11px] font-medium text-white/70 mb-1">
              College Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input text-xs"
              placeholder="name@college.edu.in"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-white/70 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input text-xs"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full text-xs py-2.5 mt-2">
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
          <Link
            href="/onboarding"
            className="text-xs text-[#5ce1e6] hover:underline inline-flex items-center gap-1"
          >
            New student? Start onboarding from scratch →
          </Link>
        </div>
      </div>
    </div>
  )
}
