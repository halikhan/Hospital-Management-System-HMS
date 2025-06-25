"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Users, Filter } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "doctor" | "nurse" | "receptionist" | "technician" | "pharmacist"
  department: string
  status: "active" | "inactive" | "on-leave"
  joinDate: string
  avatar?: string
}

const mockStaff: Staff[] = [
  {
    id: "S001",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@hospital.com",
    phone: "+1 (555) 123-4567",
    role: "doctor",
    department: "Cardiology",
    status: "active",
    joinDate: "2020-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S002",
    name: "Nurse Johnson",
    email: "johnson@hospital.com",
    phone: "+1 (555) 234-5678",
    role: "nurse",
    department: "Emergency",
    status: "active",
    joinDate: "2021-03-20",
  },
  {
    id: "S003",
    name: "Mary Receptionist",
    email: "mary@hospital.com",
    phone: "+1 (555) 345-6789",
    role: "receptionist",
    department: "Front Desk",
    status: "active",
    joinDate: "2022-06-10",
  },
  {
    id: "S004",
    name: "Dr. Michael Brown",
    email: "michael@hospital.com",
    phone: "+1 (555) 456-7890",
    role: "doctor",
    department: "Neurology",
    status: "on-leave",
    joinDate: "2019-08-05",
  },
  {
    id: "S005",
    name: "Tech Anderson",
    email: "anderson@hospital.com",
    phone: "+1 (555) 567-8901",
    role: "technician",
    department: "Laboratory",
    status: "active",
    joinDate: "2023-01-12",
  },
]

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>(mockStaff)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const { hasPermission } = useAuth()

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "doctor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "nurse":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "receptionist":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "technician":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "pharmacist":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      setStaff(staff.filter((member) => member.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage hospital staff members and their roles</p>
        </div>
        {hasPermission("staff:write") && (
          <Link href="/staff/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doctors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.filter((s) => s.role === "doctor").length}</div>
            <p className="text-xs text-muted-foreground">Medical staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nurses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.filter((s) => s.role === "nurse").length}</div>
            <p className="text-xs text-muted-foreground">Nursing staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.filter((s) => s.status === "on-leave").length}</div>
            <p className="text-xs text-muted-foreground">Currently away</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>View and manage all hospital staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(member.role)}>{member.role.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/staff/${member.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {hasPermission("staff:write") && (
                            <DropdownMenuItem asChild>
                              <Link href={`/staff/${member.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                          )}
                          {hasPermission("staff:delete") && (
                            <DropdownMenuItem onClick={() => handleDelete(member.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
