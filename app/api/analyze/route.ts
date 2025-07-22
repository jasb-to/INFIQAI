import { NextResponse } from "next/server"
import { auth } from "@/lib/firebase-admin"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    // Get the authorization token from the request headers
    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split("Bearer ")[1]

    // Verify the token
    try {
      await auth.verifyIdToken(token)
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get the text to analyze from the request body
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Analyze the document using OpenAI
    const analysisResult = await analyzeDocument(text)

    return NextResponse.json(analysisResult)
  } catch (error: any) {
    console.error("Error analyzing document:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

async function analyzeDocument(text: string) {
  // Define the system prompt for document analysis
  const systemPrompt = `
    You are an AI assistant specialized in document compliance analysis. 
    Analyze the provided document text for:
    1. Personally Identifiable Information (PII) such as names, addresses, emails, phone numbers, etc.
    2. Compliance issues related to GDPR, HIPAA, PCI DSS, and other common regulations.
    3. Potential risks and recommendations for improvement.
    
    Provide your analysis in the following JSON format:
    {
      "piiDetected": [
        {"type": "email", "count": 2, "context": "Found in section X"},
        {"type": "phone", "count": 1, "context": "Found in header"}
      ],
      "complianceIssues": [
        {"regulation": "GDPR", "issue": "Missing data retention policy", "severity": "medium"},
        {"regulation": "HIPAA", "issue": "Unencrypted PHI reference", "severity": "high"}
      ],
      "overallRisk": "medium",
      "complianceScore": 75,
      "recommendations": [
        "Add a data retention policy statement",
        "Encrypt all PHI references"
      ]
    }
  `

  try {
    const { text: analysisText } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: text,
    })

    // Parse the JSON response
    const analysis = JSON.parse(analysisText)

    // Calculate total PII count
    const piiCount = analysis.piiDetected.reduce((sum: number, item: { count: number }) => sum + item.count, 0)

    return {
      ...analysis,
      piiCount,
    }
  } catch (error) {
    console.error("Error in AI analysis:", error)
    throw new Error("Failed to analyze document")
  }
}
