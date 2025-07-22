export const analyzeDocument = async (text: string) => {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error("Failed to analyze document")
    }

    return await response.json()
  } catch (error) {
    console.error("Error analyzing document:", error)
    throw error
  }
}

export const detectPII = async (text: string) => {
  try {
    const response = await fetch("/api/detect-pii", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error("Failed to detect PII")
    }

    return await response.json()
  } catch (error) {
    console.error("Error detecting PII:", error)
    throw error
  }
}
