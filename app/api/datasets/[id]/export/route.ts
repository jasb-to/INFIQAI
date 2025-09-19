import { type NextRequest, NextResponse } from "next/server"
import { AuditLogger } from "@/lib/audit-logger"

const auditLogger = new AuditLogger()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { format, userId } = await request.json()
    const datasetId = params.id

    await auditLogger.log("EXPORT_STARTED", userId, { datasetId, format }, datasetId)

    // Mock export data - in production, fetch from database
    const exportData = {
      dataset_id: datasetId,
      exported_at: new Date().toISOString(),
      format,
      items: [
        {
          id: "item_1",
          content: "John Smith works at Acme Corp and can be reached at john@acme.com",
          labels: ["PERSON", "ORG", "EMAIL"],
          entities: [
            { text: "John Smith", label: "PERSON", start: 0, end: 10 },
            { text: "Acme Corp", label: "ORG", start: 20, end: 29 },
            { text: "john@acme.com", label: "EMAIL", start: 58, end: 71 },
          ],
          confidence: 0.96,
          human_reviewed: false,
        },
      ],
    }

    let responseData: any
    let contentType: string

    switch (format) {
      case "jsonl":
        responseData = exportData.items.map((item) => JSON.stringify(item)).join("\n")
        contentType = "application/jsonl"
        break
      case "csv":
        const csvHeader = "id,content,labels,confidence,human_reviewed\n"
        const csvRows = exportData.items
          .map(
            (item) =>
              `"${item.id}","${item.content}","${item.labels.join(";")}",${item.confidence},${item.human_reviewed}`,
          )
          .join("\n")
        responseData = csvHeader + csvRows
        contentType = "text/csv"
        break
      case "huggingface":
        responseData = {
          dataset_info: {
            dataset_name: `dataset_${datasetId}`,
            features: {
              text: { dtype: "string" },
              labels: { dtype: "sequence", feature: { dtype: "string" } },
              entities: {
                dtype: "sequence",
                feature: {
                  text: { dtype: "string" },
                  label: { dtype: "string" },
                  start: { dtype: "int32" },
                  end: { dtype: "int32" },
                },
              },
            },
          },
          data: exportData.items,
        }
        contentType = "application/json"
        break
      default:
        responseData = exportData
        contentType = "application/json"
    }

    await auditLogger.log(
      "EXPORT_COMPLETED",
      userId,
      { datasetId, format, itemCount: exportData.items.length },
      datasetId,
    )

    return new NextResponse(typeof responseData === "string" ? responseData : JSON.stringify(responseData, null, 2), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="dataset_${datasetId}.${format === "jsonl" ? "jsonl" : format === "csv" ? "csv" : "json"}"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}
