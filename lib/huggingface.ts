import { HfInference } from "@huggingface/inference"

export class HuggingFaceService {
  private hf: HfInference
  private isPrivate: boolean
  private endpoint?: string

  constructor(apiKey: string, isPrivate = true, endpoint?: string) {
    this.hf = new HfInference(apiKey)
    this.isPrivate = isPrivate
    this.endpoint = endpoint
  }

  async classifyText(
    text: string,
    model: string,
  ): Promise<{
    labels: Array<{ label: string; score: number }>
    confidence: number
  }> {
    try {
      const startTime = Date.now()

      const result = await this.hf.textClassification({
        model,
        inputs: text,
      })

      const inferenceTime = Date.now() - startTime
      const topResult = Array.isArray(result) ? result[0] : result
      const confidence = topResult.score

      return {
        labels: Array.isArray(result) ? result : [result],
        confidence,
      }
    } catch (error) {
      console.error("HuggingFace classification error:", error)
      throw new Error("Model inference failed")
    }
  }

  async extractEntities(
    text: string,
    model: string,
  ): Promise<{
    entities: Array<{
      entity: string
      score: number
      index: number
      word: string
      start: number
      end: number
    }>
    confidence: number
  }> {
    try {
      const result = await this.hf.tokenClassification({
        model,
        inputs: text,
      })

      const entities = Array.isArray(result) ? result : [result]
      const avgConfidence = entities.reduce((sum, entity) => sum + entity.score, 0) / entities.length

      return {
        entities,
        confidence: avgConfidence,
      }
    } catch (error) {
      console.error("HuggingFace NER error:", error)
      throw new Error("Entity extraction failed")
    }
  }

  async getModelInfo(model: string) {
    try {
      // In a real implementation, this would fetch model metadata
      return {
        modelId: model,
        pipeline_tag: "text-classification",
        library_name: "transformers",
        private: this.isPrivate,
      }
    } catch (error) {
      console.error("Error fetching model info:", error)
      throw error
    }
  }
}
