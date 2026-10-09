import type { DashboardApiResponse, DashboardSuccessResponse } from "../types/dashboard"

const API_URL = "http://localhost/dineease/api"

export async function getDashboardData(): Promise<DashboardSuccessResponse> {
  const response = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    credentials: "include"
  })

  const data = await response.json() as DashboardApiResponse

  if (!response.ok || !data.success) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : "Unable to load dashboard data."
    )
  }

  return data
}
