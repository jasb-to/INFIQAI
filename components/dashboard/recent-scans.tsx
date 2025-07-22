import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

interface Scan {
  id: string
  fileName: string
  status: string
  createdAt: any
  piiCount: number
  complianceScore: number
}

interface RecentScansProps {
  scans: Scan[]
}

export function RecentScans({ scans }: RecentScansProps) {
  // If no scans, show empty state
  if (!scans.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>
            You haven't scanned any documents yet. Upload your first document to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <FileText className="h-12 w-12 text-muted-foreground/60" />
          <p className="mt-4 text-center text-muted-foreground">No document scans found</p>
          <Link href="/dashboard/upload" className="mt-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Upload Document</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>Your most recent document scans and their compliance status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg border p-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{scan.fileName}</h4>
                  <div className="mt-1 flex items-center gap-2">
                    {scan.status === "completed" ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="mr-1 h-3 w-3" /> Completed
                      </Badge>
                    ) : scan.status === "processing" ? (
                      <Badge variant="outline" className="text-amber-500 border-amber-500">
                        <Clock className="mr-1 h-3 w-3" /> Processing
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" /> Failed
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {scan.createdAt?.toDate ? new Date(scan.createdAt.toDate()).toLocaleDateString() : "Unknown date"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">PII:</span>
                  <Badge variant="outline" className={scan.piiCount > 0 ? "text-amber-500" : ""}>
                    {scan.piiCount || 0}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Score:</span>
                  <Badge
                    className={
                      scan.complianceScore >= 80
                        ? "bg-green-500"
                        : scan.complianceScore >= 60
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  >
                    {scan.complianceScore || 0}%
                  </Badge>
                </div>
                <Link href={`/dashboard/documents/${scan.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
