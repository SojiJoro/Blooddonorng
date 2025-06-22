import { NextResponse } from "next/server"

export async function GET() {
  const dashboardData = {
    totalDonors: 120,
    totalRecipients: 45,
    activeDonations: 10,
  }
  return NextResponse.json(dashboardData)
}
