"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  FileText,
  CreditCard,
  Pill,
  TestTube,
  Building,
  Package,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  UserCog,
  Activity,
  MessageSquare,
  FileEdit,
  Shield,
  Menu,
  X,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission?: string
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard:view",
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    permission: "patients:read",
    children: [
      { title: "All Patients", href: "/patients", icon: Users, permission: "patients:read" },
      { title: "Add Patient", href: "/patients/add", icon: Users, permission: "patients:create" },
    ],
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: UserCheck,
    permission: "doctors:read",
    children: [
      { title: "All Doctors", href: "/doctors", icon: UserCheck, permission: "doctors:read" },
      { title: "Add Doctor", href: "/doctors/add", icon: UserCheck, permission: "doctors:create" },
    ],
  },
  {
    title: "Staff",
    href: "/staff",
    icon: UserCog,
    permission: "staff:read",
    children: [
      { title: "All Staff", href: "/staff", icon: UserCog, permission: "staff:read" },
      { title: "Add Staff", href: "/staff/add", icon: UserCog, permission: "staff:create" },
    ],
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
    permission: "appointments:read",
    children: [
      { title: "All Appointments", href: "/appointments", icon: Calendar, permission: "appointments:read" },
      { title: "Schedule Appointment", href: "/appointments/add", icon: Calendar, permission: "appointments:create" },
    ],
  },
  {
    title: "Medical Records",
    href: "/medical-records",
    icon: FileText,
    permission: "medical-records:read",
    children: [
      { title: "All Records", href: "/medical-records", icon: FileText, permission: "medical-records:read" },
      { title: "Add Record", href: "/medical-records/add", icon: FileText, permission: "medical-records:create" },
    ],
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
    permission: "billing:read",
    children: [
      { title: "All Bills", href: "/billing", icon: CreditCard, permission: "billing:read" },
      { title: "Create Bill", href: "/billing/add", icon: CreditCard, permission: "billing:create" },
    ],
  },
  {
    title: "Pharmacy",
    href: "/pharmacy",
    icon: Pill,
    permission: "pharmacy:read",
    children: [
      { title: "All Medications", href: "/pharmacy", icon: Pill, permission: "pharmacy:read" },
      { title: "Add Medication", href: "/pharmacy/add", icon: Pill, permission: "pharmacy:create" },
    ],
  },
  {
    title: "Laboratory",
    href: "/laboratory",
    icon: TestTube,
    permission: "laboratory:read",
    children: [
      { title: "All Tests", href: "/laboratory", icon: TestTube, permission: "laboratory:read" },
      { title: "Add Test", href: "/laboratory/add", icon: TestTube, permission: "laboratory:create" },
    ],
  },
  {
    title: "Wards",
    href: "/wards",
    icon: Building,
    permission: "wards:read",
    children: [
      { title: "All Wards", href: "/wards", icon: Building, permission: "wards:read" },
      { title: "Add Ward", href: "/wards/add", icon: Building, permission: "wards:create" },
    ],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    permission: "inventory:read",
    children: [
      { title: "All Items", href: "/inventory", icon: Package, permission: "inventory:read" },
      { title: "Add Item", href: "/inventory/add", icon: Package, permission: "inventory:create" },
    ],
  },
  {
    title: "Content Management",
    href: "#",
    icon: FileEdit,
    permission: "blogs:read",
    children: [
      { title: "Blogs", href: "/blogs", icon: FileEdit, permission: "blogs:read" },
      { title: "Departments", href: "/departments", icon: Stethoscope, permission: "departments:read" },
      { title: "Services", href: "/services", icon: Activity, permission: "services:read" },
      { title: "Messages", href: "/messages", icon: MessageSquare, permission: "messages:read", badge: "5" },
    ],
  },
  {
    title: "User Management",
    href: "#",
    icon: Shield,
    permission: "users:read",
    children: [{ title: "Roles & Permissions", href: "/roles", icon: Shield, permission: "users:read" }],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    permission: "reports:read",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    permission: "settings:read",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { hasPermission } = useAuth()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isItemOpen = (title: string) => openItems.includes(title)

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href) && href !== "#"
  }

  const hasChildAccess = (children?: NavItem[]) => {
    if (!children) return false
    return children.some((child) => !child.permission || hasPermission(child.permission))
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasAccess = !item.permission || hasPermission(item.permission)
    const hasChildren = item.children && item.children.length > 0
    const canAccessChildren = hasChildren && hasChildAccess(item.children)

    if (!hasAccess && !canAccessChildren) {
      return null
    }

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isItemOpen(item.title)} onOpenChange={() => toggleItem(item.title)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between h-10 px-3",
                level > 0 && "ml-4 w-[calc(100%-1rem)]",
                "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center">
                <item.icon className="mr-3 h-4 w-4" />
                <span className="text-sm font-medium">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
              {isItemOpen(item.title) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Button
        key={item.title}
        variant="ghost"
        className={cn(
          "w-full justify-start h-10 px-3",
          level > 0 && "ml-4 w-[calc(100%-1rem)]",
          isActive(item.href) ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
        )}
        asChild
      >
        <Link href={item.href} onClick={() => setIsMobileOpen(false)}>
          <item.icon className="mr-3 h-4 w-4" />
          <span className="text-sm font-medium">{item.title}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
              {item.badge}
            </Badge>
          )}
        </Link>
      </Button>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 border-r bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Stethoscope className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">MediCare</span>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-1">{navigation.map((item) => renderNavItem(item))}</div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              <p>Hospital Management System</p>
              <p>Version 2.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
