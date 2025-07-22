"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileText, Home, Settings, Users, CreditCard, HelpCircle, Shield, Database } from "lucide-react"
import { cn } from "@/lib/utils"

const adminSidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Documents",
    href: "/dashboard/admin/documents",
    icon: FileText,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/admin/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart,
  },
  {
    title: "System",
    href: "/dashboard/admin/system",
    icon: Database,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full w-56 flex-col">
        <div className="flex items-center gap-2 p-4 border-b">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="font-semibold">Admin Panel</span>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm">
            {adminSidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <h5 className="font-medium">System Status</h5>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">All systems operational</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
