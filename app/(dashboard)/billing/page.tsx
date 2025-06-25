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
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, CreditCard, Download, DollarSign } from "lucide-react"

const billingRecords = [
  {
    id: "INV001",
    patientId: "P001",
    patientName: "John Doe",
    date: "2024-01-15",
    services: "Consultation, Lab Tests",
    amount: 350.0,
    insurance: 280.0,
    patientDue: 70.0,
    status: "Paid",
    paymentMethod: "Credit Card",
    dueDate: "2024-01-30",
  },
  {
    id: "INV002",
    patientId: "P002",
    patientName: "Jane Smith",
    date: "2024-01-14",
    services: "Follow-up, Medication",
    amount: 220.0,
    insurance: 180.0,
    patientDue: 40.0,
    status: "Pending",
    paymentMethod: "",
    dueDate: "2024-01-29",
  },
  {
    id: "INV003",
    patientId: "P003",
    patientName: "Robert Johnson",
    date: "2024-01-16",
    services: "Surgery, ICU Stay",
    amount: 15000.0,
    insurance: 12000.0,
    patientDue: 3000.0,
    status: "Partial",
    paymentMethod: "Insurance",
    dueDate: "2024-02-15",
  },
]

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBilling = billingRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.services.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "status-active"
      case "Pending":
        return "status-pending"
      case "Partial":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Overdue":
        return "status-critical"
      default:
        return "status-inactive"
    }
  }

  const totalRevenue = billingRecords.reduce((sum, record) => sum + record.amount, 0)
  const totalPending = billingRecords
    .filter((r) => r.status === "Pending")
    .reduce((sum, record) => sum + record.patientDue, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Billing & Payments</h1>
          <p className="text-muted-foreground">Manage patient billing and payment records</p>
        </div>
        <Link href="/billing/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">2 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search invoices by patient, ID, or services..."
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

      {/* Billing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Records ({filteredBilling.length})</CardTitle>
          <CardDescription>Patient invoices and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Patient Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBilling.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.patientName}</div>
                      <div className="text-sm text-muted-foreground">{record.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.services}</TableCell>
                  <TableCell>${record.amount.toFixed(2)}</TableCell>
                  <TableCell>${record.insurance.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${record.patientDue.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>{record.dueDate}</TableCell>
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
                          View Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Record Payment</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
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
  )
}
