import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2, Compass, Layers, Briefcase, Award } from "lucide-react"
import { Career3DModel } from "@/components/career-3d-model"

export default function LandingPage() {
  const fourStages = [
    {
      num: "01",
      tag: "FIRST YEAR",
      title: "DISCOVER",
      icon: Compass,
      goal: "Understand yourself and explore career directions",
      focus: [
        "Career exploration & tech horizon overview",
        "Programming fundamentals (Python / C)",
        "Basic Git & GitHub setup",
        "Problem solving & first mini project",
      ],
      exampleAction: "Complete Python Fundamentals & Push 1st Repo",
    },
    {
      num: "02",
      tag: "SECOND YEAR",
      title: "BUILD",
      icon: Layers,
      goal: "Select a serious career direction and close priority skill gaps",
      focus: [
        "Career specialization (e.g. Full Stack / AI-ML)",
        "Automated skill-gap prioritization",
        "Targeted learning roadmaps & practice tasks",
        "Building end-to-end domain projects",
      ],
      exampleAction: "Complete JavaScript Fundamentals & Build API",
    },
    {
      num: "03",
      tag: "THIRD YEAR",
      title: "PREPARE",
      icon: Briefcase,
      goal: "Become industry & internship ready with verified skills",
      focus: [
        "Data structures & algorithmic problem solving",
        "Production-grade GitHub portfolio",
        "Resume optimization & ATS alignment",
        "Internship technical assessments & prep",
      ],
      exampleAction: "Run AI Resume Review & Mock DSA Assessment",
    },
    {
      num: "04",
      tag: "FOURTH YEAR",
      title: "PERFORM",
      icon: Award,
      goal: "Excel in placements, technical rounds, and behavioral interviews",
      focus: [
        "Role-specific job requirement matching",
        "AI Interview Coach (HR & Technical practice)",
        "System design & live coding simulations",
        "Placement readiness tracking",
      ],
      exampleAction: "Complete AI Mock Interview: 'Tell me about yourself'",
    },
  ]

  const loopSteps = [
    { name: "ASSESS", desc: "Understand current skills and background" },
    { name: "DECIDE", desc: "Prioritize target career and missing competencies" },
    { name: "LEARN", desc: "Curated high-signal resources for your level" },
    { name: "PRACTICE", desc: "Interactive tasks & problem solving" },
    { name: "BUILD", desc: "Real-world portfolio projects" },
    { name: "COMMUNICATE", desc: "AI speech & interview coaching" },
    { name: "MEASURE", desc: "Track quantitative career readiness index" },
    { name: "ADAPT", desc: "Continuous Next Best Action recommendation" },
  ]

  return (
    <div className="cf-bg-atmosphere min-h-screen">
      {/* ─── Hero Section ─── */}
      <section className="editorial-shell pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6]" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-white/70">
                Smart India Hackathon 2026 · AI Career Companion
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white mb-6">
              Your Career. <br />
              Your Path. <br />
              <span className="italic text-white/70 font-light">Your Next Step.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mb-10 font-normal">
              CareerFit AI understands where you are, where you want to go, and
              what you should do next — guiding you from first year to placement.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/onboarding" className="btn-accent text-sm py-3 px-6">
                Start Your Career Journey <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <a href="#journey" className="btn-secondary text-sm py-3 px-6">
                Explore CareerFit
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Career Intelligence Model */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Career3DModel />
          </div>
        </div>

        {/* ── Hero Next Best Action Interactive Preview ── */}
        <div className="mt-14 md:mt-20 editorial-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="eyebrow block text-[#5ce1e6] mb-1">
                The Core Innovation · Not a Chatbot
              </span>
              <h3 className="text-xl md:text-2xl font-normal text-white">
                The Next Best Action Engine
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50 font-mono">Demo Persona:</span>
              <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-xs text-white/90">
                Mahendar Reddy · 2nd Year CSE
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6">
            {/* Status card */}
            <div className="p-4 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs text-white/40 block mb-1">WHERE AM I?</span>
              <span className="text-lg font-medium text-white block">2nd Year, AI & ML</span>
              <span className="text-xs text-white/60 mt-1 block">
                Skills: Python, C, Git, HTML, CSS
              </span>
            </div>

            {/* Target card */}
            <div className="p-4 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs text-white/40 block mb-1">WHERE AM I GOING?</span>
              <span className="text-lg font-medium text-white block">Full Stack Developer</span>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-[#5ce1e6] font-mono font-semibold">
                  Readiness: 68%
                </span>
                <span className="text-[11px] text-white/40">5 Missing Gaps</span>
              </div>
            </div>

            {/* Next Best Action */}
            <div className="p-4 rounded bg-[#5ce1e6]/[0.06] border border-[#5ce1e6]/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#5ce1e6] font-bold block mb-1">
                  WHAT SHOULD I DO TODAY?
                </span>
                <span className="text-sm font-semibold text-white block">
                  Complete JavaScript Fundamentals
                </span>
                <p className="text-xs text-white/60 mt-1 leading-snug">
                  Highest priority gap for Full Stack Developer target.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#5ce1e6] font-semibold mt-3 hover:underline"
              >
                Launch Dashboard Demo <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4-Year Journey Section ─── */}
      <section id="journey" className="editorial-shell py-16 md:py-24 border-t border-white/[0.08]">
        <div className="max-w-2xl mb-14">
          <span className="eyebrow block text-[#5ce1e6] mb-2">4-Year Companion</span>
          <h2 className="text-3xl md:text-5xl font-normal text-white mb-4">
            From first year to placement.
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            CareerFit adapts as students grow. An empty resume in 1st year is normal —
            CareerFit meets students at their current stage and guides them every semester.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fourStages.map((stage) => {
            const Icon = stage.icon
            return (
              <div
                key={stage.num}
                className="editorial-card p-6 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#5ce1e6] font-semibold">
                      {stage.num}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 tracking-wider">
                      {stage.tag}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white mb-4">
                    <Icon className="w-4 h-4 text-[#5ce1e6]" />
                  </div>

                  <h3 className="text-xl font-normal text-white mb-2">{stage.title}</h3>
                  <p className="text-xs text-white/60 mb-5 leading-relaxed">{stage.goal}</p>

                  <ul className="space-y-2 border-t border-white/[0.06] pt-4 mb-6">
                    {stage.focus.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="text-[#5ce1e6] text-[10px] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/[0.06] bg-white/[0.01] -mx-6 -mb-6 p-4 rounded-b">
                  <span className="text-[10px] font-mono text-white/40 block mb-1 uppercase">
                    Sample Next Action:
                  </span>
                  <span className="text-xs text-white/85 font-medium block">
                    {stage.exampleAction}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── The Continuous Loop ─── */}
      <section id="methodology" className="editorial-shell py-16 md:py-24 border-t border-white/[0.08]">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow block text-[#5ce1e6] mb-2">Continuous Intelligence</span>
          <h2 className="text-3xl md:text-5xl font-normal text-white mb-4">
            The 8-step continuous loop.
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            CareerFit isn&apos;t a one-time test. It continuously assesses, instructs,
            measures practice, and recalibrates your next best move.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {loopSteps.map((step, idx) => (
            <div key={step.name} className="p-4 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-[#5ce1e6] font-bold block mb-1">
                0{idx + 1}
              </span>
              <span className="text-sm font-semibold text-white block mb-1">{step.name}</span>
              <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Product Features Grid ─── */}
      <section id="features" className="editorial-shell py-16 md:py-24 border-t border-white/[0.08]">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow block text-[#5ce1e6] mb-2">Designed for Real Impact</span>
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4">
            Everything college students need to succeed.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="editorial-card p-6">
            <h4 className="text-base font-medium text-white mb-2">Automated Skill-Gap Mapping</h4>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Compare your experience directly against industry expectations. See what matches,
              what is missing, and why it matters.
            </p>
            <span className="text-xs text-[#5ce1e6] font-mono">Precision gap matching</span>
          </div>

          <div className="editorial-card p-6">
            <h4 className="text-base font-medium text-white mb-2">AI Interview & Speech Coach</h4>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Practice HR, technical, and behavioral questions before real campus placements with
              instant clarity, relevance, and structure ratings.
            </p>
            <span className="text-xs text-[#5ce1e6] font-mono">Feedback loop</span>
          </div>

          <div className="editorial-card p-6">
            <h4 className="text-base font-medium text-white mb-2">Quantitative Progress Tracking</h4>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Watch your readiness grow semester by semester from 42% to 68%+ with historical
              evaluations and verified milestones.
            </p>
            <span className="text-xs text-[#5ce1e6] font-mono">Measurable growth</span>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="editorial-shell py-20 border-t border-white/[0.08] text-center">
        <div className="max-w-xl mx-auto">
          <span className="eyebrow block text-[#5ce1e6] mb-3">SIH 2026 Presentation</span>
          <h2 className="text-3xl md:text-5xl font-normal text-white mb-6">
            From &ldquo;I don&apos;t know what to do&rdquo; to &ldquo;I know what to do next.&rdquo;
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="/login" className="btn-accent text-sm py-3 px-8">
              Open Demo Dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer id="about" className="border-t border-white/[0.06] py-8 text-xs text-white/40">
        <div className="editorial-shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-white/70 font-medium">CareerFit AI</span> — Smart India Hackathon
            2026 Demo Project
          </div>
          <div>Built for college students with zero to advanced experience</div>
        </div>
      </footer>
    </div>
  )
}