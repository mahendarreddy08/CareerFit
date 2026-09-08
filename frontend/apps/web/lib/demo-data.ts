export interface StudentProfile {
  name: string
  year: "First Year" | "Second Year" | "Third Year" | "Fourth Year"
  yearStage: "01 DISCOVER" | "02 BUILD" | "03 PREPARE" | "04 PERFORM"
  branch: string
  college: string
  targetCareer: string
  careerReadiness: number
  metrics: {
    technicalSkills: number
    projects: number
    resume: number
    communication: number
    interview: number
  }
  currentSkills: string[]
  missingSkills: {
    name: string
    priority: "High" | "Medium" | "Useful"
    why: string
    currentLevel: string
    requiredLevel: string
    action: string
  }[]
  nextBestAction: {
    title: string
    reason: string
    skill: string
    link: string
    estimatedTime: string
    category: "Learning" | "Project" | "Assessment" | "Interview"
  }
  roadmap: {
    id: number
    title: string
    status: "completed" | "current" | "locked"
    description: string
    estimatedWeeks: string
  }[]
  progressHistory: {
    checkpoint: string
    score: number
    date: string
  }[]
  projectsCompleted: number
  totalProjectsTarget: number
  interviewPracticeCount: number
  totalInterviewTarget: number
}

export const DEFAULT_DEMO_STUDENT: StudentProfile = {
  name: "Mahendar Reddy",
  year: "Second Year",
  yearStage: "02 BUILD",
  branch: "CSE – AI & ML",
  college: "Stanley College of Engineering and Technology",
  targetCareer: "Full Stack Developer",
  careerReadiness: 68,
  metrics: {
    technicalSkills: 72,
    projects: 64,
    resume: 78,
    communication: 61,
    interview: 54,
  },
  currentSkills: ["Python", "C", "HTML", "CSS", "Git", "GitHub"],
  missingSkills: [
    {
      name: "JavaScript",
      priority: "High",
      why: "Required for modern interactive web development and async programming.",
      currentLevel: "Beginner (Basics)",
      requiredLevel: "Proficient (ES6+, DOM, Async)",
      action: "Complete JavaScript Fundamentals module",
    },
    {
      name: "SQL",
      priority: "High",
      why: "Essential for data querying, relational modeling, and backend database integrations.",
      currentLevel: "Not started",
      requiredLevel: "Intermediate (Queries, Joins, Indexing)",
      action: "Start SQL & Relational Databases roadmap",
    },
    {
      name: "React",
      priority: "Medium",
      why: "Industry standard frontend component library for scalable web applications.",
      currentLevel: "Not started",
      requiredLevel: "Proficient (Hooks, State Management)",
      action: "Unlock after JavaScript Fundamentals",
    },
    {
      name: "REST APIs",
      priority: "Medium",
      why: "Core architectural pattern for connecting frontend clients with server logic.",
      currentLevel: "Conceptual",
      requiredLevel: "Hands-on (FastAPI / Express API design)",
      action: "Build API endpoints in project milestone",
    },
    {
      name: "Docker",
      priority: "Useful",
      why: "Containerization tool for predictable development environments and deployment.",
      currentLevel: "Not started",
      requiredLevel: "Foundational (Dockerfile, Containers)",
      action: "Scheduled for Year 3 Industry Readiness",
    },
  ],
  nextBestAction: {
    title: "Complete JavaScript Fundamentals",
    reason:
      "JavaScript is currently the highest-priority skill missing from your target role (Full Stack Developer). Mastering ES6 and async execution will unlock React and REST API building.",
    skill: "JavaScript",
    link: "/learning",
    estimatedTime: "45 mins today",
    category: "Learning",
  },
  roadmap: [
    {
      id: 1,
      title: "Programming Foundations (Python & C)",
      status: "completed",
      description: "Basic syntax, control flow, loops, functions, and memory concepts.",
      estimatedWeeks: "Weeks 1–4",
    },
    {
      id: 2,
      title: "Version Control with Git & GitHub",
      status: "completed",
      description: "Branching, committing, pull requests, and repository management.",
      estimatedWeeks: "Weeks 5–6",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals & ES6+",
      status: "current",
      description: "Modern JavaScript, array methods, closures, promises, async/await.",
      estimatedWeeks: "Weeks 7–8 (In Progress)",
    },
    {
      id: 4,
      title: "React & Component Architecture",
      status: "locked",
      description: "State, hooks, reusable UI patterns, and client-side routing.",
      estimatedWeeks: "Weeks 9–11",
    },
    {
      id: 5,
      title: "SQL & Relational Databases",
      status: "locked",
      description: "PostgreSQL, schema design, normalization, complex querying.",
      estimatedWeeks: "Weeks 12–13",
    },
    {
      id: 6,
      title: "REST APIs & Backend Integration",
      status: "locked",
      description: "Endpoints, authentication, middleware, and request lifecycles.",
      estimatedWeeks: "Weeks 14–15",
    },
    {
      id: 7,
      title: "Full Stack Production Project",
      status: "locked",
      description: "End-to-end web app with auth, database, tests, and CI deployment.",
      estimatedWeeks: "Weeks 16–18",
    },
    {
      id: 8,
      title: "Placement & Interview Preparation",
      status: "locked",
      description: "Technical coding assessments, system design basics, HR mock interviews.",
      estimatedWeeks: "Weeks 19–20",
    },
  ],
  progressHistory: [
    { checkpoint: "1st Year Onboarding", score: 42, date: "Aug 2025" },
    { checkpoint: "Programming Foundation Done", score: 51, date: "Nov 2025" },
    { checkpoint: "Git & Web Basics Verified", score: 58, date: "Jan 2026" },
    { checkpoint: "Current 2nd Year Checkpoint", score: 68, date: "Current" },
  ],
  projectsCompleted: 2,
  totalProjectsTarget: 4,
  interviewPracticeCount: 3,
  totalInterviewTarget: 10,
}

