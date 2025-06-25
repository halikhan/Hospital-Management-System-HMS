"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Users, Shield, Edit, Trash2, Search, UserPlus } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Role {
  id: string
  name: string
  description: string
  color: string
  usersAssigned: number
  permissions: string[]
  keyPermissions: string[]
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  status: "Active" | "Inactive"
  lastLogin: string
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    color: "bg-red-500",
    usersAssigned: 2,
    permissions: ["*"],
    keyPermissions: ["create", "read", "update", "delete", "manage"],
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access with most permissions",
    color: "bg-orange-500",
    usersAssigned: 5,
    permissions: [
      "dashboard:view",
      "patients:create",
      "patients:read",
      "patients:update",
      "doctors:create",
      "doctors:read",
      "doctors:update",
      "staff:manage",
      "reports:generate",
    ],
    keyPermissions: ["create", "read", "update"],
  },
  {
    id: "3",
    name: "Editor",
    description: "Content management and editing permissions",
    color: "bg-blue-500",
    usersAssigned: 12,
    permissions: ["blogs:create", "blogs:read", "blogs:update", "departments:update", "services:update"],
    keyPermissions: ["create", "read", "update"],
  },
  {
    id: "4",
    name: "Author",
    description: "Content creation and own content management",
    color: "bg-green-500",
    usersAssigned: 25,
    permissions: ["blogs:create", "blogs:read", "blogs:update:own"],
    keyPermissions: ["create", "read", "update"],
  },
  {
    id: "5",
    name: "Viewer",
    description: "Read-only access to content and analytics",
    color: "bg-gray-500",
    usersAssigned: 50,
    permissions: ["dashboard:view", "reports:read"],
    keyPermissions: ["read"],
  },
]

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@webbridges.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2023-12-15 14:30",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@webbridges.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-12-15 12:15",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@webbridges.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Editor",
    status: "Active",
    lastLogin: "2023-12-14 16:45",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily@webbridges.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Author",
    status: "Inactive",
    lastLogin: "2023-12-10 09:20",
  },
]

const allPermissions = [
  { category: "Dashboard", permissions: ["dashboard:view"] },
  { category: "Patients", permissions: ["patients:create", "patients:read", "patients:update", "patients:delete"] },
  { category: "Doctors", permissions: ["doctors:create", "doctors:read", "doctors:update", "doctors:delete"] },
  { category: "Staff", permissions: ["staff:create", "staff:read", "staff:update", "staff:delete"] },
  {
    category: "Appointments",
    permissions: ["appointments:create", "appointments:read", "appointments:update", "appointments:delete"],
  },
  {
    category: "Medical Records",
    permissions: ["medical-records:create", "medical-records:read", "medical-records:update", "medical-records:delete"],
  },
  { category: "Billing", permissions: ["billing:create", "billing:read", "billing:update", "billing:delete"] },
  { category: "Pharmacy", permissions: ["pharmacy:create", "pharmacy:read", "pharmacy:update", "pharmacy:delete"] },
  {
    category: "Laboratory",
    permissions: ["laboratory:create", "laboratory:read", "laboratory:update", "laboratory:delete"],
  },
  { category: "Wards", permissions: ["wards:create", "wards:read", "wards:update", "wards:delete"] },
  {
    category: "Inventory",
    permissions: ["inventory:create", "inventory:read", "inventory:update", "inventory:delete"],
  },
  { category: "Reports", permissions: ["reports:create", "reports:read", "reports:update", "reports:delete"] },
  { category: "Blogs", permissions: ["blogs:create", "blogs:read", "blogs:update", "blogs:delete"] },
  {
    category: "Departments",
    permissions: ["departments:create", "departments:read", "departments:update", "departments:delete"],
  },
  { category: "Services", permissions: ["services:create", "services:read", "services:update", "services:delete"] },
  { category: "Messages", permissions: ["messages:create", "messages:read", "messages:update", "messages:delete"] },
  { category: "Settings", permissions: ["settings:read", "settings:update"] },
  { category: "Users", permissions: ["users:create", "users:read", "users:update", "users:delete"] },
]

