"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  MoreHorizontal,
  Upload,
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

const mockDocuments = [
  {
    id: "doc_001",
    name: "Employee_Records_2024.pdf",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    piiCount: 47,
    riskLevel: "High",
    status: "Processed",
    compliance: "GDPR Compliant",
    uploadedBy: "John Smith",
  },
  {
    id: "doc_002",
    name: "Customer_Database_Export.csv",
    uploadDate: "2024-01-14",
    size: "8.7 MB",
    piiCount: 234,
    riskLevel: "Critical",
    status: "Processed",
    compliance: "Action Required",
    uploadedBy: "Sarah Johnson",
  },
  {
    id: "doc_003",
    name: "Marketing_Contacts.xlsx",
    uploadDate: "2024-01-13",
    size: "1.2 MB",
    piiCount: 89,
    riskLevel: "Medium",
    status: "Processing",
    compliance: "Under Review",
    uploadedBy: "Mike Chen",
  },
  {
    id: "doc_004",
    name: "Financial_Report_Q4.docx",
    uploadDate: "2024-01-12",
    size: "954 KB",
    piiCount: 12,
    riskLevel: "Low",
    status: "Processed",
    compliance: "Compliant",
    uploadedBy: "Emma Wilson",
  },
  {
    id: "doc_005",
    name: "HR_Interview_Notes.pdf",
    uploadDate: "2024-01-11",
    size: "3.1 MB",
    piiCount: 156,
    riskLevel: "High",
    status: "Processed",
    compliance: "CCPA Compliant",
    uploadedBy: "David Brown",
  },
  {
    id: "doc_006",
    name: "Support_Tickets_Archive.json",
    uploadDate: "2024-01-10",
    size: "5.8 MB",
    piiCount: 78,
    riskLevel: "Medium",
    status: "Failed",
    compliance: "Error",
    uploadedBy: "Lisa Garcia",
  },
]

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "Critical":
      return <Badge variant="destructive">Critical</Badge>
    case "High":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">High</Badge>
    case "Medium":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge>
    case "Low":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Low</Badge>
    default:
      return <Badge variant="outline">{risk}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Processed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Processed
        </Badge>
      )
    case "Processing":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Processing
        </Badge>
      )
    case "Failed":
      return (
        <Badge variant="destructive">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Failed
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getComplianceBadge = (compliance: string) => {
  switch (compliance) {
    case "GDPR Compliant":
    case "CCPA Compliant":
    case "Compliant":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <Shield className="h-3 w-3 mr-1" />
          {compliance}
        </Badge>
      )
    case "Action Required":
      return (
        <Badge variant="destructive">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Action Required
        </Badge>
      )
    case "Under Review":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      )
    case "Error":
      return <Badge variant="destructive">Error</Badge>
    default:
      return <Badge variant="outline">{compliance}</Badge>
  }
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments)

  useEffect(() => {
    const filtered = mockDocuments.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.riskLevel.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredDocuments(filtered)
  }, [searchQuery])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                <p className="text-gray-500 mt-2">Manage and monitor your uploaded documents</p>
              </div>
              <Link href="/dashboard/upload">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockDocuments.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">PII Instances</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">616</div>
                  <p className="text-xs text-muted-foreground">Across all documents</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Processing</CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <p className="text-xs text-muted-foreground">Currently analyzing</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Documents Table */}
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>All your uploaded documents with PII analysis and compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>PII Count</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">{document.name}</div>
                              <div className="text-sm text-gray-500">{document.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{document.piiCount}</span>
                            {document.piiCount > 100 && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                          </div>
                        </TableCell>
                        <TableCell>{getRiskBadge(document.riskLevel)}</TableCell>
                        <TableCell>{getStatusBadge(document.status)}</TableCell>
                        <TableCell>{getComplianceBadge(document.compliance)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback className="text-xs">
                                {document.uploadedBy
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{document.uploadedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download Report
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
