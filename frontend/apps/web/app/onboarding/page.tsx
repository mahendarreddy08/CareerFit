"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Check, Upload, Sparkles, CheckCircle2, ChevronLeft } from "lucide-react"
import { saveActiveStudent, DEFAULT_DEMO_STUDENT, StudentProfile } from "@/lib/demo-data"

const YEARS = ["First Year", "Second Year", "Third Year", "Fourth Year"]
const BRANCHES = [
  "CSE – AI & ML",
  "Computer Science & Engineering",
  "Data Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical & Electronics",
]
const INTERESTS = [
  "Full Stack Web Development",
  "Artificial Intelligence & ML",
  "Cloud & DevOps",
  "Data Science & Analytics",
  "Cybersecurity",
  "Mobile App Development",
  "I'm not sure yet — help me explore",
]
const CAREER_GOALS = [
  "Full Stack Developer",
  "AI / ML Engineer",
  "Data Scientist",
  "Cloud Engineer",
  "Software Engineer",
  "Cybersecurity Analyst",
  "Undecided (Discovery Mode)",
]
const SKILL_BUCKETS = [
  { category: "Programming", skills: ["Python", "C", "C++", "Java", "JavaScript"] },
  { category: "Web Technologies", skills: ["HTML", "CSS", "React", "Node.js"] },
  { category: "Data & Databases", skills: ["SQL", "MongoDB", "Pandas"] },
  { category: "Developer Tools", skills: ["Git", "GitHub", "Linux", "Docker"] },
]
const COMMUNICATION_LEVELS = [
  { level: "Developing", desc: "I feel nervous speaking in English and technical interviews." },
  { level: "Moderate", desc: "I can explain simple concepts but need structured practice." },
  { level: "Confident", desc: "I communicate comfortably in group discussions and presentations." },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)

  // Form State
  const [name, setName] = useState("Mahendar Reddy")
  const [year, setYear] = useState("Second Year")
  const [branch, setBranch] = useState("CSE – AI & ML")
  const [interests, setInterests] = useState<string[]>(["Full Stack Web Development"])
  const [careerGoal, setCareerGoal] = useState("Full Stack Developer")
  const [currentSkills, setCurrentSkills] = useState<string[]>([
    "Python",
    "C",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
  ])
  const [resumeName, setResumeName] = useState<string | null>(null)
  const [communication, setCommunication] = useState("Moderate")

  function toggleInterest(item: string) {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  function toggleSkill(skill: string) {
    setCurrentSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  function handleComplete() {
    setAnalyzing(true)

    const analysisSequence = [
      "Reading student profile...",
      "Identifying validated skills...",
      "Comparing industry role requirements...",
      "Calculating competency gaps & priorities...",
      "Synthesizing your personalized roadmap...",
    ]

    analysisSequence.forEach((_, idx) => {
      setTimeout(() => {
        setAnalysisStep(idx + 1)
      }, (idx + 1) * 700)
    })

    setTimeout(() => {
      // Determine stage and readiness
      let stage: StudentProfile["yearStage"] = "02 BUILD"
      if (year === "First Year") stage = "01 DISCOVER"
      else if (year === "Third Year") stage = "03 PREPARE"
      else if (year === "Fourth Year") stage = "04 PERFORM"

      const updatedProfile: StudentProfile = {
        ...DEFAULT_DEMO_STUDENT,
        name: name || "Mahendar Reddy",
        year: year as StudentProfile["year"],
        yearStage: stage,
        branch: branch || "CSE – AI & ML",
        targetCareer: careerGoal || "Full Stack Developer",
        currentSkills: currentSkills.length > 0 ? currentSkills : ["Foundational Logic"],
      }

      saveActiveStudent(updatedProfile)
      router.push("/dashboard")
    }, 4200)
  }

  return (
    <div className="cf-bg-atmosphere min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Step Indicator */}
        {!analyzing && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-white/40 font-mono mb-2">
              <span>STEP 0{step} OF 07</span>
              <span>{Math.round((step / 7) * 100)}% COMPLETED</span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5ce1e6] transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ── AI Analysis Screen ── */}
        {analyzing ? (
          <div className="editorial-card p-8 md:p-12 text-center my-12">
            <div className="w-12 h-12 rounded-full bg-[#5ce1e6]/10 border border-[#5ce1e6]/30 flex items-center justify-center text-[#5ce1e6] mx-auto mb-6 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
              Synthesizing Your Career Path
            </h2>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-8">
              CareerFit is cross-referencing your profile against real job requisitions for{" "}
              <span className="text-white font-medium">{careerGoal}</span>.
            </p>

            <div className="max-w-md mx-auto space-y-3 text-left">
              {[
                "Reading student profile & context",
                "Identifying validated technical skills",
                "Comparing industry role requirements",
                "Calculating competency gaps & priorities",
                "Synthesizing your personalized roadmap",
              ].map((msg, i) => {
                const isComplete = analysisStep > i
                const isCurrent = analysisStep === i + 1
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-2.5 rounded border transition-all ${
                      isComplete
                        ? "bg-white/[0.03] border-white/[0.1] text-white"
                        : isCurrent
                        ? "bg-[#5ce1e6]/[0.05] border-[#5ce1e6]/30 text-[#5ce1e6]"
                        : "opacity-30 border-transparent text-white/50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isComplete
                          ? "bg-[#5ce1e6]/20 text-[#5ce1e6]"
                          : isCurrent
                          ? "animate-spin text-[#5ce1e6]"
                          : "text-white/20"
                      }`}
                    >
                      {isComplete ? <Check className="w-3.5 h-3.5" /> : "•"}
                    </div>
                    <span className="text-xs">{msg}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="editorial-card p-6 md:p-10">
            {/* Step 1: Name & Year */}
            {step === 1 && (
              <div>
                <span className="eyebrow block text-[#5ce1e6] mb-2">Basic Information</span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                  What should we call you?
                </h2>
                <p className="text-xs text-white/50 mb-6">
                  Personalizes your dashboard, roadmap, and mock interview feedback.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input text-sm"
                      placeholder="e.g. Mahendar Reddy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 mb-2">
                      Which academic year are you currently in?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {YEARS.map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => setYear(y)}
                          className={`p-3 rounded text-xs font-medium border text-center transition-all ${
                            year === y
                              ? "bg-[#5ce1e6]/10 border-[#5ce1e6] text-[#5ce1e6]"
                              : "bg-white/[0.02] border-white/[0.08] text-white/70 hover:border-white/20"
                          }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Branch */}
            {step === 2 && (
              <div>
                <span className="eyebrow block text-[#5ce1e6] mb-2">Academic Context</span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                  What is your branch of study?
                </h2>
                <p className="text-xs text-white/50 mb-6">
                  Helps us calibrate coursework relevance and foundational syllabus.
                </p>

                <div className="space-y-2 mb-6">
                  {BRANCHES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBranch(b)}
                      className={`w-full p-3 rounded text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        branch === b
                          ? "bg-[#5ce1e6]/10 border-[#5ce1e6] text-white"
                          : "bg-white/[0.02] border-white/[0.08] text-white/70 hover:border-white/20"
                      }`}
                    >
                      <span>{b}</span>
                      {branch === b && <Check className="w-4 h-4 text-[#5ce1e6]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <div>
                <span className="eyebrow block text-[#5ce1e6] mb-2">Interests</span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                  What domains interest you most?
                </h2>
                <p className="text-xs text-white/50 mb-6">
                  Select any areas you would like to explore or build skills in.
                </p>

                <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                  {INTERESTS.map((item) => {
                    const isSelected = interests.includes(item)
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`p-3 rounded text-left text-xs border transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#5ce1e6]/10 border-[#5ce1e6] text-white"
                            : "bg-white/[0.02] border-white/[0.08] text-white/70 hover:border-white/20"
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#5ce1e6]" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Career Goal */}
            {step === 4 && (
              <div>
                <span className="eyebrow block text-[#5ce1e6] mb-2">Career Destination</span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                  Do you already have a target role in mind?
                </h2>
                <p className="text-xs text-white/50 mb-6">
                  We use this target to run precision skill-gap analysis against real hiring bars.
                </p>

                <div className="space-y-2 mb-6">
                  {CAREER_GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setCareerGoal(goal)}
                      className={`w-full p-3 rounded text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        careerGoal === goal
                          ? "bg-[#5ce1e6]/10 border-[#5ce1e6] text-white"
                          : "bg-white/[0.02] border-white/[0.08] text-white/70 hover:border-white/20"
                      }`}
                    >
                      <span>{goal}</span>
                      {careerGoal === goal && <Check className="w-4 h-4 text-[#5ce1e6]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Current Skills */}
            {step === 5 && (
              <div>
                <span className="eyebrow block text-[#5ce1e6] mb-2">Current Competencies</span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                  What skills do you currently know?
                </h2>
                <p className="text-xs text-white/50 mb-6">
                  Select what you have practiced. If you are a beginner, it is completely fine to
                  leave this empty or select one.
                </p>

                <div className="space-y-4 mb-6">
                  {SKILL_BUCKETS.map((bucket) => (
                    <div key={bucket.category}>
                      <span className="text-[11px] font-mono text-white/40 block mb-2 uppercase">
                        {bucket.category}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {bucket.skills.map((skill) => {
                          const isSel = currentSkills.includes(skill)
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`px-3 py-1.5 rounded text-xs border transition-all ${
                                isSel
                                  ? "bg-[#5ce1e6]/15 border-[#5ce1e6] text-white font-medium"
                                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:border-white/20"
                              }`}
                            >
                              {skill}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentSkills([])}
                    className="text-xs text-white/40 hover:text-white/70"
                  >
                    Clear selection (I don&apos;t know any of these yet)
                  </button>
                  <span className="text-xs font-mono text-[#5ce1e6]">
                    {currentSkills.length} selected
                  </span>
                </div>
              </div>
            )}

            {/* Step 6: Resume Upload (Optional) */}
            {step === 6 && (
              <div>
                <span className="eyebrow block text-[#5ce1e6] mb-2">Resume Verification</span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                  Do you have a resume?
                </h2>
                <p className="text-xs text-white/50 mb-6">
                  Completely optional. If you have one, upload it and CareerFit will parse
                  experience automatically.
                </p>

                <label className="border-2 border-dashed border-white/[0.12] hover:border-[#5ce1e6]/50 rounded-lg p-8 block text-center cursor-pointer transition-all bg-white/[0.01] hover:bg-white/[0.02] mb-6">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setResumeName(file.name)
                    }}
                  />
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-3" />
                  <span className="text-sm font-medium text-white block mb-1">
                    {resumeName ? resumeName : "Click to select or drag & drop PDF / DOCX"}
                  </span>
                  <span className="text-xs text-white/40 block">
                    {resumeName
                      ? "File attached successfully"
                      : "Optional — skip if you don't have one yet"}
                  </span>
                </label>

                {resumeName && (
                  <div className="flex items-center justify-between p-3 rounded bg-[#5ce1e6]/[0.06] border border-[#5ce1e6]/30 mb-6 text-xs text-white">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5ce1e6]" /> {resumeName}
                    </span>
                    <button
                      type="button"
                      onClick={() => setResumeName(null)}
                      className="text-white/50 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 7: Communication Confidence */}
            {step === 7 && (
              <div>
                <span className="eyebrow block text-[#5ce1e6] mb-2">Interview & Communication</span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2">
                  How confident are you in interview communication?
                </h2>
                <p className="text-xs text-white/50 mb-6">
                  Calibrates the AI Interview Coach module and placement assessment schedule.
                </p>

                <div className="space-y-3 mb-6">
                  {COMMUNICATION_LEVELS.map((item) => (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setCommunication(item.level)}
                      className={`w-full p-4 rounded text-left border transition-all ${
                        communication === item.level
                          ? "bg-[#5ce1e6]/10 border-[#5ce1e6]"
                          : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white">{item.level}</span>
                        {communication === item.level && (
                          <Check className="w-4 h-4 text-[#5ce1e6]" />
                        )}
                      </div>
                      <span className="text-xs text-white/50">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary text-xs py-2.5 px-4"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 7 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-accent text-xs py-2.5 px-6"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="btn-accent text-xs py-2.5 px-6"
                >
                  Let&apos;s Build Your Career Path <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
