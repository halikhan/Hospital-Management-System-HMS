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

export default function AddMedicationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    quantity: "",
    minStock: "",
    unitPrice: "",
    location: "",
    description: "",
    sideEffects: "",
    dosageInstructions: "",
    status: "In Stock",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Medication added successfully",
      })
      router.push("/pharmacy")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add medication",
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
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Add New Medication</h1>
          <p className="text-muted-foreground">Add medication to pharmacy inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Medication Information</CardTitle>
              <CardDescription>Basic medication details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Medication Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                    <SelectItem value="Analgesic">Analgesic</SelectItem>
                    <SelectItem value="Antidiabetic">Antidiabetic</SelectItem>
                    <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                    <SelectItem value="Respiratory">Respiratory</SelectItem>
                    <SelectItem value="Neurological">Neurological</SelectItem>
                    <SelectItem value="Gastrointestinal">Gastrointestinal</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer *</Label>
                <Input
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchNumber">Batch Number</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
              <CardDescription>Inventory and pricing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Minimum Stock *</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => handleInputChange("minStock", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice">Unit Price ($) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., A-1-05"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    <SelectItem value="Discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Detailed medication information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the medication"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosageInstructions">Dosage Instructions</Label>
              <Textarea
                id="dosageInstructions"
                value={formData.dosageInstructions}
                onChange={(e) => handleInputChange("dosageInstructions", e.target.value)}
                placeholder="Standard dosage instructions"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sideEffects">Side Effects</Label>
              <Textarea
                id="sideEffects"
                value={formData.sideEffects}
                onChange={(e) => handleInputChange("sideEffects", e.target.value)}
                placeholder="Common side effects and warnings"
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
            {loading ? "Adding..." : "Add Medication"}
          </Button>
        </div>
      </form>
    </div>
  )
}
