"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  TestTube,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const labTests = [
  {
    id: "LAB001",
    patientId: "P001",
    patientName: "John Doe",
    testType: "Complete Blood Count",
    category: "Hematology",
    orderedBy: "Dr. Sarah Wilson",
    orderDate: "2024-01-15",
    sampleCollected: "2024-01-15 09:30",
    expectedResult: "2024-01-16 14:00",
    status: "In Progress",
    priority: "Normal",
    cost: 45.0,
  },
  {
    id: "LAB002",
    patientId: "P002",
    patientName: "Jane Smith",
    testType: "HbA1c",
    category: "Chemistry",
    orderedBy: "Dr. Michael Brown",
    orderDate: "2024-01-14",
    sampleCollected: "2024-01-14 11:15",
    expectedResult: "2024-01-15 16:00",
    status: "Completed",
    priority: "Normal",
    cost: 65.0,
  },
  {
    id: "LAB003",
    patientId: "P003",
    patientName: "Robert Johnson",
    testType: "Cardiac Enzymes",
    category: "Cardiology",
    orderedBy: "Dr. Emily Davis",
    orderDate: "2024-01-16",
    sampleCollected: "2024-01-16 08:00",
    expectedResult: "2024-01-16 12:00",
    status: "Urgent",
    priority: "STAT",
    cost: 120.0,
  },
]

const testResults = [
  {
    id: "LAB002",
    patientName: "Jane Smith",
    testType: "HbA1c",
    result: "7.2%",
    referenceRange: "< 7.0%",
    status: "Abnormal",
    reportedBy: "Dr. Lab Tech",
    reportDate: "2024-01-15",
  },
]

export default function LaboratoryPage() {
  const [activeTab, setActiveTab] = useState("tests")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTests = labTests.filter(
    (test) =>
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "status-active"
      case "In Progress":
        return "status-pending"
      case "Urgent":
        return "status-critical"
      case "Pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      default:
        return "status-inactive"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "STAT":
        return "status-critical"
      case "Urgent":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Normal":
        return "status-active"
      default:
        return "status-inactive"
    }
  }

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "status-active"
      case "Abnormal":
        return "status-critical"
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "status-inactive"
    }
  }

  const totalTests = labTests.length
  const completedTests = labTests.filter((test) => test.status === "Completed").length
  const urgentTests = labTests.filter((test) => test.priority === "STAT" || test.status === "Urgent").length
  const totalRevenue = labTests.reduce((sum, test) => sum + test.cost, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Laboratory Management</h1>
          <p className="text-muted-foreground">Manage lab tests, samples, and results</p>
        </div>
        <Link href="/laboratory/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Order Lab Test
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTests}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTests}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((completedTests / totalTests) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Tests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentTests}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button variant={activeTab === "tests" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("tests")}>
          Lab Tests
        </Button>
        <Button
          variant={activeTab === "results" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("results")}
        >
          Results
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={activeTab === "tests" ? "Search lab tests..." : "Search results..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Content based on active tab */}
      {activeTab === "tests" ? (
        <Card>
          <CardHeader>
            <CardTitle>Laboratory Tests ({filteredTests.length})</CardTitle>
            <CardDescription>Ordered lab tests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Ordered By</TableHead>
                  <TableHead>Sample Collected</TableHead>
                  <TableHead>Expected Result</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{test.patientName}</div>
                        <div className="text-sm text-muted-foreground">{test.patientId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{test.testType}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{test.category}</Badge>
                    </TableCell>
                    <TableCell>{test.orderedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {test.sampleCollected}
                      </div>
                    </TableCell>
                    <TableCell>{test.expectedResult}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(test.priority)}>{test.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                    </TableCell>
                    <TableCell>${test.cost.toFixed(2)}</TableCell>
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Test
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Collect Sample</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Test</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Test Results ({testResults.length})</CardTitle>
            <CardDescription>Completed test results and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Reference Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Report Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.id}</TableCell>
                    <TableCell>{result.patientName}</TableCell>
                    <TableCell>{result.testType}</TableCell>
                    <TableCell className="font-medium">{result.result}</TableCell>
                    <TableCell>{result.referenceRange}</TableCell>
                    <TableCell>
                      <Badge className={getResultStatusColor(result.status)}>{result.status}</Badge>
                    </TableCell>
                    <TableCell>{result.reportedBy}</TableCell>
                    <TableCell>{result.reportDate}</TableCell>
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Full Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>Print Report</DropdownMenuItem>
                          <DropdownMenuItem>Email to Doctor</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
