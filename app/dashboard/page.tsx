"use client"

import { useEffect, useState } from "react"
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Clock, Upload } from "lucide-react"
import Link from "next/link"
import { RecentScans } from "@/components/dashboard/recent-scans"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

interface Scan {
  id: string
  fileName: string
  status: string
  createdAt: any
  piiCount: number
  complianceScore: number
}

export default function DashboardPage() {
  const [recentScans, setRecentScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalScans: 0,
    piiDetected: 0,
    complianceScore: 0,
    scansRemaining: 0,
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = auth.currentUser
        if (!user) return

        // Fetch recent scans
        const scansQuery = query(
          collection(db, "scans"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(5),
        )

        const scansSnapshot = await getDocs(scansQuery)
        const scansData = scansSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Scan[]

        setRecentScans(scansData)

        // Calculate stats
        const totalScans = scansData.length
        const piiDetected = scansData.reduce((sum, scan) => sum + (scan.piiCount || 0), 0)
        const avgComplianceScore =
          totalScans > 0 ? scansData.reduce((sum, scan) => sum + (scan.complianceScore || 0), 0) / totalScans : 0

        setStats({
          totalScans,
          piiDetected,
          complianceScore: Math.round(avgComplianceScore),
          scansRemaining: 100 - totalScans, // Example calculation
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your document compliance.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>

      <DashboardStats stats={stats} />

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Scans</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <RecentScans scans={recentScans} />
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Important notifications about your documents and compliance status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium">PII Detected in Financial Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Multiple instances of personal information were found in your recent upload.
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Compliance Review Due</h4>
                    <p className="text-sm text-muted-foreground">Your quarterly compliance review is due in 7 days.</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Schedule Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Your current compliance status across different regulations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>GDPR</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>HIPAA</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>PCI DSS</span>
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    </div>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>CCPA</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
