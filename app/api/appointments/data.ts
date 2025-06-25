//
// 💾  Temporary in-memory datastore used by all appointment APIs.
// Replace with a real database in production.
//
export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  type: string
  status: string
  reason: string
  notes: string
  duration: number // minutes
  fee: number
  createdAt: string
  updatedAt: string
}

export const appointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "John Doe",
    doctorId: "D001",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-20",
    time: "10:00",
    type: "Consultation",
    status: "Scheduled",
    reason: "Regular check-up",
    notes: "",
    duration: 30,
    fee: 200,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Jane Smith",
    doctorId: "D002",
    doctorName: "Dr. Michael Brown",
    date: "2024-01-21",
    time: "14:30",
    type: "Follow-up",
    status: "Confirmed",
    reason: "Diabetes management",
    notes: "Bring recent lab results",
    duration: 45,
    fee: 180,
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
  },
]
