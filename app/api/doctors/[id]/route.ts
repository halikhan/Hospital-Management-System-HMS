import { type NextRequest, NextResponse } from "next/server"
import { doctors, type Doctor } from "../data"

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const doctor = doctors.find((d) => d.id === params.id)
  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
  }
  return NextResponse.json(doctor)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = (await request.json()) as Partial<Doctor>
  const index = doctors.findIndex((d) => d.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
  }

  doctors[index] = {
    ...doctors[index],
    ...body,
    updatedAt: new Date().toISOString(),
  }
  return NextResponse.json(doctors[index])
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const index = doctors.findIndex((d) => d.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
  }

  doctors.splice(index, 1)
  return NextResponse.json({ message: "Doctor deleted successfully" })
}
