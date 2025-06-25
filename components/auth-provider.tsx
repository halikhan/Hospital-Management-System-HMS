"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "doctor" | "nurse" | "receptionist" | "technician" | "pharmacist"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  avatar?: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Comprehensive permission system
const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    // Full system access
    "*",
    "dashboard:view",
    "patients:create",
    "patients:read",
    "patients:update",
    "patients:delete",
    "doctors:create",
    "doctors:read",
    "doctors:update",
    "doctors:delete",
    "staff:create",
    "staff:read",
    "staff:update",
    "staff:delete",
    "appointments:create",
    "appointments:read",
    "appointments:update",
    "appointments:delete",
    "medical-records:create",
    "medical-records:read",
    "medical-records:update",
    "medical-records:delete",
    "billing:create",
    "billing:read",
    "billing:update",
    "billing:delete",
    "pharmacy:create",
    "pharmacy:read",
    "pharmacy:update",
    "pharmacy:delete",
    "laboratory:create",
    "laboratory:read",
    "laboratory:update",
    "laboratory:delete",
    "wards:create",
    "wards:read",
    "wards:update",
    "wards:delete",
    "inventory:create",
    "inventory:read",
    "inventory:update",
    "inventory:delete",
    "reports:create",
    "reports:read",
    "reports:update",
    "reports:delete",
    "blogs:create",
    "blogs:read",
    "blogs:update",
    "blogs:delete",
    "settings:read",
    "settings:update",
    "users:create",
    "users:read",
    "users:update",
    "users:delete",
  ],
  doctor: [
    "dashboard:view",
    "patients:create",
    "patients:read",
    "patients:update",
    "appointments:create",
    "appointments:read",
    "appointments:update",
    "medical-records:create",
    "medical-records:read",
    "medical-records:update",
    "prescriptions:create",
    "prescriptions:read",
    "prescriptions:update",
    "laboratory:read",
    "laboratory:update",
    "reports:read",
    "blogs:read",
  ],
  nurse: [
    "dashboard:view",
    "patients:read",
    "patients:update",
    "appointments:read",
    "appointments:update",
    "medical-records:read",
    "medical-records:update",
    "wards:create",
    "wards:read",
    "wards:update",
    "pharmacy:read",
    "laboratory:read",
    "reports:read",
    "blogs:read",
  ],
  receptionist: [
    "dashboard:view",
    "patients:create",
    "patients:read",
    "patients:update",
    "appointments:create",
    "appointments:read",
    "appointments:update",
    "appointments:delete",
    "billing:create",
    "billing:read",
    "billing:update",
    "reports:read",
    "blogs:read",
  ],
  technician: [
    "dashboard:view",
    "patients:read",
    "laboratory:create",
    "laboratory:read",
    "laboratory:update",
    "inventory:read",
    "inventory:update",
    "reports:read",
    "blogs:read",
  ],
  pharmacist: [
    "dashboard:view",
    "patients:read",
    "prescriptions:read",
    "prescriptions:update",
    "pharmacy:create",
    "pharmacy:read",
    "pharmacy:update",
    "inventory:create",
    "inventory:read",
    "inventory:update",
    "reports:read",
    "blogs:read",
  ],
}

// Mock users with enhanced permissions
const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Admin",
    email: "admin@hospital.com",
    role: "admin",
    department: "Administration",
    permissions: rolePermissions.admin,
  },
  {
    id: "2",
    name: "Dr. Sarah Wilson",
    email: "doctor@hospital.com",
    role: "doctor",
    department: "Cardiology",
    permissions: rolePermissions.doctor,
  },
  {
    id: "3",
    name: "Nurse Johnson",
    email: "nurse@hospital.com",
    role: "nurse",
    department: "Emergency",
    permissions: rolePermissions.nurse,
  },
  {
    id: "4",
    name: "Mary Receptionist",
    email: "reception@hospital.com",
    role: "receptionist",
    department: "Front Desk",
    permissions: rolePermissions.receptionist,
  },
  {
    id: "5",
    name: "Tech Anderson",
    email: "tech@hospital.com",
    role: "technician",
    department: "Laboratory",
    permissions: rolePermissions.technician,
  },
  {
    id: "6",
    name: "Pharmacist Smith",
    email: "pharmacy@hospital.com",
    role: "pharmacist",
    department: "Pharmacy",
    permissions: rolePermissions.pharmacist,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("hospital_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password") {
      setUser(foundUser)
      localStorage.setItem("hospital_user", JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hospital_user")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes("*") || user.permissions.includes(permission)
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false
    if (user.permissions.includes("*")) return true
    return permissions.some((permission) => user.permissions.includes(permission))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, hasAnyPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
