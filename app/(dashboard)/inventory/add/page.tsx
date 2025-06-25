"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Package2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AddInventoryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unit: "",
    costPerUnit: "",
    supplier: "",
    supplierContact: "",
    location: "",
    barcode: "",
    expiryDate: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Inventory Item Added",
        description: "New inventory item has been successfully added to the inventory.",
      })

      router.push("/inventory")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add inventory item. Please try again.",
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
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/inventory">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inventory
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Add Inventory Item</h1>
          <p className="text-muted-foreground">Add a new item to the hospital inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package2 className="mr-2 h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Essential details about the inventory item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter item name"
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
                    <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                    <SelectItem value="Medications">Medications</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Radiology">Radiology</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                    <SelectItem value="Surgical">Surgical</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode/SKU</Label>
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange("barcode", e.target.value)}
                  placeholder="Enter barcode or SKU"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
              <CardDescription>Current stock levels and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentStock">Current Stock *</Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => handleInputChange("currentStock", e.target.value)}
                  placeholder="Enter current stock quantity"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stock Level *</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange("minStock", e.target.value)}
                  placeholder="Enter minimum stock level"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStock">Maximum Stock Level *</Label>
                <Input
                  id="maxStock"
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => handleInputChange("maxStock", e.target.value)}
                  placeholder="Enter maximum stock level"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit of Measurement *</Label>
                <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="boxes">Boxes</SelectItem>
                    <SelectItem value="bottles">Bottles</SelectItem>
                    <SelectItem value="vials">Vials</SelectItem>
                    <SelectItem value="sheets">Sheets</SelectItem>
                    <SelectItem value="rolls">Rolls</SelectItem>
                    <SelectItem value="packs">Packs</SelectItem>
                    <SelectItem value="units">Units</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Information */}
          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
              <CardDescription>Supplier and cost details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier Name *</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => handleInputChange("supplier", e.target.value)}
                  placeholder="Enter supplier name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplierContact">Supplier Contact</Label>
                <Input
                  id="supplierContact"
                  value={formData.supplierContact}
                  onChange={(e) => handleInputChange("supplierContact", e.target.value)}
                  placeholder="Enter supplier contact information"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costPerUnit">Cost Per Unit *</Label>
                <Input
                  id="costPerUnit"
                  type="number"
                  step="0.01"
                  value={formData.costPerUnit}
                  onChange={(e) => handleInputChange("costPerUnit", e.target.value)}
                  placeholder="Enter cost per unit"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Storage and expiry details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter storage location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional notes or comments"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href="/inventory">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Adding..." : "Add Item"}
          </Button>
        </div>
      </form>
    </div>
  )
}
