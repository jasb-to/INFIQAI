import { type NextRequest, NextResponse } from "next/server"
import { AuditLogger } from "@/lib/audit-logger"
import type { HumanReview } from "@/types/labeling"

const auditLogger = new AuditLogger()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { review, userId } = await request.json()
    const taskId = params.id

    const humanReview: HumanReview = {
      reviewerId: userId,
      labels: review.labels,
      entities: review.entities,
      timeSpent: review.timeSpent,
      confidence: review.confidence,
      notes: review.notes,
      reviewedAt: new Date(),
    }

    // In production, update the task in database
    await auditLogger.log(
      "HUMAN_REVIEW_COMPLETED",
      userId,
      {
        taskId,
        originalLabels: review.originalLabels,
        newLabels: review.labels,
        timeSpent: review.timeSpent,
        confidence: review.confidence,
      },
      undefined,
      taskId,
    )

    return NextResponse.json({
      success: true,
      review: humanReview,
    })
  } catch (error) {
    console.error("Review submission error:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
