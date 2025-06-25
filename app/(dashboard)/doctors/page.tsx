"use client"

import { useState, useEffect } from "react"
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
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Calendar, Star, Users } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialization: string
  phone: string
  email: string
  department: string
  experience: number
  qualification: string
  schedule: string
  status: string
  consultationFee: number
  rating: number
  patientsCount: number
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctors")
      const data = await response.json()
      setDoctors(data)
    } catch (error) {
      console.error("Failed to fetch doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "status-active"
      case "On Leave":
        return "status-pending"
      case "Inactive":
        return "status-inactive"
      default:
        return "status-inactive"
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Doctor Management</h1>
          <p className="text-muted-foreground">Manage doctor profiles and schedules</p>
        </div>
        <Link href="/doctors/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Doctor
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
                placeholder="Search doctors by name, specialization, or department..."
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

      {/* Doctors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Doctors ({filteredDoctors.length})</CardTitle>
          <CardDescription>A list of all registered doctors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-muted-foreground">{doctor.qualification}</div>
                    </div>
                  </TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.department}</TableCell>
                  <TableCell>{doctor.experience} years</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {doctor.patientsCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                  </TableCell>
                  <TableCell>${doctor.consultationFee}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`/doctors/${doctor.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/doctors/${doctor.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Doctor
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
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
