"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnalysisLoading } from "@/components/analysis-loading"

export default function AnalyzingPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/results")
    }, 2800)
    return () => clearTimeout(timer)
  }, [router])

  return <AnalysisLoading />
}
