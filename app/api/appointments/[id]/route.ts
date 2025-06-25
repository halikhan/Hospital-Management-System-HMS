import { type NextRequest, NextResponse } from "next/server"
import { appointments, type Appointment } from "../data"

// GET /api/appointments/:id – fetch a single appointment
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const appointment = appointments.find((a) => a.id === params.id)
  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
  }
  return NextResponse.json(appointment)
}

// PUT /api/appointments/:id – update appointment
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = (await req.json()) as Partial<Appointment>
  const idx = appointments.findIndex((a) => a.id === params.id)
  if (idx === -1) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
  }

  appointments[idx] = {
    ...appointments[idx],
    ...body,
    updatedAt: new Date().toISOString(),
  }
  return NextResponse.json(appointments[idx])
}

// DELETE /api/appointments/:id – delete appointment
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const idx = appointments.findIndex((a) => a.id === params.id)
  if (idx === -1) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
  }

  appointments.splice(idx, 1)
  return NextResponse.json({ message: "Appointment deleted successfully" })
}
