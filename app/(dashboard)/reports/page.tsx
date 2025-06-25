"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart3, Download, FileText, CalendarIcon, TrendingUp, Users, DollarSign, Activity } from "lucide-react"
import { format } from "date-fns"

const reportTypes = [
  {
    id: "patient-summary",
    name: "Patient Summary Report",
    description: "Overview of patient demographics and statistics",
    category: "Patient Management",
    lastGenerated: "2024-01-15",
  },
  {
    id: "financial-summary",
    name: "Financial Summary Report",
    description: "Revenue, billing, and payment analysis",
    category: "Financial",
    lastGenerated: "2024-01-14",
  },
  {
    id: "appointment-analytics",
    name: "Appointment Analytics",
    description: "Appointment trends and doctor utilization",
    category: "Operations",
    lastGenerated: "2024-01-16",
  },
  {
    id: "inventory-report",
    name: "Pharmacy Inventory Report",
    description: "Stock levels and medication usage",
    category: "Pharmacy",
    lastGenerated: "2024-01-13",
  },
  {
    id: "lab-statistics",
    name: "Laboratory Statistics",
    description: "Test volumes and turnaround times",
    category: "Laboratory",
    lastGenerated: "2024-01-15",
  },
  {
    id: "ward-occupancy",
    name: "Ward Occupancy Report",
    description: "Bed utilization and occupancy rates",
    category: "Ward Management",
    lastGenerated: "2024-01-16",
  },
]

const quickStats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Monthly Revenue",
    value: "$485,230",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Appointments",
    value: "1,234",
    change: "+15%",
    trend: "up",
    icon: Activity,
    color: "text-purple-600",
  },
  {
    title: "Bed Occupancy",
    value: "87%",
    change: "+3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["all", ...Array.from(new Set(reportTypes.map((report) => report.category)))]

  const filteredReports = reportTypes.filter((report) => {
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`)
    // In a real app, this would trigger report generation
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and view hospital performance reports</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange ? format(dateRange, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
      </Card>

      {/* Reports Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <Badge variant="outline">{report.category}</Badge>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">Last generated: {report.lastGenerated}</div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1" onClick={() => handleGenerateReport(report.id)}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Recently generated reports and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportTypes.slice(0, 3).map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">Generated on {report.lastGenerated}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
