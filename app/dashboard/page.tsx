"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, Users, TrendingUp, Upload, Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockStats = {
  totalScans: 47,
  monthlyLimit: 50,
  piiDetected: 23,
  complianceScore: 94,
}

const mockRecentScans = [
  {
    id: "1",
    filename: "employee_records.pdf",
    scanDate: "2024-01-15",
    piiCount: 12,
    status: "completed",
    riskLevel: "high",
  },
  {
    id: "2",
    filename: "customer_data.xlsx",
    scanDate: "2024-01-14",
    piiCount: 8,
    status: "completed",
    riskLevel: "medium",
  },
  {
    id: "3",
    filename: "marketing_list.csv",
    scanDate: "2024-01-13",
    piiCount: 3,
    status: "completed",
    riskLevel: "low",
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push("/auth/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const usagePercentage = (mockStats.totalScans / mockStats.monthlyLimit) * 100

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.displayName || user.email}</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your document security and compliance status.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Scanned</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalScans}</div>
            <p className="text-xs text-muted-foreground">
              {mockStats.monthlyLimit - mockStats.totalScans} remaining this month
            </p>
            <Progress value={usagePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PII Instances Found</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.piiDetected}</div>
            <p className="text-xs text-muted-foreground">Across all scanned documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.complianceScore}%</div>
            <p className="text-xs text-green-600">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Current plan: Starter</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/dashboard/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Document
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/dashboard/documents">
                <Eye className="mr-2 h-4 w-4" />
                View All Documents
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Your current plan and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Plan</span>
                <Badge variant="secondary">Starter - £19/month</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Monthly Scans</span>
                <span className="text-sm">
                  {mockStats.totalScans} / {mockStats.monthlyLimit}
                </span>
              </div>
              <Progress value={usagePercentage} />
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/dashboard/billing">Upgrade Plan</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Document Scans</CardTitle>
          <CardDescription>Your latest document analysis results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{scan.filename}</p>
                    <p className="text-sm text-gray-600">Scanned on {scan.scanDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{scan.piiCount} PII instances</p>
                    <Badge
                      variant={
                        scan.riskLevel === "high"
                          ? "destructive"
                          : scan.riskLevel === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {scan.riskLevel} risk
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/documents/${scan.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/dashboard/documents">View All Documents</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alert */}
      {mockStats.complianceScore < 90 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Compliance Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-4">
              Your compliance score is below the recommended threshold. Consider reviewing your recent scans and
              addressing any high-risk PII findings.
            </p>
            <Button variant="outline" className="border-orange-300 text-orange-800 hover:bg-orange-100 bg-transparent">
              Review Compliance Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
