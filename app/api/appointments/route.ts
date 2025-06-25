import { type NextRequest, NextResponse } from "next/server"
import { appointments, type Appointment } from "./data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")
  const status = searchParams.get("status")
  const doctorId = searchParams.get("doctorId")

  let results = appointments

  if (date) results = results.filter((a) => a.date === date)
  if (status) results = results.filter((a) => a.status === status)
  if (doctorId) results = results.filter((a) => a.doctorId === doctorId)

  return NextResponse.json(results)
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Omit<Appointment, "id" | "createdAt" | "updatedAt">
  const newAppointment: Appointment = {
    id: `A${String(appointments.length + 1).padStart(3, "0")}`,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  appointments.push(newAppointment)
  return NextResponse.json(newAppointment, { status: 201 })
}
