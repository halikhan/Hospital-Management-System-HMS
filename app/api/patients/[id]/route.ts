import { type NextRequest, NextResponse } from "next/server"
import { patients } from "../data"

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id)

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 })
  }

  return NextResponse.json(patient)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const patientIndex = patients.findIndex((p) => p.id === params.id)

  if (patientIndex === -1) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 })
  }

  patients[patientIndex] = {
    ...patients[patientIndex],
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(patients[patientIndex])
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const patientIndex = patients.findIndex((p) => p.id === params.id)

  if (patientIndex === -1) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 })
  }

  patients.splice(patientIndex, 1)

  return NextResponse.json({ message: "Patient deleted successfully" })
}