// First Year preset for demoing the 4-year difference
export const FIRST_YEAR_PRESET: StudentProfile = {
  name: "Ananya Sharma",
  year: "First Year",
  yearStage: "01 DISCOVER",
  branch: "Computer Science",
  college: "Stanley College of Engineering and Technology",
  targetCareer: "Exploring Software Engineering",
  careerReadiness: 24,
  metrics: {
    technicalSkills: 30,
    projects: 10,
    resume: 20,
    communication: 45,
    interview: 15,
  },
  currentSkills: ["Python (Beginner)", "Problem Solving"],
  missingSkills: [
    {
      name: "C / C++ Basics",
      priority: "High",
      why: "Builds deep mental models for memory management and algorithmic thinking.",
      currentLevel: "Not started",
      requiredLevel: "Foundational",
      action: "Start First-Year C Programming Module",
    },
    {
      name: "Git & GitHub",
      priority: "High",
      why: "Start building a verifiable public portfolio from day one.",
      currentLevel: "Not started",
      requiredLevel: "Beginner",
      action: "Complete 1-hour Git walkthrough",
    },
    {
      name: "Web Basics (HTML/CSS)",
      priority: "Medium",
      why: "Immediate visual gratification by creating your first personal homepage.",
      currentLevel: "Not started",
      requiredLevel: "Beginner",
      action: "Build your first student portfolio page",
    },
  ],
  nextBestAction: {
    title: "Complete Python Fundamentals Lab 3",
    reason:
      "As a first-year student, building solid coding confidence in Python is your primary lever before picking a specialized branch.",
    skill: "Python",
    link: "/learning",
    estimatedTime: "30 mins today",
    category: "Learning",
  },
  roadmap: [
    {
      id: 1,
      title: "Explore Tech Horizons & Career Discovery",
      status: "completed",
      description: "Understand AI, Web, Cloud, and Systems domains.",
      estimatedWeeks: "Weeks 1–2",
    },
    {
      id: 2,
      title: "Python Fundamentals & Logic Building",
      status: "current",
      description: "Variables, conditions, loops, and basic problem solving.",
      estimatedWeeks: "Weeks 3–6 (In Progress)",
    },
    {
      id: 3,
      title: "Git & Your First GitHub Repository",
      status: "locked",
      description: "Create your GitHub profile and push your first project.",
      estimatedWeeks: "Weeks 7–8",
    },
    {
      id: 4,
      title: "First Mini Project (CLI or Game)",
      status: "locked",
      description: "Combine Python & Git to build an interactive command line app.",
      estimatedWeeks: "Weeks 9–10",
    },
  ],
  progressHistory: [
    { checkpoint: "Welcome Assessment", score: 12, date: "Aug 2025" },
    { checkpoint: "Python Syntax Started", score: 24, date: "Current" },
  ],
  projectsCompleted: 0,
  totalProjectsTarget: 2,
  interviewPracticeCount: 0,
  totalInterviewTarget: 5,
}

// Helper to get active profile from browser storage or default
export function getActiveStudent(): StudentProfile {
  if (typeof window === "undefined") return DEFAULT_DEMO_STUDENT
  const raw = sessionStorage.getItem("careerfit_active_student")
  if (!raw) return DEFAULT_DEMO_STUDENT
  try {
    return JSON.parse(raw) as StudentProfile
  } catch {
    return DEFAULT_DEMO_STUDENT
  }
}

export function saveActiveStudent(profile: StudentProfile): void {
  if (typeof window === "undefined") return
  sessionStorage.setItem("careerfit_active_student", JSON.stringify(profile))
}
