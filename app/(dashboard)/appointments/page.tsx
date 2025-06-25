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
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Calendar, Clock, User, UserCheck } from "lucide-react"

interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  type: string
  status: string
  reason: string
  notes: string
  duration: number
  fee: number
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments")
      const data = await response.json()
      setAppointments(data)
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "status-pending"
      case "Confirmed":
        return "status-active"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Cancelled":
        return "status-critical"
      case "No Show":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
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
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Appointment Management</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Link href="/appointments/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Appointment
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
                placeholder="Search appointments by patient, doctor, or type..."
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
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
          <CardDescription>All scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appointment ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.patientId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <UserCheck className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">{appointment.doctorName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.doctorId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">{appointment.date}</div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {appointment.duration} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                  </TableCell>
                  <TableCell>${appointment.fee}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`/appointments/${appointment.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/appointments/${appointment.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Appointment
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Confirm</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
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
    </div>
  )
}
