"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Save, CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format, parseISO } from "date-fns"

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

export default function EditAppointmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    time: "",
    type: "",
    reason: "",
    notes: "",
    duration: "",
    status: "",
  })

  useEffect(() => {
    fetchAppointment()
  }, [params.id])

  const fetchAppointment = async () => {
    try {
      const response = await fetch(`/api/appointments/${params.id}`)
      if (response.ok) {
        const appointment: Appointment = await response.json()
        setFormData({
          patientId: appointment.patientId,
          patientName: appointment.patientName,
          doctorId: appointment.doctorId,
          doctorName: appointment.doctorName,
          time: appointment.time,
          type: appointment.type,
          reason: appointment.reason,
          notes: appointment.notes,
          duration: appointment.duration.toString(),
          status: appointment.status,
        })
        setDate(parseISO(appointment.date))
      }
    } catch (error) {
      console.error("Failed to fetch appointment:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/appointments/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: format(date, "yyyy-MM-dd"),
          duration: Number.parseInt(formData.duration),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Appointment updated successfully",
        })
        router.push(`/appointments/${params.id}`)
      } else {
        throw new Error("Failed to update appointment")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (initialLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Edit Appointment</h1>
          <p className="text-muted-foreground">Update appointment information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient & Doctor Information</CardTitle>
              <CardDescription>Update patient and doctor for the appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange("patientId", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorId">Doctor ID *</Label>
                <Input
                  id="doctorId"
                  value={formData.doctorId}
                  onChange={(e) => handleInputChange("doctorId", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name *</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={(e) => handleInputChange("doctorName", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Update schedule and appointment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Appointment Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Surgery Consultation">Surgery Consultation</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Routine Checkup">Routine Checkup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="No Show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit *</Label>
                <Input
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional information or special instructions"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Updating..." : "Update Appointment"}
          </Button>
        </div>
      </form>
    </div>
  )
}
