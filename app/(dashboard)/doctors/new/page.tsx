"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewDoctorPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    department: "",
    experience: "",
    qualification: "",
    schedule: "",
    consultationFee: "",
    status: "Active",
    address: "",
    licenseNumber: "",
    emergencyContact: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          experience: Number.parseInt(formData.experience),
          consultationFee: Number.parseFloat(formData.consultationFee),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Doctor added successfully",
        })
        router.push("/doctors")
      } else {
        throw new Error("Failed to add doctor")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add doctor",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Add New Doctor</h1>
          <p className="text-muted-foreground">Create a new doctor profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic doctor details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Name - Phone Number"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Medical qualifications and specialization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => handleInputChange("specialization", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                    <SelectItem value="Gastroenterology">Gastroenterology</SelectItem>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange("qualification", e.target.value)}
                  placeholder="e.g., MD, MBBS, PhD"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years) *</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultationFee">Consultation Fee ($) *</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    step="0.01"
                    value={formData.consultationFee}
                    onChange={(e) => handleInputChange("consultationFee", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => handleInputChange("schedule", e.target.value)}
                  placeholder="e.g., Mon-Fri 9:00-17:00"
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
            {loading ? "Adding..." : "Add Doctor"}
          </Button>
        </div>
      </form>
    </div>
  )
}
