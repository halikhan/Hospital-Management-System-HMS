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
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Package, AlertTriangle, TrendingUp } from "lucide-react"

const medications = [
  {
    id: "MED001",
    name: "Lisinopril",
    category: "ACE Inhibitor",
    manufacturer: "Pfizer",
    batchNumber: "LIS2024001",
    expiryDate: "2025-06-15",
    quantity: 500,
    minStock: 100,
    unitPrice: 0.85,
    location: "A-1-05",
    status: "In Stock",
  },
  {
    id: "MED002",
    name: "Metformin",
    category: "Antidiabetic",
    manufacturer: "Teva",
    batchNumber: "MET2024002",
    expiryDate: "2025-03-20",
    quantity: 25,
    minStock: 50,
    unitPrice: 0.45,
    location: "B-2-12",
    status: "Low Stock",
  },
  {
    id: "MED003",
    name: "Amoxicillin",
    category: "Antibiotic",
    manufacturer: "GSK",
    batchNumber: "AMX2024003",
    expiryDate: "2024-12-10",
    quantity: 0,
    minStock: 75,
    unitPrice: 1.2,
    location: "C-1-08",
    status: "Out of Stock",
  },
]

const prescriptions = [
  {
    id: "RX001",
    patientName: "John Doe",
    patientId: "P001",
    doctor: "Dr. Sarah Wilson",
    medication: "Lisinopril 10mg",
    quantity: 30,
    dosage: "Once daily",
    date: "2024-01-15",
    status: "Dispensed",
  },
  {
    id: "RX002",
    patientName: "Jane Smith",
    patientId: "P002",
    doctor: "Dr. Michael Brown",
    medication: "Metformin 500mg",
    quantity: 60,
    dosage: "Twice daily",
    date: "2024-01-16",
    status: "Pending",
  },
]

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPrescriptions = prescriptions.filter(
    (rx) =>
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "status-active"
      case "Low Stock":
        return "status-pending"
      case "Out of Stock":
        return "status-critical"
      default:
        return "status-inactive"
    }
  }

  const getPrescriptionStatusColor = (status: string) => {
    switch (status) {
      case "Dispensed":
        return "status-active"
      case "Pending":
        return "status-pending"
      case "Cancelled":
        return "status-critical"
      default:
        return "status-inactive"
    }
  }

  const lowStockCount = medications.filter((med) => med.quantity <= med.minStock).length
  const totalValue = medications.reduce((sum, med) => sum + med.quantity * med.unitPrice, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Pharmacy Management</h1>
          <p className="text-muted-foreground">Manage medication inventory and prescriptions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Stock Report
          </Button>
          <Link href="/pharmacy/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Medications</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medications.length}</div>
            <p className="text-xs text-muted-foreground">Active inventory items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total stock value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Prescriptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.filter((rx) => rx.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting dispensing</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "inventory" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </Button>
        <Button
          variant={activeTab === "prescriptions" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("prescriptions")}
        >
          Prescriptions
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={activeTab === "inventory" ? "Search medications..." : "Search prescriptions..."}
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
      {activeTab === "inventory" ? (
        <Card>
          <CardHeader>
            <CardTitle>Medication Inventory ({filteredMedications.length})</CardTitle>
            <CardDescription>Current stock levels and medication details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{medication.name}</div>
                        <div className="text-sm text-muted-foreground">{medication.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{medication.category}</TableCell>
                    <TableCell>{medication.manufacturer}</TableCell>
                    <TableCell>{medication.batchNumber}</TableCell>
                    <TableCell>{medication.expiryDate}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{medication.quantity}</div>
                        <div className="text-xs text-muted-foreground">Min: {medication.minStock}</div>
                      </div>
                    </TableCell>
                    <TableCell>${medication.unitPrice}</TableCell>
                    <TableCell>{medication.location}</TableCell>
                    <TableCell>
                      <Badge className={getStockStatusColor(medication.status)}>{medication.status}</Badge>
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Stock
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Reorder</DropdownMenuItem>
                          <DropdownMenuItem>Transfer</DropdownMenuItem>
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
            <CardTitle>Prescriptions ({filteredPrescriptions.length})</CardTitle>
            <CardDescription>Patient prescriptions and dispensing status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prescription ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">{prescription.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{prescription.patientName}</div>
                        <div className="text-sm text-muted-foreground">{prescription.patientId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{prescription.doctor}</TableCell>
                    <TableCell>{prescription.medication}</TableCell>
                    <TableCell>{prescription.quantity}</TableCell>
                    <TableCell>{prescription.dosage}</TableCell>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell>
                      <Badge className={getPrescriptionStatusColor(prescription.status)}>{prescription.status}</Badge>
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Prescription
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            Dispense
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Print Label</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
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
