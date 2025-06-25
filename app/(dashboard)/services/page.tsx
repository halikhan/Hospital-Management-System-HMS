"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2, Search, Activity, DollarSign, Clock } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  name: string
  description: string
  department: string
  price: string
  duration: string
  availability: "available" | "limited" | "unavailable"
  features: string[]
  image: string
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Emergency Care",
    description: "24/7 emergency medical services for critical conditions",
    department: "Emergency Department",
    price: "$500 - $2000",
    duration: "Immediate",
    availability: "available",
    features: ["24/7 Availability", "Trauma Care", "Critical Care", "Ambulance Service"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Heart Surgery",
    description: "Advanced cardiac surgical procedures and interventions",
    department: "Cardiology",
    price: "$15000 - $50000",
    duration: "3-6 hours",
    availability: "available",
    features: ["Minimally Invasive", "Expert Surgeons", "ICU Care", "Rehabilitation"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Pediatric Care",
    description: "Comprehensive medical care for children and adolescents",
    department: "Pediatrics",
    price: "$100 - $500",
    duration: "30-60 minutes",
    availability: "available",
    features: ["Child-Friendly", "Specialized Staff", "Family Support", "Vaccinations"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Joint Replacement",
    description: "Advanced orthopedic joint replacement surgeries",
    department: "Orthopedics",
    price: "$20000 - $40000",
    duration: "2-4 hours",
    availability: "limited",
    features: ["Robotic Surgery", "Quick Recovery", "Physical Therapy", "Long-term Care"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ServicesPage() {
  const { hasPermission } = useAuth()
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>(mockServices)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    department: "",
    price: "",
    duration: "",
    features: "",
  })

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateService = () => {
    if (!newService.name.trim()) {
      toast({
        title: "Error",
        description: "Service name is required",
        variant: "destructive",
      })
      return
    }

    const service: Service = {
      id: Date.now().toString(),
      name: newService.name,
      description: newService.description,
      department: newService.department,
      price: newService.price,
      duration: newService.duration,
      availability: "available",
      features: newService.features.split(",").map((f) => f.trim()),
      image: "/placeholder.svg?height=200&width=300",
    }

    setServices([...services, service])
    setNewService({
      name: "",
      description: "",
      department: "",
      price: "",
      duration: "",
      features: "",
    })
    setIsCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Service created successfully",
    })
  }

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId))
    toast({
      title: "Success",
      description: "Service deleted successfully",
    })
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "limited":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "unavailable":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (!hasPermission("services:read")) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">Access Denied</h3>
          <p className="mt-1 text-sm text-muted-foreground">You don't have permission to view services.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Services Management</h1>
          <p className="text-muted-foreground">Manage hospital services and their details</p>
        </div>
        {hasPermission("services:create") && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Create a new hospital service</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name</Label>
                    <Input
                      id="service-name"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      placeholder="Enter service name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-department">Department</Label>
                    <Input
                      id="service-department"
                      value={newService.department}
                      onChange={(e) => setNewService({ ...newService, department: e.target.value })}
                      placeholder="Enter department"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-description">Description</Label>
                  <Textarea
                    id="service-description"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Enter service description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-price">Price Range</Label>
                    <Input
                      id="service-price"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      placeholder="e.g., $100 - $500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-duration">Duration</Label>
                    <Input
                      id="service-duration"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                      placeholder="e.g., 30-60 minutes"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-features">Features (comma-separated)</Label>
                  <Input
                    id="service-features"
                    value={newService.features}
                    onChange={(e) => setNewService({ ...newService, features: e.target.value })}
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateService}>Create Service</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className={getAvailabilityColor(service.availability)}>{service.availability}</Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                {hasPermission("services:update") && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Service
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteService(service.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Service
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium">{service.department}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <DollarSign className="mr-1 h-3 w-3" />
                    Price
                  </span>
                  <span className="font-medium">{service.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    Duration
                  </span>
                  <span className="font-medium">{service.duration}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {service.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
