"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, AlertCircle, CheckCircle, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface DocumentData {
  id: string
  fileName: string
  fileUrl: string
  fileType: string
  fileSize: number
  createdAt: any
  status: string
  piiCount: number
  complianceScore: number
  issues: string[]
  recommendations: string[]
}

export default function DocumentPage() {
  const { id } = useParams()
  const [document, setDocument] = useState<DocumentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        if (!id || typeof id !== "string") {
          throw new Error("Invalid document ID")
        }

        const docRef = doc(db, "scans", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setDocument({
            id: docSnap.id,
            ...docSnap.data(),
          } as DocumentData)
        } else {
          setError("Document not found")
        }
      } catch (error) {
        console.error("Error fetching document:", error)
        setError("Error fetching document details")
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [id])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-bold">{error || "Document not found"}</h2>
        <p className="mt-2 text-muted-foreground">
          The document you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Link href="/dashboard/documents">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </Button>
        </Link>
      </div>
    )
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown date"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/documents">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">{document.fileName}</h2>
          {document.status === "completed" ? (
            <Badge className="bg-green-500">
              <CheckCircle className="mr-1 h-3 w-3" /> Completed
            </Badge>
          ) : document.status === "processing" ? (
            <Badge variant="outline" className="text-amber-500 border-amber-500">
              <Info className="mr-1 h-3 w-3" /> Processing
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertCircle className="mr-1 h-3 w-3" /> Failed
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              View Original
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={document.fileUrl} download={document.fileName}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold ${
                  document.complianceScore >= 80
                    ? "bg-green-100 text-green-700"
                    : document.complianceScore >= 60
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {document.complianceScore}%
              </div>
              <p className="text-sm text-muted-foreground">
                {document.complianceScore >= 80
                  ? "Good compliance score"
                  : document.complianceScore >= 60
                    ? "Moderate compliance issues"
                    : "Significant compliance issues"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">PII Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold ${
                  document.piiCount === 0
                    ? "bg-green-100 text-green-700"
                    : document.piiCount <= 3
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {document.piiCount}
              </div>
              <p className="text-sm text-muted-foreground">
                {document.piiCount === 0
                  ? "No PII detected"
                  : document.piiCount === 1
                    ? "1 instance of PII detected"
                    : `${document.piiCount} instances of PII detected`}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Document Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">File Type:</span>
                <span className="text-sm font-medium">{document.fileType.split("/")[1].toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Size:</span>
                <span className="text-sm font-medium">{formatFileSize(document.fileSize)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Uploaded:</span>
                <span className="text-sm font-medium">{formatDate(document.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className="text-sm font-medium capitalize">{document.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="pii">PII Detection</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Document Analysis Summary</CardTitle>
              <CardDescription>Overview of the compliance analysis for {document.fileName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Compliance Overview</h4>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">GDPR Compliance</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">HIPAA Compliance</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">PCI DSS Compliance</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Key Findings</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {document.issues.map((issue, index) => (
                    <li key={index} className="text-sm">
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pii">
          <Card>
            <CardHeader>
              <CardTitle>PII Detection Results</CardTitle>
              <CardDescription>Personal Identifiable Information found in the document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {document.piiCount === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <p className="mt-4 text-center font-medium">No PII detected in this document</p>
                  <p className="text-center text-sm text-muted-foreground">
                    This document does not contain any personally identifiable information.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">PII Summary</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {document.piiCount} instances of personally identifiable information were detected.
                    </p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-md bg-amber-50 p-3">
                        <div className="font-medium text-amber-800">Email Addresses</div>
                        <div className="mt-1 text-sm text-amber-700">2 instances detected</div>
                      </div>
                      <div className="rounded-md bg-amber-50 p-3">
                        <div className="font-medium text-amber-800">Phone Numbers</div>
                        <div className="mt-1 text-sm text-amber-700">1 instance detected</div>
                      </div>
                      <div className="rounded-md bg-amber-50 p-3">
                        <div className="font-medium text-amber-800">Names</div>
                        <div className="mt-1 text-sm text-amber-700">3 instances detected</div>
                      </div>
                      <div className="rounded-md bg-amber-50 p-3">
                        <div className="font-medium text-amber-800">Addresses</div>
                        <div className="mt-1 text-sm text-amber-700">1 instance detected</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Recommended Actions</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li className="text-sm">Review and redact email addresses in section 2</li>
                      <li className="text-sm">Remove phone number from header</li>
                      <li className="text-sm">Consider anonymizing names in the appendix</li>
                      <li className="text-sm">Redact physical address in footer</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Analysis</CardTitle>
              <CardDescription>Detailed compliance assessment for regulatory requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">GDPR Compliance</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Data processing purposes clearly defined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Data minimization principles applied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Missing data retention policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Data subject rights addressed</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">HIPAA Compliance</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">PHI properly safeguarded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Authorization requirements met</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Minimum necessary standard applied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Security measures documented</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">PCI DSS Compliance</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">No credit card data stored</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Payment processing references need review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Vendor compliance requirements addressed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Actionable steps to improve document compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {document.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{recommendation}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Implementing this change will help improve your compliance score and reduce risk.
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-sm font-bold text-blue-600">{document.recommendations.length + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">Schedule a compliance review</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Consider scheduling a comprehensive compliance review with our experts to address all identified
                      issues.
                    </p>
                    <Button className="mt-3 bg-blue-600 hover:bg-blue-700">Schedule Review</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
