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
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, FileText, Download, Upload } from "lucide-react"

const medicalRecords = [
  {
    id: "MR001",
    patientId: "P001",
    patientName: "John Doe",
    recordType: "Consultation",
    date: "2024-01-15",
    doctor: "Dr. Sarah Wilson",
    diagnosis: "Hypertension",
    treatment: "Prescribed ACE inhibitors",
    notes: "Patient responding well to treatment",
    status: "Active",
    attachments: 2,
  },
  {
    id: "MR002",
    patientId: "P002",
    patientName: "Jane Smith",
    recordType: "Lab Results",
    date: "2024-01-14",
    doctor: "Dr. Michael Brown",
    diagnosis: "Diabetes Type 2",
    treatment: "Metformin 500mg twice daily",
    notes: "HbA1c levels improved",
    status: "Completed",
    attachments: 3,
  },
  {
    id: "MR003",
    patientId: "P003",
    patientName: "Robert Johnson",
    recordType: "Surgery",
    date: "2024-01-16",
    doctor: "Dr. Emily Davis",
    diagnosis: "Cardiac Bypass",
    treatment: "Triple bypass surgery completed",
    notes: "Surgery successful, patient in recovery",
    status: "In Progress",
    attachments: 5,
  },
]

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "status-active"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "status-pending"
      default:
        return "status-inactive"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Medical Records</h1>
          <p className="text-muted-foreground">Manage patient medical records and documents</p>
        </div>
        <Link href="/medical-records/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Record
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
                placeholder="Search records by patient, diagnosis, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Medical Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Records ({filteredRecords.length})</CardTitle>
          <CardDescription>Patient medical history and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attachments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.patientName}</div>
                      <div className="text-sm text-muted-foreground">{record.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.recordType}</Badge>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.doctor}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-3 w-3" />
                      {record.attachments}
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
                          <Eye className="mr-2 h-4 w-4" />
                          View Record
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
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
