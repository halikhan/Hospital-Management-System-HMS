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

export default function AddLabTestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    testType: "",
    category: "",
    orderedBy: "",
    priority: "Normal",
    clinicalInfo: "",
    specialInstructions: "",
    cost: "",
    expectedDuration: "",
    sampleType: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Lab test ordered successfully",
      })
      router.push("/laboratory")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to order lab test",
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
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Order Lab Test</h1>
          <p className="text-muted-foreground">Create a new laboratory test order</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Patient and ordering details</CardDescription>
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
                <Label htmlFor="orderedBy">Ordered By *</Label>
                <Input
                  id="orderedBy"
                  value={formData.orderedBy}
                  onChange={(e) => handleInputChange("orderedBy", e.target.value)}
                  placeholder="Doctor name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="STAT">STAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
              <CardDescription>Test type and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testType">Test Type *</Label>
                <Select value={formData.testType} onValueChange={(value) => handleInputChange("testType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Complete Blood Count">Complete Blood Count</SelectItem>
                    <SelectItem value="Basic Metabolic Panel">Basic Metabolic Panel</SelectItem>
                    <SelectItem value="Lipid Panel">Lipid Panel</SelectItem>
                    <SelectItem value="Liver Function Tests">Liver Function Tests</SelectItem>
                    <SelectItem value="Thyroid Function Tests">Thyroid Function Tests</SelectItem>
                    <SelectItem value="HbA1c">HbA1c</SelectItem>
                    <SelectItem value="Cardiac Enzymes">Cardiac Enzymes</SelectItem>
                    <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                    <SelectItem value="Blood Culture">Blood Culture</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hematology">Hematology</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Microbiology">Microbiology</SelectItem>
                    <SelectItem value="Immunology">Immunology</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sampleType">Sample Type</Label>
                <Select value={formData.sampleType} onValueChange={(value) => handleInputChange("sampleType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sample type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blood">Blood</SelectItem>
                    <SelectItem value="Urine">Urine</SelectItem>
                    <SelectItem value="Stool">Stool</SelectItem>
                    <SelectItem value="Saliva">Saliva</SelectItem>
                    <SelectItem value="Tissue">Tissue</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => handleInputChange("cost", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedDuration">Expected Duration (hours)</Label>
                  <Input
                    id="expectedDuration"
                    type="number"
                    value={formData.expectedDuration}
                    onChange={(e) => handleInputChange("expectedDuration", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Clinical Information</CardTitle>
            <CardDescription>Additional clinical details and instructions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clinicalInfo">Clinical Information</Label>
              <Textarea
                id="clinicalInfo"
                value={formData.clinicalInfo}
                onChange={(e) => handleInputChange("clinicalInfo", e.target.value)}
                placeholder="Relevant clinical history, symptoms, or diagnosis"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                placeholder="Any special handling or processing instructions"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Ordering..." : "Order Test"}
          </Button>
        </div>
      </form>
    </div>
  )
}
