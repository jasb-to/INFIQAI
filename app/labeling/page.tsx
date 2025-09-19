"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Upload,
  Brain,
  Users,
  FileText,
  Settings,
  Download,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  BarChart3,
} from "lucide-react"
import type { Dataset, ConfidenceThresholds } from "@/types/labeling"

export default function LabelingPlatform() {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [confidenceThresholds, setConfidenceThresholds] = useState<ConfidenceThresholds>({
    autoAccept: 0.95,
    quickReview: 0.6,
    fullHuman: 0.0,
  })

  const mockDatasets: Dataset[] = [
    {
      id: "dataset_1",
      name: "Legal Contracts Q1 2024",
      description: "Contract clause classification for compliance review",
      taskType: "multi-label",
      status: "processing",
      totalItems: 1250,
      labeledItems: 890,
      autoAcceptedItems: 645,
      humanReviewItems: 245,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
      customerId: "customer_1",
      confidenceThresholds: {
        autoAccept: 0.95,
        quickReview: 0.6,
        fullHuman: 0.0,
      },
    },
    {
      id: "dataset_2",
      name: "Healthcare Records PII Detection",
      description: "Identify and redact PII in medical documents",
      taskType: "NER",
      status: "ready",
      totalItems: 2100,
      labeledItems: 2100,
      autoAcceptedItems: 1680,
      humanReviewItems: 420,
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-19"),
      customerId: "customer_2",
      confidenceThresholds: {
        autoAccept: 0.98,
        quickReview: 0.7,
        fullHuman: 0.0,
      },
    },
  ]

  useEffect(() => {
    setDatasets(mockDatasets)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "uploading":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Upload className="h-3 w-3 mr-1" />
            Uploading
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTaskTypeBadge = (taskType: string) => {
    switch (taskType) {
      case "NER":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Named Entity Recognition
          </Badge>
        )
      case "classification":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Classification
          </Badge>
        )
      case "multi-label":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Multi-Label
          </Badge>
        )
      case "contract-tagging":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            Contract Tagging
          </Badge>
        )
      default:
        return <Badge variant="outline">{taskType}</Badge>
    }
  }

  const handleStartProcessing = async (datasetId: string) => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      // Update dataset status
      setDatasets((prev) => prev.map((d) => (d.id === datasetId ? { ...d, status: "processing" as const } : d)))
    }, 2000)
  }

  const handleExport = async (datasetId: string, format: string) => {
    try {
      const response = await fetch(`/api/datasets/${datasetId}/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, userId: "user_1" }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `dataset_${datasetId}.${format}`
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">INFIQAI Labeling Platform</h1>
            <p className="text-gray-600 mt-2">Privacy-first automated data labeling with human oversight</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Privacy-First
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Brain className="h-3 w-3 mr-1" />
              Hugging Face Powered
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{datasets.length}</div>
              <p className="text-xs text-muted-foreground">Active labeling projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Processed</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {datasets.reduce((sum, d) => sum + d.labeledItems, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Across all datasets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auto-Accept Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">72%</div>
              <p className="text-xs text-muted-foreground">High confidence predictions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Human Review</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{datasets.reduce((sum, d) => sum + d.humanReviewItems, 0)}</div>
              <p className="text-xs text-muted-foreground">Items pending review</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="datasets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="review">Human Review</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="datasets" className="space-y-6">
            <div className="grid gap-6">
              {datasets.map((dataset) => (
                <Card key={dataset.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {dataset.name}
                          {getStatusBadge(dataset.status)}
                        </CardTitle>
                        <CardDescription className="mt-2">{dataset.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">{getTaskTypeBadge(dataset.taskType)}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {dataset.labeledItems}/{dataset.totalItems} items
                        </span>
                      </div>
                      <Progress value={(dataset.labeledItems / dataset.totalItems) * 100} className="h-2" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{dataset.autoAcceptedItems}</div>
                        <div className="text-gray-500">Auto-Accepted</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{dataset.humanReviewItems}</div>
                        <div className="text-gray-500">Human Review</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-600">
                          {Math.round((dataset.autoAcceptedItems / dataset.labeledItems) * 100)}%
                        </div>
                        <div className="text-gray-500">Auto Rate</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t">
                      {dataset.status === "ready" && (
                        <Button onClick={() => handleStartProcessing(dataset.id)} disabled={isProcessing} size="sm">
                          {isProcessing ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Processing
                            </>
                          )}
                        </Button>
                      )}

                      <Button variant="outline" size="sm" onClick={() => handleExport(dataset.id, "jsonl")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export JSONL
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleExport(dataset.id, "huggingface")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export HF Dataset
                      </Button>

                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Human Review Queue</CardTitle>
                <CardDescription>Items requiring human validation and correction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge className="bg-yellow-100 text-yellow-800 mb-2">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Quick Review
                        </Badge>
                        <p className="text-sm text-gray-600">Confidence: 0.73</p>
                      </div>
                      <div className="text-xs text-gray-500">2 min ago</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <p className="text-sm">
                        "John Smith works at <span className="bg-blue-100 px-1 rounded">Acme Corporation</span>
                        and can be reached at <span className="bg-green-100 px-1 rounded">john.smith@acme.com</span>
                        or <span className="bg-red-100 px-1 rounded">555-123-4567</span>."
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Model Predictions:</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">PERSON: John Smith (0.95)</Badge>
                        <Badge variant="outline">ORG: Acme Corporation (0.73)</Badge>
                        <Badge variant="outline">EMAIL: john.smith@acme.com (0.98)</Badge>
                        <Badge variant="outline">PHONE: 555-123-4567 (0.67)</Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit Labels
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Confidence Thresholds</CardTitle>
                <CardDescription>Configure when items should be auto-accepted or sent for human review</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Auto-Accept Threshold: {confidenceThresholds.autoAccept}</Label>
                    <Slider
                      value={[confidenceThresholds.autoAccept]}
                      onValueChange={([value]) => setConfidenceThresholds((prev) => ({ ...prev, autoAccept: value }))}
                      max={1}
                      min={0.5}
                      step={0.01}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Items with confidence ≥ {confidenceThresholds.autoAccept} will be automatically accepted
                    </p>
                  </div>

                  <div>
                    <Label>Quick Review Threshold: {confidenceThresholds.quickReview}</Label>
                    <Slider
                      value={[confidenceThresholds.quickReview]}
                      onValueChange={([value]) => setConfidenceThresholds((prev) => ({ ...prev, quickReview: value }))}
                      max={0.95}
                      min={0.3}
                      step={0.01}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Items with confidence ≥ {confidenceThresholds.quickReview} will get quick review
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Model Configuration</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="model">Hugging Face Model</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bert-base-ner">BERT Base NER</SelectItem>
                          <SelectItem value="distilbert-classification">DistilBERT Classification</SelectItem>
                          <SelectItem value="roberta-large-ner">RoBERTa Large NER</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="privacy">Privacy Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select privacy mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private Inference</SelectItem>
                          <SelectItem value="on-premise">On-Premise</SelectItem>
                          <SelectItem value="public">Public (with consent)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Model Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Accuracy</span>
                      <span className="font-semibold">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>F1 Score</span>
                      <span className="font-semibold">0.91</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precision</span>
                      <span className="font-semibold">0.93</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recall</span>
                      <span className="font-semibold">0.89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Human Review Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Correction Rate</span>
                      <span className="font-semibold text-green-600">2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Review Time</span>
                      <span className="font-semibold">18s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inter-Annotator Agreement</span>
                      <span className="font-semibold">0.87</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality Score</span>
                      <span className="font-semibold text-green-600">96%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
