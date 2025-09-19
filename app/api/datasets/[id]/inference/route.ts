import { type NextRequest, NextResponse } from "next/server"
import { HuggingFaceService } from "@/lib/huggingface"
import { DecisionEngine } from "@/lib/decision-engine"
import { AuditLogger } from "@/lib/audit-logger"
import type { LabelingTask, ModelPrediction } from "@/types/labeling"

const hfService = new HuggingFaceService(process.env.HUGGINGFACE_API_KEY || "")
const auditLogger = new AuditLogger()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { items, modelConfig, userId } = await request.json()
    const datasetId = params.id

    await auditLogger.log("INFERENCE_STARTED", userId, { datasetId, itemCount: items.length, modelConfig }, datasetId)

    const results: LabelingTask[] = []

    for (const item of items) {
      try {
        let prediction: ModelPrediction

        if (modelConfig.taskType === "classification") {
          const result = await hfService.classifyText(item.content, modelConfig.huggingFaceModel)
          prediction = {
            labels: result.labels.map((l) => l.label),
            confidence: result.confidence,
            modelVersion: modelConfig.version,
            inferenceTime: Date.now(),
          }
        } else if (modelConfig.taskType === "NER") {
          const result = await hfService.extractEntities(item.content, modelConfig.huggingFaceModel)
          prediction = {
            labels: [],
            confidence: result.confidence,
            modelVersion: modelConfig.version,
            inferenceTime: Date.now(),
            entities: result.entities.map((e) => ({
              text: e.word,
              label: e.entity,
              start: e.start,
              end: e.end,
              confidence: e.score,
            })),
          }
        } else {
          throw new Error(`Unsupported task type: ${modelConfig.taskType}`)
        }

        const decisionEngine = new DecisionEngine({
          autoAccept: 0.95,
          quickReview: 0.6,
          fullHuman: 0.0,
        })

        const decision = decisionEngine.makeDecision(prediction)

        const task: LabelingTask = {
          id: crypto.randomUUID(),
          datasetId,
          itemId: item.id,
          content: item.content,
          taskType: modelConfig.taskType,
          modelPrediction: prediction,
          status: decision.action === "AUTO_ACCEPT" ? "auto_accepted" : "needs_review",
          confidence: prediction.confidence,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        results.push(task)

        await auditLogger.log(
          "INFERENCE_COMPLETED",
          "system",
          {
            taskId: task.id,
            decision: decision.action,
            confidence: prediction.confidence,
            reasoning: decision.reasoning,
          },
          datasetId,
          task.id,
        )
      } catch (error) {
        await auditLogger.log("INFERENCE_FAILED", "system", { itemId: item.id, error: error.message }, datasetId)
        console.error(`Inference failed for item ${item.id}:`, error)
      }
    }

    return NextResponse.json({ tasks: results })
  } catch (error) {
    console.error("Inference API error:", error)
    return NextResponse.json({ error: "Inference failed" }, { status: 500 })
  }
}
