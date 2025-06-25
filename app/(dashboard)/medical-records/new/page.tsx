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
import { ArrowLeft, Save, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewMedicalRecordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    recordType: "",
    doctor: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    status: "Active",
    medications: "",
    allergies: "",
    vitalSigns: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Medical record created successfully",
      })
      router.push("/medical-records")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create medical record",
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
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Add New Medical Record</h1>
          <p className="text-muted-foreground">Create a new medical record entry</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Patient and record details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange("patientId", e.target.value)}
                  placeholder="e.g., P001"
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
                <Label htmlFor="recordType">Record Type *</Label>
                <Select value={formData.recordType} onValueChange={(value) => handleInputChange("recordType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select record type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Lab Results">Lab Results</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor *</Label>
                <Input
                  id="doctor"
                  value={formData.doctor}
                  onChange={(e) => handleInputChange("doctor", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Details</CardTitle>
              <CardDescription>Diagnosis and treatment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis *</Label>
                <Input
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatment">Treatment *</Label>
                <Textarea
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => handleInputChange("treatment", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  placeholder="List prescribed medications"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vitalSigns">Vital Signs</Label>
                <Textarea
                  id="vitalSigns"
                  value={formData.vitalSigns}
                  onChange={(e) => handleInputChange("vitalSigns", e.target.value)}
                  placeholder="Blood pressure, temperature, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional observations or notes"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>Upload relevant documents or images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Drag and drop files here, or click to select files</p>
              <Button variant="outline" className="mt-2">
                Select Files
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Creating..." : "Create Record"}
          </Button>
        </div>
      </form>
    </div>
  )
}
