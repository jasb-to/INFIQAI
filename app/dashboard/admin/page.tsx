"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Shield,
  DollarSign,
  Search,
  Download,
  AlertTriangle,
  Eye,
  Ban,
  Mail,
  Calendar,
  Activity,
} from "lucide-react"

// Mock data for admin dashboard
const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    plan: "Pro",
    status: "Active",
    scansUsed: 45,
    scansLimit: 100,
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@startup.io",
    plan: "Enterprise",
    status: "Active",
    scansUsed: 180,
    scansLimit: 500,
    joinDate: "2023-12-01",
    lastActive: "2024-01-19",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@tech.com",
    plan: "Basic",
    status: "Suspended",
    scansUsed: 10,
    scansLimit: 25,
    joinDate: "2024-01-10",
    lastActive: "2024-01-18",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@consulting.com",
    plan: "Pro",
    status: "Active",
    scansUsed: 78,
    scansLimit: 100,
    joinDate: "2023-11-20",
    lastActive: "2024-01-20",
  },
]

const mockScans = [
  {
    id: "scan_1",
    documentName: "Financial Report Q4 2023.pdf",
    user: "john.smith@company.com",
    scanDate: "2024-01-20",
    piiFound: 12,
    complianceScore: 85,
    status: "Completed",
    riskLevel: "Medium",
  },
  {
    id: "scan_2",
    documentName: "Employee Handbook.docx",
    user: "sarah.j@startup.io",
    scanDate: "2024-01-19",
    piiFound: 3,
    complianceScore: 95,
    status: "Completed",
    riskLevel: "Low",
  },
  {
    id: "scan_3",
    documentName: "Client Database Export.xlsx",
    user: "emily@consulting.com",
    scanDate: "2024-01-19",
    piiFound: 45,
    complianceScore: 60,
    status: "Completed",
    riskLevel: "High",
  },
  {
    id: "scan_4",
    documentName: "Marketing Campaign Data.csv",
    user: "mike.chen@tech.com",
    scanDate: "2024-01-18",
    piiFound: 8,
    complianceScore: 78,
    status: "Processing",
    riskLevel: "Medium",
  },
]

const mockSubscriptions = [
  {
    id: "sub_1",
    user: "john.smith@company.com",
    plan: "Pro",
    status: "Active",
    amount: "$29/month",
    nextBilling: "2024-02-15",
    paymentMethod: "•••• 4242",
  },
  {
    id: "sub_2",
    user: "sarah.j@startup.io",
    plan: "Enterprise",
    status: "Active",
    amount: "$99/month",
    nextBilling: "2024-02-01",
    paymentMethod: "•••• 5555",
  },
  {
    id: "sub_3",
    user: "emily@consulting.com",
    plan: "Pro",
    status: "Active",
    amount: "$29/month",
    nextBilling: "2024-02-20",
    paymentMethod: "•••• 1234",
  },
  {
    id: "sub_4",
    user: "mike.chen@tech.com",
    plan: "Basic",
    status: "Cancelled",
    amount: "$9/month",
    nextBilling: "N/A",
    paymentMethod: "•••• 9876",
  },
]

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("users")
  const router = useRouter()

  useEffect(() => {
    const checkAdminAuth = () => {
      try {
        const storedUser = localStorage.getItem("infiqai_user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          if (userData.role !== "admin") {
            // Not an admin, redirect to regular dashboard
            router.push("/dashboard")
            return
          }
          setUser(userData)
        } else {
          // No user found, redirect to login
          router.push("/auth/login")
          return
        }
      } catch (error) {
        console.error("Admin auth check error:", error)
        router.push("/auth/login")
        return
      }
      setLoading(false)
    }

    checkAdminAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.plan.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredScans = mockScans.filter(
    (scan) =>
      scan.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSubscriptions = mockSubscriptions.filter(
    (sub) =>
      sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return <Badge variant="destructive">High Risk</Badge>
      case "Medium":
        return <Badge variant="secondary">Medium Risk</Badge>
      case "Low":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Low Risk
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Active
          </Badge>
        )
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "Cancelled":
        return <Badge variant="secondary">Cancelled</Badge>
      case "Completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Completed
          </Badge>
        )
      case "Processing":
        return <Badge variant="secondary">Processing</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor scans, and oversee platform operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Document Scans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,456</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PII Instances</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, documents, or subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="scans">Document Scans</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts, monitor usage, and handle subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.plan}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {user.scansUsed}/{user.scansLimit} scans
                          </div>
                          <Progress value={(user.scansUsed / user.scansLimit) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{user.joinDate}</TableCell>
                      <TableCell className="text-sm">{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document Scans Tab */}
        <TabsContent value="scans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Scan Monitoring</CardTitle>
              <CardDescription>Track document scans, PII detection, and compliance scores</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Scan Date</TableHead>
                    <TableHead>PII Found</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell>
                        <div className="font-medium">{scan.documentName}</div>
                      </TableCell>
                      <TableCell className="text-sm">{scan.user}</TableCell>
                      <TableCell className="text-sm">{scan.scanDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span className="font-medium">{scan.piiFound}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{scan.complianceScore}%</div>
                          <Progress value={scan.complianceScore} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(scan.status)}</TableCell>
                      <TableCell>{getRiskBadge(scan.riskLevel)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Monitor billing, plan changes, and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="text-sm">{sub.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{sub.plan}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(sub.status)}</TableCell>
                      <TableCell className="font-medium">{sub.amount}</TableCell>
                      <TableCell className="text-sm">{sub.nextBilling}</TableCell>
                      <TableCell className="text-sm">{sub.paymentMethod}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New user registration</p>
                <p className="text-xs text-muted-foreground">alice.cooper@newcompany.com joined with Pro plan</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">High-risk document detected</p>
                <p className="text-xs text-muted-foreground">
                  Document "Customer_Data_Export.xlsx" contains 67 PII instances
                </p>
                <p className="text-xs text-muted-foreground">12 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-muted-foreground">Enterprise subscription renewal - $99.00</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
