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
import { Plus, MoreHorizontal, Edit, Trash2, Search, Stethoscope, Users, Clock } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Department {
  id: string
  name: string
  description: string
  head: string
  staff: number
  services: string[]
  hours: string
  phone: string
  email: string
  image: string
  status: "active" | "inactive"
}

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Emergency Department",
    description: "24/7 emergency medical care for critical and urgent conditions",
    head: "Dr. Sarah Wilson",
    staff: 25,
    services: ["Emergency Care", "Trauma", "Critical Care"],
    hours: "24/7",
    phone: "+1 (555) 123-4567",
    email: "emergency@hospital.com",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
  {
    id: "2",
    name: "Cardiology",
    description: "Comprehensive heart and cardiovascular care services",
    head: "Dr. Michael Brown",
    staff: 18,
    services: ["Heart Surgery", "Cardiac Catheterization", "ECG"],
    hours: "8:00 AM - 6:00 PM",
    phone: "+1 (555) 123-4568",
    email: "cardiology@hospital.com",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
  {
    id: "3",
    name: "Pediatrics",
    description: "Specialized medical care for infants, children, and adolescents",
    head: "Dr. Emily Davis",
    staff: 22,
    services: ["Child Care", "Vaccinations", "Growth Monitoring"],
    hours: "7:00 AM - 8:00 PM",
    phone: "+1 (555) 123-4569",
    email: "pediatrics@hospital.com",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
  {
    id: "4",
    name: "Orthopedics",
    description: "Treatment of musculoskeletal system disorders and injuries",
    head: "Dr. James Miller",
    staff: 15,
    services: ["Joint Replacement", "Sports Medicine", "Fracture Care"],
    hours: "8:00 AM - 5:00 PM",
    phone: "+1 (555) 123-4570",
    email: "orthopedics@hospital.com",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
]

export default function DepartmentsPage() {
  const { hasPermission } = useAuth()
  const { toast } = useToast()
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    head: "",
    phone: "",
    email: "",
    hours: "",
    services: "",
  })

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateDepartment = () => {
    if (!newDepartment.name.trim()) {
      toast({
        title: "Error",
        description: "Department name is required",
        variant: "destructive",
      })
      return
    }

    const department: Department = {
      id: Date.now().toString(),
      name: newDepartment.name,
      description: newDepartment.description,
      head: newDepartment.head,
      staff: 0,
      services: newDepartment.services.split(",").map((s) => s.trim()),
      hours: newDepartment.hours,
      phone: newDepartment.phone,
      email: newDepartment.email,
      image: "/placeholder.svg?height=200&width=300",
      status: "active",
    }

    setDepartments([...departments, department])
    setNewDepartment({
      name: "",
      description: "",
      head: "",
      phone: "",
      email: "",
      hours: "",
      services: "",
    })
    setIsCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Department created successfully",
    })
  }

  const handleDeleteDepartment = (deptId: string) => {
    setDepartments(departments.filter((dept) => dept.id !== deptId))
    toast({
      title: "Success",
      description: "Department deleted successfully",
    })
  }

  if (!hasPermission("departments:read")) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">Access Denied</h3>
          <p className="mt-1 text-sm text-muted-foreground">You don't have permission to view departments.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Departments Management</h1>
          <p className="text-muted-foreground">Manage hospital departments and their information</p>
        </div>
        {hasPermission("departments:create") && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>Create a new hospital department</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept-name">Department Name</Label>
                    <Input
                      id="dept-name"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                      placeholder="Enter department name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-head">Department Head</Label>
                    <Input
                      id="dept-head"
                      value={newDepartment.head}
                      onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
                      placeholder="Enter department head"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept-description">Description</Label>
                  <Textarea
                    id="dept-description"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                    placeholder="Enter department description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept-phone">Phone</Label>
                    <Input
                      id="dept-phone"
                      value={newDepartment.phone}
                      onChange={(e) => setNewDepartment({ ...newDepartment, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-email">Email</Label>
                    <Input
                      id="dept-email"
                      type="email"
                      value={newDepartment.email}
                      onChange={(e) => setNewDepartment({ ...newDepartment, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept-hours">Operating Hours</Label>
                    <Input
                      id="dept-hours"
                      value={newDepartment.hours}
                      onChange={(e) => setNewDepartment({ ...newDepartment, hours: e.target.value })}
                      placeholder="e.g., 8:00 AM - 6:00 PM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-services">Services (comma-separated)</Label>
                    <Input
                      id="dept-services"
                      value={newDepartment.services}
                      onChange={(e) => setNewDepartment({ ...newDepartment, services: e.target.value })}
                      placeholder="Service 1, Service 2, Service 3"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDepartment}>Create Department</Button>
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
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={department.image || "/placeholder.svg"}
                alt={department.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={department.status === "active" ? "default" : "secondary"}>{department.status}</Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{department.name}</CardTitle>
                {hasPermission("departments:update") && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Department
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteDepartment(department.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Department
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Department Head</span>
                  <span className="font-medium">{department.head}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    Staff
                  </span>
                  <span className="font-medium">{department.staff}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    Hours
                  </span>
                  <span className="font-medium">{department.hours}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {department.services.slice(0, 3).map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {department.services.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{department.services.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground">
                  <p>📞 {department.phone}</p>
                  <p>✉️ {department.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
