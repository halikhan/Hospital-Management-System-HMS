export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  emergencyContact: string
  bloodType: string
  allergies: string
  lastVisit: string
  status: string
  condition: string
  doctor: string
  insurance: string
  createdAt: string
  updatedAt: string
}

export const patients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Doe - +1 (555) 123-4568",
    bloodType: "O+",
    allergies: "Penicillin",
    lastVisit: "2024-01-15",
    status: "Active",
    condition: "Hypertension",
    doctor: "Dr. Sarah Wilson",
    insurance: "Blue Cross Blue Shield",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 987-6543",
    email: "jane.smith@email.com",
    address: "456 Oak Ave, City, State 12345",
    emergencyContact: "John Smith - +1 (555) 987-6544",
    bloodType: "A+",
    allergies: "None",
    lastVisit: "2024-01-14",
    status: "Discharged",
    condition: "Diabetes",
    doctor: "Dr. Michael Brown",
    insurance: "Aetna",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
  },
]
