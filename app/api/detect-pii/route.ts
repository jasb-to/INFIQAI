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

    // Detect PII in the document using OpenAI
    const piiResult = await detectPII(text)

    return NextResponse.json(piiResult)
  } catch (error: any) {
    console.error("Error detecting PII:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

async function detectPII(text: string) {
  // Define the system prompt for PII detection
  const systemPrompt = `
    You are an AI assistant specialized in detecting Personally Identifiable Information (PII) in documents.
    Analyze the provided text and identify all instances of PII, including but not limited to:
    - Names
    - Addresses
    - Email addresses
    - Phone numbers
    - Social security numbers
    - Credit card numbers
    - Dates of birth
    - Passport numbers
    - Driver's license numbers
    - IP addresses
    - Biometric data references
    
    Provide your analysis in the following JSON format:
    {
      "piiDetected": [
        {
          "type": "email",
          "instances": [
            {"value": "j***@example.com", "location": "paragraph 2, line 3"}
          ]
        },
        {
          "type": "phone",
          "instances": [
            {"value": "***-***-1234", "location": "header"}
          ]
        }
      ],
      "totalCount": 5,
      "riskLevel": "high",
      "recommendations": [
        "Redact all email addresses",
        "Remove phone numbers from headers"
      ]
    }
    
    Important: For privacy and security, partially mask the actual PII values in your response.
  `

  try {
    const { text: piiText } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: text,
    })

    // Parse the JSON response
    const piiAnalysis = JSON.parse(piiText)

    return piiAnalysis
  } catch (error) {
    console.error("Error in PII detection:", error)
    throw new Error("Failed to detect PII")
  }
}
