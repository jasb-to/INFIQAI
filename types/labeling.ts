export interface Dataset {
  id: string
  name: string
  description: string
  taskType: "NER" | "classification" | "multi-label" | "contract-tagging"
  status: "uploading" | "processing" | "ready" | "completed"
  totalItems: number
  labeledItems: number
  autoAcceptedItems: number
  humanReviewItems: number
  createdAt: Date
  updatedAt: Date
  customerId: string
  confidenceThresholds: ConfidenceThresholds
}

export interface ConfidenceThresholds {
  autoAccept: number // >= 0.95
  quickReview: number // >= 0.60
  fullHuman: number // < 0.60
}

export interface LabelingTask {
  id: string
  datasetId: string
  itemId: string
  content: string
  taskType: string
  modelPrediction: ModelPrediction
  humanReview?: HumanReview
  status: "pending" | "auto_accepted" | "needs_review" | "reviewed" | "completed"
  confidence: number
  createdAt: Date
  updatedAt: Date
}

export interface ModelPrediction {
  labels: string[]
  confidence: number
  modelVersion: string
  inferenceTime: number
  entities?: Entity[]
}

export interface Entity {
  text: string
  label: string
  start: number
  end: number
  confidence: number
}

export interface HumanReview {
  reviewerId: string
  labels: string[]
  entities?: Entity[]
  timeSpent: number
  confidence: number
  notes?: string
  reviewedAt: Date
}

export interface AuditLog {
  id: string
  action: string
  actor: string
  datasetId?: string
  taskId?: string
  timestamp: Date
  details: Record<string, any>
  checksum: string
}

export interface ModelConfig {
  id: string
  name: string
  huggingFaceModel: string
  taskType: string
  isPrivate: boolean
  endpoint?: string
  version: string
  performance: ModelPerformance
}

export interface ModelPerformance {
  accuracy: number
  f1Score: number
  precision: number
  recall: number
  autoAcceptRate: number
  humanCorrectionRate: number
}
