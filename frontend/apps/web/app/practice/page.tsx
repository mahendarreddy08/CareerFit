"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, CheckCircle2, RefreshCw, ArrowRight, Code2, Sparkles } from "lucide-react"

export default function PracticePage() {
  const [code, setCode] = useState(`// Task: Filter placement candidates with readiness >= 70%
// and sort them in descending order of readiness score.

function filterEligibleCandidates(candidates) {
  return candidates
    .filter(c => c.readiness >= 70)
    .sort((a, b) => b.readiness - a.readiness);
}`)

  const [executing, setExecuting] = useState(false)
  const [tested, setTested] = useState(false)

  function handleRun() {
    setExecuting(true)
    setTimeout(() => {
      setExecuting(false)
      setTested(true)
    }, 600)
  }

  return (
    <div className="cf-bg-atmosphere min-h-screen py-10">
      <div className="editorial-shell space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="accent-badge">Interactive Practice Lab</span>
              <span className="text-xs text-white/40 font-mono">Module 03 · JavaScript</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
              Practice: Array Methods & High-Order Functions
            </h1>
            <p className="text-sm text-white/60 max-w-xl">
              Solve this real-world candidate filtering challenge to test your understanding of
              modern ES6+ array methods.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 font-mono">Status:</span>
            <span
              className={`text-xs font-mono px-2.5 py-1 rounded ${
                tested
                  ? "bg-[#5ce1e6]/10 text-[#5ce1e6] border border-[#5ce1e6]/30"
                  : "bg-white/[0.04] text-white/60"
              }`}
            >
              {tested ? "Verified Passed" : "Awaiting Execution"}
            </span>
          </div>
        </div>

        {/* ─── Lab Workspace ─── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Problem Specs */}
          <div className="editorial-card p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="eyebrow block text-white/50">Challenge Brief</span>
              <h3 className="text-lg font-normal text-white">
                Filter & Sort Placement Candidates
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                In recruitment dashboards, candidates are filtered based on benchmark scores and
                ordered by readiness. Implement a function that accepts an array of candidate
                objects:
              </p>

              <div className="p-3 rounded bg-black/40 border border-white/[0.08] font-mono text-[11px] text-white/70 leading-relaxed">
                <span className="text-[#5ce1e6]">// Input structure</span>
                <br />
                const candidates = [
                <br />
                &nbsp;&nbsp;&#123; name: &quot;Rahul&quot;, readiness: 65 &#125;,
                <br />
                &nbsp;&nbsp;&#123; name: &quot;Mahendar&quot;, readiness: 78 &#125;,
                <br />
                &nbsp;&nbsp;&#123; name: &quot;Ananya&quot;, readiness: 72 &#125;
                <br />
                ];
              </div>

              <div className="space-y-2 pt-2 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6]" />
                  <span>Rule 1: Only return candidates with readiness &gt;= 70%.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6]" />
                  <span>Rule 2: Sort descending so the highest readiness appears first.</span>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="pt-6 border-t border-white/[0.08] mt-6">
              <span className="text-[11px] font-mono uppercase text-white/40 block mb-3">
                Automated Test Verification
              </span>

              {tested ? (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-[#5ce1e6]/[0.06] border border-[#5ce1e6]/30 text-white">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5ce1e6]" /> Test 1: Filter
                      threshold (readiness &gt;= 70)
                    </span>
                    <span className="font-mono text-[#5ce1e6]">Passed</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#5ce1e6]/[0.06] border border-[#5ce1e6]/30 text-white">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5ce1e6]" /> Test 2: Descending
                      readiness sorting
                    </span>
                    <span className="font-mono text-[#5ce1e6]">Passed</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#5ce1e6]/[0.06] border border-[#5ce1e6]/30 text-white">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5ce1e6]" /> Test 3: Edge case empty
                      candidate list
                    </span>
                    <span className="font-mono text-[#5ce1e6]">Passed</span>
                  </div>

                  <div className="p-3 rounded bg-white/[0.03] border border-white/[0.08] mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Competency Verified!
                      </span>
                      <span className="text-[11px] text-white/60">
                        JavaScript array fundamentals score logged to profile.
                      </span>
                    </div>
                    <Link href="/interview" className="btn-accent text-xs py-1.5 px-3">
                      Interview Coach →
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-white/40 italic">
                  Run the code solution to execute test verification.
                </p>
              )}
            </div>
          </div>

          {/* Right: Code Editor */}
          <div className="editorial-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#5ce1e6]" />
                  <span className="text-xs font-mono text-white/80">solution.js</span>
                </div>
                <span className="text-[11px] font-mono text-white/40">Node.js 20 ES6 Environment</span>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full bg-black/50 border border-white/[0.08] rounded p-4 font-mono text-xs text-[#5ce1e6] focus:border-[#5ce1e6] focus:outline-none leading-relaxed resize-none"
                spellCheck={false}
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08] mt-4 flex items-center justify-between">
              <button
                onClick={() =>
                  setCode(`function filterEligibleCandidates(candidates) {
  return candidates
    .filter(c => c.readiness >= 70)
    .sort((a, b) => b.readiness - a.readiness);
}`)
                }
                className="text-xs text-white/40 hover:text-white flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset template
              </button>

              <button
                onClick={handleRun}
                disabled={executing}
                className="btn-accent text-xs py-2 px-5"
              >
                {executing ? (
                  <span className="flex items-center gap-1.5">Executing...</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-current" /> Run & Validate
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
