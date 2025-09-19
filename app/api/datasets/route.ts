import { type NextRequest, NextResponse } from "next/server"
import type { Dataset } from "@/types/labeling"

// Mock database - in production, use proper database
const datasets: Dataset[] = []

export async function GET() {
  return NextResponse.json({ datasets })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const dataset: Dataset = {
      id: crypto.randomUUID(),
      name: body.name,
      description: body.description,
      taskType: body.taskType,
      status: "uploading",
      totalItems: 0,
      labeledItems: 0,
      autoAcceptedItems: 0,
      humanReviewItems: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      customerId: body.customerId,
      confidenceThresholds: body.confidenceThresholds || {
        autoAccept: 0.95,
        quickReview: 0.6,
        fullHuman: 0.0,
      },
    }

    datasets.push(dataset)

    return NextResponse.json({ dataset }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create dataset" }, { status: 500 })
  }
}
