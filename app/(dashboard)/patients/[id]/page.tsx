"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Calendar, FileText, Phone, Mail, MapPin, Heart, User, Shield } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  emergencyContact: string
  bloodType: string
  allergies: string
  lastVisit: string
  status: string
  condition: string
  doctor: string
  insurance: string
}

export default function PatientViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatient()
  }, [params.id])

  const fetchPatient = async () => {
    try {
      const response = await fetch(`/api/patients/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setPatient(data)
      }
    } catch (error) {
      console.error("Failed to fetch patient:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "status-active"
      case "Discharged":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "Admitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
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
            <h1 className="text-3xl font-heading font-bold text-card-foreground">{patient.name}</h1>
            <p className="text-muted-foreground">
              {patient.age} years old • {patient.gender} • {patient.id}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Medical Records
          </Button>
          <Button onClick={() => router.push(`/patients/${patient.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Patient
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                  <p className="text-sm font-medium">{patient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Patient ID</Label>
                  <p className="text-sm font-medium">{patient.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                  <p className="text-sm font-medium">{patient.age} years</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                  <div className="flex items-center">
                    <User className="mr-1 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{patient.gender}</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-sm font-medium">{patient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-sm font-medium">{patient.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                    <p className="text-sm font-medium">{patient.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                    <p className="text-sm font-medium">{patient.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Blood Type</Label>
                  <div className="flex items-center">
                    <Heart className="mr-1 h-4 w-4 text-red-500" />
                    <p className="text-sm font-medium">{patient.bloodType}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Current Condition</Label>
                  <p className="text-sm font-medium">{patient.condition}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Assigned Doctor</Label>
                  <p className="text-sm font-medium">{patient.doctor}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Last Visit</Label>
                  <p className="text-sm font-medium">{patient.lastVisit}</p>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Allergies</Label>
                <p className="text-sm font-medium">{patient.allergies || "None reported"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Insurance Provider</Label>
                <div className="flex items-center">
                  <Shield className="mr-1 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">{patient.insurance}</p>
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
              <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
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
                <FileText className="mr-2 h-4 w-4" />
                View Medical Records
              </Button>
              <Button className="w-full" variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Add Vital Signs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Last visit: {patient.lastVisit}</p>
                <p className="text-muted-foreground">Status: {patient.status}</p>
                <p className="text-muted-foreground">Condition: {patient.condition}</p>
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
