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
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, FileText, Calendar, Phone, Mail } from "lucide-react"

const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    lastVisit: "2024-01-15",
    status: "Active",
    condition: "Hypertension",
    doctor: "Dr. Sarah Wilson",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 987-6543",
    email: "jane.smith@email.com",
    lastVisit: "2024-01-14",
    status: "Discharged",
    condition: "Diabetes",
    doctor: "Dr. Michael Brown",
  },
  {
    id: "P003",
    name: "Robert Johnson",
    age: 67,
    gender: "Male",
    phone: "+1 (555) 456-7890",
    email: "robert.j@email.com",
    lastVisit: "2024-01-16",
    status: "Admitted",
    condition: "Cardiac Surgery",
    doctor: "Dr. Emily Davis",
  },
  {
    id: "P004",
    name: "Maria Garcia",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 321-0987",
    email: "maria.garcia@email.com",
    lastVisit: "2024-01-13",
    status: "Active",
    condition: "Pregnancy Care",
    doctor: "Dr. Lisa Anderson",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Admitted":
        return "bg-blue-100 text-blue-800"
      case "Discharged":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and information</p>
        </div>
        <Link href="/patients/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients by name, ID, or condition..."
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

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patients ({filteredPatients.length})</CardTitle>
          <CardDescription>A list of all registered patients</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{patient.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{patient.age} years</div>
                      <div className="text-muted-foreground">{patient.gender}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                  </TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`/patients/${patient.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/patients/${patient.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Patient
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Medical Records
                        </DropdownMenuItem>
                        <Link href="/appointments/add">
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Appointment
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Archive Patient</DropdownMenuItem>
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
