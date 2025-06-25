import { type NextRequest, NextResponse } from "next/server"
import { patients, type Patient } from "./data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const status = searchParams.get("status")

  let filteredPatients = patients

  if (search) {
    filteredPatients = filteredPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.id.toLowerCase().includes(search.toLowerCase()) ||
        patient.condition.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (status) {
    filteredPatients = filteredPatients.filter((patient) => patient.status === status)
  }

  return NextResponse.json(filteredPatients)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newPatient: Patient = {
    id: `P${String(patients.length + 1).padStart(3, "0")}`,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  patients.push(newPatient)

  return NextResponse.json(newPatient, { status: 201 })
}
