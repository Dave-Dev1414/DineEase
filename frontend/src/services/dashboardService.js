const API_URL = "http://localhost/dineease/api"

export async function getDashboardData() {
  const response = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    credentials: "include"
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to load dashboard data.")
  }

  return data
}