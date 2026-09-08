export type SkillGap = {
  name: string
  priority: "Critical" | "High" | "Useful"
}

export type AnalysisResult = {
  score: number
  matchedSkills: string[]
  skillGaps: SkillGap[]
  nextMove: {
    skill: string
    reason: string
  }
}

export const placeholderAnalysis: AnalysisResult = {
  score: 78,
  matchedSkills: [
    "Python",
    "C",
    "Git",
    "GitHub",
    "REST API",
    "Data Structures",
    "Problem Solving",
    "Algorithms",
  ],
  skillGaps: [
    { name: "FastAPI", priority: "Critical" },
    { name: "SQL", priority: "High" },
    { name: "Docker", priority: "Useful" },
    { name: "Linux", priority: "Useful" },
  ],
  nextMove: {
    skill: "FastAPI",
    reason:
      "It is currently the highest-priority missing skill for this role.",
  },
}

export const howItWorks = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Understand where you are.",
    description:
      "Upload your resume and let our AI extract every skill, technology, and experience — building a complete profile of your capabilities.",
  },
  {
    step: "02",
    title: "Identify",
    subtitle: "See what stands between you and your goal.",
    description:
      "Compare your profile against your target role's requirements. Our AI maps every gap with precision.",
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Know exactly what to learn next.",
    description:
      "Get AI-prioritized recommendations and a personalized learning roadmap ranked by career impact.",
  },
  {
    step: "04",
    title: "Become Ready",
    subtitle: "Turn preparation into opportunity.",
    description:
      "Track your progress from skill gaps to career readiness. When you're ready, you'll know it.",
  },
]