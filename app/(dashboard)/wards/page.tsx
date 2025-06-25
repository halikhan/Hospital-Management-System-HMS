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
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Bed, Users, MapPin, Activity } from "lucide-react"

const wards = [
  {
    id: "W001",
    name: "General Ward A",
    type: "General",
    floor: 2,
    totalBeds: 20,
    occupiedBeds: 15,
    availableBeds: 5,
    nurseInCharge: "Nurse Johnson",
    status: "Active",
  },
  {
    id: "W002",
    name: "ICU Ward",
    type: "Intensive Care",
    floor: 3,
    totalBeds: 10,
    occupiedBeds: 8,
    availableBeds: 2,
    nurseInCharge: "Nurse Williams",
    status: "Active",
  },
  {
    id: "W003",
    name: "Pediatric Ward",
    type: "Pediatrics",
    floor: 1,
    totalBeds: 15,
    occupiedBeds: 12,
    availableBeds: 3,
    nurseInCharge: "Nurse Davis",
    status: "Active",
  },
]

const patients = [
  {
    id: "P001",
    name: "John Doe",
    wardId: "W001",
    wardName: "General Ward A",
    bedNumber: "A-05",
    admissionDate: "2024-01-10",
    condition: "Stable",
    doctor: "Dr. Sarah Wilson",
    status: "Admitted",
  },
  {
    id: "P002",
    name: "Jane Smith",
    wardId: "W002",
    wardName: "ICU Ward",
    bedNumber: "ICU-03",
    admissionDate: "2024-01-12",
    condition: "Critical",
    doctor: "Dr. Michael Brown",
    status: "Admitted",
  },
  {
    id: "P003",
    name: "Robert Johnson",
    wardId: "W002",
    wardName: "ICU Ward",
    bedNumber: "ICU-07",
    admissionDate: "2024-01-14",
    condition: "Serious",
    doctor: "Dr. Emily Davis",
    status: "Admitted",
  },
]

export default function WardsPage() {
  const [activeTab, setActiveTab] = useState("wards")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWards = wards.filter(
    (ward) =>
      ward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ward.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ward.nurseInCharge.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.wardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getOccupancyColor = (occupiedBeds: number, totalBeds: number) => {
    const percentage = (occupiedBeds / totalBeds) * 100
    if (percentage >= 90) return "status-critical"
    if (percentage >= 70) return "status-pending"
    return "status-active"
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Stable":
        return "status-active"
      case "Serious":
        return "status-pending"
      case "Critical":
        return "status-critical"
      default:
        return "status-inactive"
    }
  }

  const totalBeds = wards.reduce((sum, ward) => sum + ward.totalBeds, 0)
  const totalOccupied = wards.reduce((sum, ward) => sum + ward.occupiedBeds, 0)
  const totalAvailable = wards.reduce((sum, ward) => sum + ward.availableBeds, 0)
  const occupancyRate = Math.round((totalOccupied / totalBeds) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Ward Management</h1>
          <p className="text-muted-foreground">Manage hospital wards and patient admissions</p>
        </div>
        <Link href="/wards/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Ward
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBeds}</div>
            <p className="text-xs text-muted-foreground">Across all wards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Beds</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOccupied}</div>
            <p className="text-xs text-muted-foreground">{occupancyRate}% occupancy rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAvailable}</div>
            <p className="text-xs text-muted-foreground">Ready for admission</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Wards</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wards.filter((w) => w.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button variant={activeTab === "wards" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("wards")}>
          Wards
        </Button>
        <Button
          variant={activeTab === "patients" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("patients")}
        >
          Ward Patients
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={activeTab === "wards" ? "Search wards..." : "Search patients..."}
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
      {activeTab === "wards" ? (
        <Card>
          <CardHeader>
            <CardTitle>Hospital Wards ({filteredWards.length})</CardTitle>
            <CardDescription>Ward information and bed availability</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ward ID</TableHead>
                  <TableHead>Ward Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead>Bed Capacity</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Nurse in Charge</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWards.map((ward) => (
                  <TableRow key={ward.id}>
                    <TableCell className="font-medium">{ward.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ward.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          Floor {ward.floor}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ward.type}</Badge>
                    </TableCell>
                    <TableCell>{ward.floor}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Bed className="mr-1 h-3 w-3" />
                        {ward.totalBeds}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getOccupancyColor(ward.occupiedBeds, ward.totalBeds)}>
                        {ward.occupiedBeds}/{ward.totalBeds}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">{ward.availableBeds}</div>
                    </TableCell>
                    <TableCell>{ward.nurseInCharge}</TableCell>
                    <TableCell>
                      <Badge className="status-active">{ward.status}</Badge>
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
                            View Ward Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Ward
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Patients
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Bed Management</DropdownMenuItem>
                          <DropdownMenuItem>Staff Assignment</DropdownMenuItem>
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
            <CardTitle>Ward Patients ({filteredPatients.length})</CardTitle>
            <CardDescription>Patients currently admitted to wards</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Bed Number</TableHead>
                  <TableHead>Admission Date</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Attending Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{patient.wardName}</div>
                        <div className="text-sm text-muted-foreground">{patient.wardId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Bed className="mr-1 h-3 w-3" />
                        {patient.bedNumber}
                      </div>
                    </TableCell>
                    <TableCell>{patient.admissionDate}</TableCell>
                    <TableCell>
                      <Badge className={getConditionColor(patient.condition)}>{patient.condition}</Badge>
                    </TableCell>
                    <TableCell>{patient.doctor}</TableCell>
                    <TableCell>
                      <Badge className="status-active">{patient.status}</Badge>
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
                            View Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Activity className="mr-2 h-4 w-4" />
                            Medical Records
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Transfer Ward</DropdownMenuItem>
                          <DropdownMenuItem>Discharge</DropdownMenuItem>
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
