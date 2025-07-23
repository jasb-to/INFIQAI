"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Users,
  FileText,
  Shield,
  DollarSign,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Mail,
  UserMinus,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
} from "lucide-react"

// Mock data for admin dashboard
const mockUsers = [
  {
    id: "user_001",
    name: "John Smith",
    email: "john@company.com",
    plan: "Pro",
    status: "Active",
    scansUsed: 45,
    scansLimit: 100,
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
  },
  {
    id: "user_002",
    name: "Sarah Johnson",
    email: "sarah@startup.io",
    plan: "Enterprise",
    status: "Active",
    scansUsed: 234,
    scansLimit: 500,
    joinDate: "2024-01-10",
    lastActive: "2024-01-20",
  },
  {
    id: "user_003",
    name: "Mike Chen",
    email: "mike@techcorp.com",
    plan: "Free",
    status: "Active",
    scansUsed: 8,
    scansLimit: 10,
    joinDate: "2024-01-18",
    lastActive: "2024-01-19",
  },
  {
    id: "user_004",
    name: "Emma Wilson",
    email: "emma@consulting.com",
    plan: "Pro",
    status: "Suspended",
    scansUsed: 67,
    scansLimit: 100,
    joinDate: "2024-01-05",
    lastActive: "2024-01-18",
  },
]

const mockScans = [
  {
    id: "scan_001",
    document: "Employee_Records_2024.pdf",
    user: "John Smith",
    piiCount: 47,
    riskLevel: "High",
    complianceScore: 85,
    scanDate: "2024-01-20",
    status: "Complete",
  },
  {
    id: "scan_002",
    document: "Customer_Database_Export.csv",
    user: "Sarah Johnson",
    piiCount: 234,
    riskLevel: "Critical",
    complianceScore: 45,
    scanDate: "2024-01-20",
    status: "Complete",
  },
  {
    id: "scan_003",
    document: "Marketing_Contacts.xlsx",
    user: "Mike Chen",
    piiCount: 89,
    riskLevel: "Medium",
    complianceScore: 72,
    scanDate: "2024-01-19",
    status: "Processing",
  },
]

const mockSubscriptions = [
  {
    id: "sub_001",
    user: "John Smith",
    plan: "Pro",
    amount: 29,
    status: "Active",
    nextBilling: "2024-02-15",
    paymentMethod: "•••• 4242",
  },
  {
    id: "sub_002",
    user: "Sarah Johnson",
    plan: "Enterprise",
    amount: 99,
    status: "Active",
    nextBilling: "2024-02-10",
    paymentMethod: "•••• 5555",
  },
  {
    id: "sub_003",
    user: "Emma Wilson",
    plan: "Pro",
    amount: 29,
    status: "Past Due",
    nextBilling: "2024-01-18",
    paymentMethod: "•••• 1234",
  },
]

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("infiqai_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)

      // Redirect non-admin users to regular dashboard
      if (userData.role !== "admin") {
        router.push("/dashboard")
        return
      }
    } else {
      router.push("/auth/login")
    }
  }, [router])

  if (!user || user.role !== "admin") {
    return <div>Loading...</div>
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
      case "Pro":
        return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>
      case "Free":
        return <Badge variant="outline">Free</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "Suspended":
        return (
          <Badge variant="destructive">
            <UserMinus className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        )
      case "Past Due":
        return (
          <Badge className="bg-orange-100 text-orange-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Past Due
          </Badge>
        )
      case "Processing":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "Complete":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Complete
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Critical":
        return <Badge variant="destructive">Critical</Badge>
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500 mt-2">Monitor and manage your INFIQAI platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUsers.length}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Document Scans</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">PII Instances</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,947</div>
                  <p className="text-xs text-muted-foreground">Detected this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="users" className="space-y-6">
              <TabsList>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="scans">Document Scans</TabsTrigger>
                <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all registered users and their subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Usage</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getPlanBadge(user.plan)}</TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span>
                                    {user.scansUsed}/{user.scansLimit} scans
                                  </span>
                                </div>
                                <Progress value={(user.scansUsed / user.scansLimit) * 100} className="h-2" />
                              </div>
                            </TableCell>
                            <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
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
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <UserMinus className="h-4 w-4 mr-2" />
                                    Suspend User
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
              </TabsContent>

              <TabsContent value="scans" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Scans</CardTitle>
                    <CardDescription>Monitor all document scans and PII detection results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>PII Count</TableHead>
                          <TableHead>Risk Level</TableHead>
                          <TableHead>Compliance Score</TableHead>
                          <TableHead>Scan Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockScans.map((scan) => (
                          <TableRow key={scan.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">{scan.document}</span>
                              </div>
                            </TableCell>
                            <TableCell>{scan.user}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{scan.piiCount}</span>
                                {scan.piiCount > 100 && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                              </div>
                            </TableCell>
                            <TableCell>{getRiskBadge(scan.riskLevel)}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span>{scan.complianceScore}%</span>
                                </div>
                                <Progress value={scan.complianceScore} className="h-2" />
                              </div>
                            </TableCell>
                            <TableCell>{new Date(scan.scanDate).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(scan.status)}</TableCell>
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
                                    View Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
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
              </TabsContent>

              <TabsContent value="subscriptions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscriptions</CardTitle>
                    <CardDescription>Monitor billing and subscription status for all users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Next Billing</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockSubscriptions.map((subscription) => (
                          <TableRow key={subscription.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback className="text-xs">
                                    {subscription.user
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{subscription.user}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                            <TableCell>${subscription.amount}/month</TableCell>
                            <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                            <TableCell>{new Date(subscription.nextBilling).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <CreditCard className="h-4 w-4 text-gray-400" />
                                <span>{subscription.paymentMethod}</span>
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
                                    Download Invoice
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
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
