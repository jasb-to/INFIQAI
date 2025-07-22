"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { auth, db, storage } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUp, File, X, AlertCircle } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      if (!validTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.")
        return
      }

      // Check file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File is too large. Maximum size is 10MB.")
        return
      }

      setFile(selectedFile)
      setError("")
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      // Check file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      if (!validTypes.includes(droppedFile.type)) {
        setError("Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.")
        return
      }

      // Check file size (10MB max)
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError("File is too large. Maximum size is 10MB.")
        return
      }

      setFile(droppedFile)
      setError("")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    if (!file) return

    const user = auth.currentUser
    if (!user) {
      setError("You must be logged in to upload documents.")
      return
    }

    try {
      setUploading(true)
      setError("")

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `documents/${user.uid}/${Date.now()}_${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => {
          console.error("Upload error:", error)
          setError("Error uploading file. Please try again.")
          setUploading(false)
        },
        async () => {
          // Upload completed successfully
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          // Start document analysis
          setAnalyzing(true)

          try {
            // In a real app, we would extract text from the document here
            // For this demo, we'll simulate the analysis
            // const analysisResult = await analyzeDocument(extractedText);

            // Simulate analysis result
            const analysisResult = {
              piiCount: Math.floor(Math.random() * 10),
              complianceScore: Math.floor(Math.random() * 30) + 70, // 70-100
              issues: ["Potential PII in section 3", "Missing compliance statement"],
              recommendations: ["Review section 3 for personal information", "Add required compliance statement"],
            }

            // Create document record in Firestore
            const docRef = await addDoc(collection(db, "scans"), {
              userId: user.uid,
              fileName: file.name,
              fileUrl: downloadURL,
              fileType: file.type,
              fileSize: file.size,
              createdAt: serverTimestamp(),
              status: "completed",
              piiCount: analysisResult.piiCount,
              complianceScore: analysisResult.complianceScore,
              issues: analysisResult.issues,
              recommendations: analysisResult.recommendations,
            })

            // Redirect to document details page
            router.push(`/dashboard/documents/${docRef.id}`)
          } catch (error) {
            console.error("Analysis error:", error)
            setError("Error analyzing document. Please try again.")
            setAnalyzing(false)
            setUploading(false)
          }
        },
      )
    } catch (error) {
      console.error("Upload error:", error)
      setError("Error uploading file. Please try again.")
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Upload Document</h2>

      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>Upload a document for AI-powered compliance analysis and PII detection.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!file && !uploading && (
            <div
              className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-accent/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <FileUp className="h-10 w-10 text-muted-foreground" />
                <h3 className="font-medium text-lg">Drag and drop your file here</h3>
                <p className="text-sm text-muted-foreground">or click to browse (PDF, DOC, DOCX, TXT up to 10MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}

          {file && !uploading && (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 border rounded-md">
                  <File className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          )}

          {uploading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{analyzing ? "Analyzing document..." : "Uploading document..."}</p>
                  <p className="text-xs text-muted-foreground">
                    {analyzing
                      ? "AI is scanning for compliance issues and PII"
                      : `${Math.round(uploadProgress)}% complete`}
                  </p>
                </div>
                {!analyzing && <p className="text-sm font-medium">{Math.round(uploadProgress)}%</p>}
              </div>
              <Progress value={analyzing ? 100 : uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {file && !uploading && (
            <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700">
              Upload & Analyze
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium">What happens after upload?</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <span className="text-sm font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-medium">Secure Upload</h4>
            <p className="text-sm text-muted-foreground">
              Your document is securely uploaded and encrypted in transit and at rest.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <span className="text-sm font-bold text-blue-600">2</span>
            </div>
            <h4 className="font-medium">AI Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Our AI scans for compliance issues, PII, and sensitive information.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <span className="text-sm font-bold text-blue-600">3</span>
            </div>
            <h4 className="font-medium">Results & Recommendations</h4>
            <p className="text-sm text-muted-foreground">
              Get detailed reports with actionable insights and compliance recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