export default function RolesPage() {
  const { hasPermission } = useAuth()
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    color: "bg-blue-500",
    permissions: [] as string[],
  })
  const [assignmentData, setAssignmentData] = useState({
    userId: "",
    roleId: "",
  })

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateRole = () => {
    if (!newRole.name.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive",
      })
      return
    }

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      color: newRole.color,
      usersAssigned: 0,
      permissions: newRole.permissions,
      keyPermissions: newRole.permissions.slice(0, 3),
    }

    setRoles([...roles, role])
    setNewRole({ name: "", description: "", color: "bg-blue-500", permissions: [] })
    setIsCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Role created successfully",
    })
  }

  const handleAssignRole = () => {
    if (!assignmentData.userId || !assignmentData.roleId) {
      toast({
        title: "Error",
        description: "Please select both user and role",
        variant: "destructive",
      })
      return
    }

    const role = roles.find((r) => r.id === assignmentData.roleId)
    if (!role) return

    setUsers(users.map((user) => (user.id === assignmentData.userId ? { ...user, role: role.name } : user)))

    setAssignmentData({ userId: "", roleId: "" })
    setIsAssignDialogOpen(false)
    toast({
      title: "Success",
      description: "Role assigned successfully",
    })
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId))
    toast({
      title: "Success",
      description: "Role deleted successfully",
    })
  }

  const getPermissionCount = (permissions: string[]) => {
    if (permissions.includes("*")) return 16
    return permissions.length
  }

  const getMorePermissionsCount = (role: Role) => {
    const totalPermissions = getPermissionCount(role.permissions)
    const keyPermissionsCount = role.keyPermissions.length
    return Math.max(0, totalPermissions - keyPermissionsCount)
  }

  const getRoleBadgeColor = (roleName: string) => {
    const role = roles.find((r) => r.name === roleName)
    if (!role) return "bg-gray-500"

    switch (role.color) {
      case "bg-red-500":
        return "bg-red-500 hover:bg-red-600"
      case "bg-orange-500":
        return "bg-orange-500 hover:bg-orange-600"
      case "bg-blue-500":
        return "bg-blue-500 hover:bg-blue-600"
      case "bg-green-500":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  if (!hasPermission("users:read")) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">Access Denied</h3>
          <p className="mt-1 text-sm text-muted-foreground">You don't have permission to view roles.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and system permissions</p>
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roles" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            User Assignments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {hasPermission("users:create") && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription>Define a new role with specific permissions</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input
                          id="role-name"
                          value={newRole.name}
                          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                          placeholder="Enter role name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role-color">Color</Label>
                        <Select
                          value={newRole.color}
                          onValueChange={(value) => setNewRole({ ...newRole, color: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bg-red-500">Red</SelectItem>
                            <SelectItem value="bg-orange-500">Orange</SelectItem>
                            <SelectItem value="bg-blue-500">Blue</SelectItem>
                            <SelectItem value="bg-green-500">Green</SelectItem>
                            <SelectItem value="bg-purple-500">Purple</SelectItem>
                            <SelectItem value="bg-gray-500">Gray</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role-description">Description</Label>
                      <Textarea
                        id="role-description"
                        value={newRole.description}
                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        placeholder="Enter role description"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Permissions</Label>
                      <div className="max-h-60 overflow-y-auto space-y-3">
                        {allPermissions.map((category) => (
                          <div key={category.category} className="space-y-2">
                            <h4 className="font-medium text-sm">{category.category}</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {category.permissions.map((permission) => (
                                <div key={permission} className="flex items-center space-x-2">
                                  <Switch
                                    id={permission}
                                    checked={newRole.permissions.includes(permission)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNewRole({
                                          ...newRole,
                                          permissions: [...newRole.permissions, permission],
                                        })
                                      } else {
                                        setNewRole({
                                          ...newRole,
                                          permissions: newRole.permissions.filter((p) => p !== permission),
                                        })
                                      }
                                    }}
                                  />
                                  <Label htmlFor={permission} className="text-xs">
                                    {permission.split(":")[1]}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateRole}>Create Role</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Roles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${role.color}`} />
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                    </div>
                    {hasPermission("users:update") && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRole(role.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Role
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users assigned</span>
                    <span className="font-medium">{role.usersAssigned}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Permissions</span>
                    <span className="font-medium">{getPermissionCount(role.permissions)}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.keyPermissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {getMorePermissionsCount(role) > 0 && (
                        <Badge variant="outline" className="text-xs">
                          +{getMorePermissionsCount(role)} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">User Role Assignments</h2>
              <p className="text-muted-foreground">Manage user roles and permissions</p>
            </div>
            {hasPermission("users:update") && (
              <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign Role
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Role to User</DialogTitle>
                    <DialogDescription>Select a user and assign them a role</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select User</Label>
                      <Select
                        value={assignmentData.userId}
                        onValueChange={(value) => setAssignmentData({ ...assignmentData, userId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a user" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Select Role</Label>
                      <Select
                        value={assignmentData.roleId}
                        onValueChange={(value) => setAssignmentData({ ...assignmentData, roleId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${role.color}`} />
                                <span>{role.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAssignRole}>Assign Role</Button>
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
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-white ${getRoleBadgeColor(user.role)}`}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "Active" ? "default" : "secondary"}
                        className={user.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      {hasPermission("users:update") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
