"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Upload,
  FileText,
  Settings,
  CreditCard,
  Users,
  Shield,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const userNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Document",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "My Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

const adminNavItems = [
  {
    title: "Admin Dashboard",
    href: "/dashboard/admin",
    icon: Shield,
  },
  {
    title: "User Management",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "User Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem("infiqai_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const isAdmin = user?.role === "admin"
  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <span className="text-sm font-bold">IQ</span>
            </div>
            <span className="font-semibold">INFIQAI</span>
            {isAdmin && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed && "px-2",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100",
                )}
              >
                <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                {!collapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Help Section */}
      <div className="border-t p-2">
        <Button variant="ghost" className={cn("w-full justify-start", collapsed && "px-2")}>
          <HelpCircle className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed && <span>Help & Support</span>}
        </Button>
      </div>
    </div>
  )
}
