//
// Centralised in-memory store for demo purposes.
// In production you would replace this with a real DB.
//
export interface Doctor {
  id: string
  name: string
  specialization: string
  phone: string
  email: string
  department: string
  experience: number
  qualification: string
  schedule: string
  status: string
  consultationFee: number
  rating: number
  patientsCount: number
  createdAt: string
  updatedAt: string
  // optional extra fields
  address?: string
  licenseNumber?: string
  emergencyContact?: string
}

export const doctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    phone: "+1 (555) 111-2222",
    email: "sarah.wilson@hospital.com",
    department: "Cardiology",
    experience: 15,
    qualification: "MD, FACC",
    schedule: "Mon-Fri 9:00-17:00",
    status: "Active",
    consultationFee: 200,
    rating: 4.8,
    patientsCount: 150,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "D002",
    name: "Dr. Michael Brown",
    specialization: "Endocrinology",
    phone: "+1 (555) 333-4444",
    email: "michael.brown@hospital.com",
    department: "Endocrinology",
    experience: 12,
    qualification: "MD, FACE",
    schedule: "Mon-Wed 8:00-16:00",
    status: "Active",
    consultationFee: 180,
    rating: 4.6,
    patientsCount: 120,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
]
