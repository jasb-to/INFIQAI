import type { ConfidenceThresholds, ModelPrediction } from "@/types/labeling"

export class DecisionEngine {
  private thresholds: ConfidenceThresholds

  constructor(thresholds: ConfidenceThresholds) {
    this.thresholds = thresholds
  }

  makeDecision(prediction: ModelPrediction): {
    action: "AUTO_ACCEPT" | "QUICK_REVIEW" | "FULL_HUMAN"
    confidence: number
    reasoning: string
  } {
    const confidence = prediction.confidence

    if (confidence >= this.thresholds.autoAccept) {
      return {
        action: "AUTO_ACCEPT",
        confidence,
        reasoning: `High confidence (${confidence.toFixed(3)}) exceeds auto-accept threshold (${this.thresholds.autoAccept})`,
      }
    }

    if (confidence >= this.thresholds.quickReview) {
      return {
        action: "QUICK_REVIEW",
        confidence,
        reasoning: `Medium confidence (${confidence.toFixed(3)}) requires quick human review`,
      }
    }

    return {
      action: "FULL_HUMAN",
      confidence,
      reasoning: `Low confidence (${confidence.toFixed(3)}) requires full human annotation`,
    }
  }

  updateThresholds(newThresholds: Partial<ConfidenceThresholds>) {
    this.thresholds = { ...this.thresholds, ...newThresholds }
  }

  getThresholds(): ConfidenceThresholds {
    return { ...this.thresholds }
  }

  validateThresholds(thresholds: ConfidenceThresholds): boolean {
    return (
      thresholds.autoAccept > thresholds.quickReview &&
      thresholds.quickReview > thresholds.fullHuman &&
      thresholds.autoAccept <= 1.0 &&
      thresholds.fullHuman >= 0.0
    )
  }
}
