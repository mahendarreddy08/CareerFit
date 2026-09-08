"use client"

import { useState } from "react"
import Link from "next/link"
import { Mic, MicOff, Sparkles, RotateCcw, CheckCircle2, ChevronRight } from "lucide-react"

export default function InterviewCoachPage() {
  const [mode, setMode] = useState<"Self Introduction" | "Technical" | "HR" | "Behavioral">(
    "Self Introduction"
  )
  const [recording, setRecording] = useState(false)
  const [answer, setAnswer] = useState(
    "Hello, my name is Mahendar Reddy. I am a 2nd year Computer Science student specializing in AI and Machine Learning. I have been building strong fundamentals in Python, C, and frontend technologies like HTML, CSS, and Git. Currently, I am expanding my skills into Full Stack Development with JavaScript and SQL to build production-grade web applications."
  )
  const [submitted, setSubmitted] = useState(false)
  const [evaluating, setEvaluating] = useState(false)

  const modes = [
    { name: "Self Introduction", prompt: "Tell me about yourself and your career goals." },
    {
      name: "Technical",
      prompt: "Explain how asynchronous programming works in JavaScript using Promises.",
    },
    {
      name: "HR",
      prompt: "Why do you want to work as a Full Stack Developer instead of pure AI?",
    },
    {
      name: "Behavioral",
      prompt: "Describe a time when you had to debug a difficult code error under a deadline.",
    },
  ] as const

  const currentPrompt =
    modes.find((m) => m.name === mode)?.prompt || "Tell me about yourself and your career goals."

  function handleSubmit() {
    setEvaluating(true)
    setTimeout(() => {
      setEvaluating(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <div className="cf-bg-atmosphere min-h-screen py-10">
      <div className="editorial-shell space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="accent-badge">AI Interview Coach</span>
              <span className="text-xs text-white/40 font-mono">Loop: Answer → Feedback → Improve</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
              Practice before the real interview.
            </h1>
            <p className="text-sm text-white/60 max-w-xl">
              Get immediate, objective AI evaluation on your speech structure, technical
              relevance, and clarity before campus placement season.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 font-mono">Practice Target:</span>
            <span className="text-xs font-mono text-white px-2.5 py-1 rounded bg-white/[0.04]">
              3 of 10 Completed
            </span>
          </div>
        </div>

        {/* ─── Mode Tabs ─── */}
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.name}
              onClick={() => {
                setMode(m.name)
                setSubmitted(false)
              }}
              className={`px-3.5 py-2 rounded text-xs font-medium border transition-all ${
                mode === m.name
                  ? "bg-[#5ce1e6]/10 border-[#5ce1e6] text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:border-white/20"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left / Main: Question & Answer Workspace */}
          <div className="lg:col-span-7 space-y-6">
            <div className="editorial-card p-6">
              <div className="flex items-center justify-between mb-3 text-xs text-white/40 font-mono">
                <span>INTERVIEW PROMPT</span>
                <span>{mode} Round</span>
              </div>

              <h2 className="text-xl font-normal text-white mb-4">&ldquo;{currentPrompt}&rdquo;</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Type your response or use voice input</span>
                  <button
                    type="button"
                    onClick={() => setRecording(!recording)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-all ${
                      recording
                        ? "bg-red-500/20 border-red-500/40 text-red-400 animate-pulse"
                        : "bg-white/[0.04] border-white/[0.1] text-white/70 hover:text-white"
                    }`}
                  >
                    {recording ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                    {recording ? "Recording Voice..." : "Voice Input (Beta)"}
                  </button>
                </div>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={8}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded p-4 text-xs text-white/90 focus:border-[#5ce1e6] focus:outline-none leading-relaxed resize-none"
                  placeholder="Draft your answer here..."
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-white/40 font-mono">
                    {answer.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                  <button
                    onClick={handleSubmit}
                    disabled={evaluating || !answer.trim()}
                    className="btn-accent text-xs py-2 px-5"
                  >
                    {evaluating ? (
                      "Analyzing with AI..."
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Submit for AI Feedback
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Feedback Evaluation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="editorial-card p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
                <span className="eyebrow block text-[#5ce1e6]">AI Feedback Engine</span>
                <span className="text-[10px] font-mono text-white/40">
                  {submitted ? "Evaluated" : "Waiting for Answer"}
                </span>
              </div>

              {submitted ? (
                <div className="space-y-6">
                  {/* Scores Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { metric: "Relevance", score: 84, color: "text-[#5ce1e6]" },
                      { metric: "Clarity", score: 72, color: "text-white" },
                      { metric: "Structure", score: 68, color: "text-white/80" },
                      { metric: "Confidence", score: 61, color: "text-white/80" },
                    ].map((item) => (
                      <div
                        key={item.metric}
                        className="p-3 rounded bg-white/[0.02] border border-white/[0.06]"
                      >
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                          {item.metric}
                        </span>
                        <span className={`text-xl font-mono font-bold ${item.color}`}>
                          {item.score}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Constructive Analysis */}
                  <div className="p-4 rounded bg-white/[0.02] border border-white/[0.08] space-y-2">
                    <span className="text-xs font-semibold text-white block">
                      AI Constructive Critique:
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      &ldquo;Your answer is highly relevant, but your introduction can be more
                      structured. Start with your current degree and branch, highlight 1 key project,
                      and explicitly state why Full Stack Development is your primary ambition.&rdquo;
                    </p>
                  </div>

                  {/* Recommendation bullets */}
                  <div className="space-y-1.5 text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5ce1e6]" />
                      <span>Strong tech keywords detected: Python, JavaScript, Full Stack.</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30 flex items-center justify-center text-[9px]">
                        !
                      </span>
                      <span>Next attempt: Quantify project scale or user impact.</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSubmitted(false)
                      }}
                      className="text-xs text-white/60 hover:text-white flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Try Again
                    </button>
                    <Link href="/progress" className="btn-secondary text-xs py-1.5 px-3">
                      View Progress Impact <ChevronRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-white/40 space-y-2">
                  <p>Submit your spoken or written answer on the left to generate real-time AI critique.</p>
                  <p className="text-[11px] text-white/30">
                    Evaluates clarity, grammatical structure, technical relevance, and poise.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
