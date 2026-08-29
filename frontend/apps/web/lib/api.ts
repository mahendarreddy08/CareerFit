export type SkillPriority = [skill: string, weight: number, priority: string]

export type CareerFitResponse = {
  resume_skills: string[]
  job_skills: string[]
  matched_skills: string[]
  missing_skills: string[]
  basic_score: number
  weighted_score: number
  skill_gap_priority: SkillPriority[]
  recommendations: string | string[]
}

export type CareerFitRequest = {
  resume?: string
  job_description: string
  file?: File
}

const apiUrl = (process.env.NEXT_PUBLIC_CAREERFIT_API_URL || "http://127.0.0.1:8001").replace(/\/$/, "")

function isCareerFitResponse(value: unknown): value is CareerFitResponse {
  if (!value || typeof value !== "object") return false
  const response = value as Record<string, unknown>
  return (
    Array.isArray(response.resume_skills) &&
    Array.isArray(response.job_skills) &&
    Array.isArray(response.matched_skills) &&
    Array.isArray(response.missing_skills) &&
    typeof response.basic_score === "number" &&
    typeof response.weighted_score === "number" &&
    Array.isArray(response.skill_gap_priority) &&
    response.skill_gap_priority.every(
      (item) => Array.isArray(item) && item.length >= 3 && typeof item[0] === "string" && typeof item[1] === "number" && typeof item[2] === "string",
    ) &&
    (typeof response.recommendations === "string" || Array.isArray(response.recommendations))
  )
}

export async function analyzeCareerFit(request: CareerFitRequest): Promise<CareerFitResponse> {
  let response: Response

  try {
    if (request.file) {
      const formData = new FormData()
      formData.append("resume_file", request.file)
      formData.append("job_description", request.job_description)

      response = await fetch(typeof window === "undefined" ? `${apiUrl}/analyze-file` : "/api/analyze-file", {
        method: "POST",
        body: formData,
      })
    } else {
      response = await fetch(typeof window === "undefined" ? `${apiUrl}/analyze` : "/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: request.resume ?? "", job_description: request.job_description }),
      })
    }
  } catch {
    throw new Error("CareerFit is unavailable right now. Check that the analysis service is running and try again.")
  }

  if (!response.ok) {
    let message = "CareerFit could not complete this analysis. Please check your inputs and try again."
    try {
      const errorBody = await response.json() as { detail?: string }
      if (errorBody.detail) {
        message = errorBody.detail
      }
    } catch {
      // Ignore invalid JSON and keep the default message.
    }
    throw new Error(message)
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    throw new Error("CareerFit returned an unexpected response. Please try again.")
  }

  if (!isCareerFitResponse(data)) {
    throw new Error("CareerFit returned an unexpected response. Please try again.")
  }

  return data
}
