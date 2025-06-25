"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Calendar, Star, Users, Phone, Mail, MapPin, Award } from "lucide-react"

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
  address?: string
  licenseNumber?: string
  emergencyContact?: string
}

export default function DoctorViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctor()
  }, [params.id])

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`/api/doctors/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setDoctor(data)
      }
    } catch (error) {
      console.error("Failed to fetch doctor:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!doctor) {
    return <div>Doctor not found</div>
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold text-card-foreground">{doctor.name}</h1>
            <p className="text-muted-foreground">
              {doctor.specialization} • {doctor.department}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
          <Button onClick={() => router.push(`/doctors/${doctor.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Doctor
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Specialization</Label>
                  <p className="text-sm font-medium">{doctor.specialization}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                  <p className="text-sm font-medium">{doctor.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Qualification</Label>
                  <div className="flex items-center">
                    <Award className="mr-1 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{doctor.qualification}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Experience</Label>
                  <p className="text-sm font-medium">{doctor.experience} years</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">License Number</Label>
                  <p className="text-sm font-medium">{doctor.licenseNumber || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Consultation Fee</Label>
                  <p className="text-sm font-medium">${doctor.consultationFee}</p>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Schedule</Label>
                <p className="text-sm font-medium">{doctor.schedule}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-sm font-medium">{doctor.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-sm font-medium">{doctor.email}</p>
                  </div>
                </div>
                {doctor.address && (
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                      <p className="text-sm font-medium">{doctor.address}</p>
                    </div>
                  </div>
                )}
                {doctor.emergencyContact && (
                  <div className="flex items-center">
                    <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                      <p className="text-sm font-medium">{doctor.emergencyContact}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Rating</span>
                  </div>
                  <span className="text-sm font-bold">{doctor.rating}/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Patients</span>
                  </div>
                  <span className="text-sm font-bold">{doctor.patientsCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View Patients
              </Button>
              <Button className="w-full" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                View Reviews
              </Button>
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
