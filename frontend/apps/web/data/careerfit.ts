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
  score: 53.57,
  matchedSkills: ["Python", "Git", "GitHub", "REST API"],
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
    title: "Add your resume",
    description:
      "Upload a PDF or DOCX, or paste your resume text directly. CareerFit reads your experience and extracts the skills you already have.",
  },
  {
    step: "02",
    title: "Add the target role",
    description:
      "Paste the job description for the role you want. CareerFit identifies the skills the role actually requires.",
  },
  {
    step: "03",
    title: "See your fit and next move",
    description:
      "Get a clear match score, see what you already have, what is missing, and which skill to learn next.",
  },
]