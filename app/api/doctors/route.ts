import { type NextRequest, NextResponse } from "next/server"
import { doctors } from "./data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const department = searchParams.get("department")

  let filteredDoctors = doctors

  if (search) {
    filteredDoctors = filteredDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (department) {
    filteredDoctors = filteredDoctors.filter((doctor) => doctor.department === department)
  }

  return NextResponse.json(filteredDoctors)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newDoctor = {
    id: `D${String(doctors.length + 1).padStart(3, "0")}`,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  doctors.push(newDoctor)

  return NextResponse.json(newDoctor, { status: 201 })
}
