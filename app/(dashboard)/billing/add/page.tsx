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
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ServiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export default function AddBillingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    insuranceProvider: "",
    insuranceCoverage: "",
    paymentMethod: "",
    notes: "",
  })
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Invoice created successfully",
      })
      router.push("/billing")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setServices([...services, newService])
  }

  const removeService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const updateService = (id: string, field: keyof ServiceItem, value: string | number) => {
    setServices(
      services.map((service) => {
        if (service.id === id) {
          const updated = { ...service, [field]: value }
          if (field === "quantity" || field === "unitPrice") {
            updated.total = updated.quantity * updated.unitPrice
          }
          return updated
        }
        return service
      }),
    )
  }

  const totalAmount = services.reduce((sum, service) => sum + service.total, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Create New Invoice</h1>
          <p className="text-muted-foreground">Generate a new billing invoice</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Patient and insurance details</CardDescription>
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
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceCoverage">Insurance Coverage (%)</Label>
                <Input
                  id="insuranceCoverage"
                  type="number"
                  value={formData.insuranceCoverage}
                  onChange={(e) => handleInputChange("insuranceCoverage", e.target.value)}
                  placeholder="e.g., 80"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Payment method and notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional billing notes"
                />
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-lg font-semibold">Total Amount: ${totalAmount.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Services & Charges</CardTitle>
                <CardDescription>Add services and their charges</CardDescription>
              </div>
              <Button type="button" onClick={addService} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={service.id} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-5">
                    <Label htmlFor={`description-${service.id}`}>Service Description</Label>
                    <Input
                      id={`description-${service.id}`}
                      value={service.description}
                      onChange={(e) => updateService(service.id, "description", e.target.value)}
                      placeholder="e.g., Consultation, Lab Test"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`quantity-${service.id}`}>Quantity</Label>
                    <Input
                      id={`quantity-${service.id}`}
                      type="number"
                      value={service.quantity}
                      onChange={(e) => updateService(service.id, "quantity", Number.parseInt(e.target.value) || 0)}
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`unitPrice-${service.id}`}>Unit Price ($)</Label>
                    <Input
                      id={`unitPrice-${service.id}`}
                      type="number"
                      step="0.01"
                      value={service.unitPrice}
                      onChange={(e) => updateService(service.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Total</Label>
                    <div className="h-10 px-3 py-2 border rounded-md bg-muted flex items-center">
                      ${service.total.toFixed(2)}
                    </div>
                  </div>
                  <div className="col-span-1">
                    {services.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeService(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Creating..." : "Create Invoice"}
          </Button>
        </div>
      </form>
    </div>
  )
}
