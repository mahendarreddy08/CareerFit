import { NextResponse } from "next/server"

const apiUrl = (process.env.NEXT_PUBLIC_CAREERFIT_API_URL || "http://127.0.0.1:8001").replace(/\/$/, "")

export async function POST(request: Request) {
  try {
    const response = await fetch(`${apiUrl}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await request.text(),
      cache: "no-store",
    })

    const body = await response.text()
    return new NextResponse(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") || "application/json" },
    })
  } catch {
    return NextResponse.json({ message: "CareerFit service unavailable" }, { status: 503 })
  }
}

export const runtime = "nodejs"
