import crypto from "crypto"
import type { AuditLog } from "@/types/labeling"

export class AuditLogger {
  private logs: AuditLog[] = []

  async log(
    action: string,
    actor: string,
    details: Record<string, any>,
    datasetId?: string,
    taskId?: string,
  ): Promise<string> {
    const timestamp = new Date()
    const logEntry = {
      action,
      actor,
      datasetId,
      taskId,
      timestamp,
      details,
    }

    // Create checksum for integrity
    const checksum = this.createChecksum(logEntry)

    const auditLog: AuditLog = {
      id: crypto.randomUUID(),
      ...logEntry,
      checksum,
    }

    this.logs.push(auditLog)

    // In production, this would write to a secure, immutable log store
    console.log("AUDIT LOG:", auditLog)

    return auditLog.id
  }

  private createChecksum(data: any): string {
    const content = JSON.stringify(data, Object.keys(data).sort())
    return crypto.createHash("sha256").update(content).digest("hex")
  }

  async getLogs(filters?: {
    datasetId?: string
    actor?: string
    action?: string
    startDate?: Date
    endDate?: Date
  }): Promise<AuditLog[]> {
    let filteredLogs = [...this.logs]

    if (filters) {
      if (filters.datasetId) {
        filteredLogs = filteredLogs.filter((log) => log.datasetId === filters.datasetId)
      }
      if (filters.actor) {
        filteredLogs = filteredLogs.filter((log) => log.actor === filters.actor)
      }
      if (filters.action) {
        filteredLogs = filteredLogs.filter((log) => log.action === filters.action)
      }
      if (filters.startDate) {
        filteredLogs = filteredLogs.filter((log) => log.timestamp >= filters.startDate!)
      }
      if (filters.endDate) {
        filteredLogs = filteredLogs.filter((log) => log.timestamp <= filters.endDate!)
      }
    }

    return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  async exportComplianceReport(datasetId: string): Promise<string> {
    const logs = await this.getLogs({ datasetId })

    const report = {
      datasetId,
      generatedAt: new Date().toISOString(),
      totalActions: logs.length,
      actionSummary: this.summarizeActions(logs),
      logs: logs.map((log) => ({
        timestamp: log.timestamp.toISOString(),
        action: log.action,
        actor: log.actor,
        checksum: log.checksum,
        details: log.details,
      })),
    }

    return JSON.stringify(report, null, 2)
  }

  private summarizeActions(logs: AuditLog[]): Record<string, number> {
    return logs.reduce(
      (summary, log) => {
        summary[log.action] = (summary[log.action] || 0) + 1
        return summary
      },
      {} as Record<string, number>,
    )
  }
}
