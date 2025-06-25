"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Calendar, Clock, User, UserCheck, FileText, Phone } from "lucide-react"

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

export default function AppointmentViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointment()
  }, [params.id])

  const fetchAppointment = async () => {
    try {
      const response = await fetch(`/api/appointments/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setAppointment(data)
      }
    } catch (error) {
      console.error("Failed to fetch appointment:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!appointment) {
    return <div>Appointment not found</div>
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold text-card-foreground">Appointment Details</h1>
            <p className="text-muted-foreground">
              {appointment.id} • {appointment.date} at {appointment.time}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Contact Patient
          </Button>
          <Button onClick={() => router.push(`/appointments/${appointment.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Appointment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Appointment ID</Label>
                  <p className="text-sm font-medium">{appointment.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <p className="text-sm font-medium">{appointment.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{appointment.date}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Time</Label>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{appointment.time}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <p className="text-sm font-medium">{appointment.duration} minutes</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Fee</Label>
                  <p className="text-sm font-medium">${appointment.fee}</p>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Reason for Visit</Label>
                <p className="text-sm font-medium">{appointment.reason}</p>
              </div>
              {appointment.notes && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                  <p className="text-sm font-medium">{appointment.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient & Doctor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Patient</Label>
                  <div className="flex items-center mt-2">
                    <User className="mr-3 h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{appointment.patientName}</p>
                      <p className="text-xs text-muted-foreground">{appointment.patientId}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                  <div className="flex items-center mt-2">
                    <UserCheck className="mr-3 h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{appointment.doctorName}</p>
                      <p className="text-xs text-muted-foreground">{appointment.doctorId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <UserCheck className="mr-2 h-4 w-4" />
                Confirm Appointment
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Reschedule
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Add Notes
              </Button>
              <Button className="w-full" variant="outline" disabled>
                <Phone className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Created: {appointment.date}</p>
                <p className="text-muted-foreground">Status: {appointment.status}</p>
                <p className="text-muted-foreground">Last updated: {appointment.date}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
