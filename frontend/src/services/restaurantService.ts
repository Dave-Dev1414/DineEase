import type { Restaurant } from "../types/restaurant"

const API_URL = "http://localhost/dineease/api"

type RestaurantsResponse = {
  success: boolean
  data: {
    restaurants: Restaurant[]
  }
}

export async function getRestaurants(): Promise<RestaurantsResponse> {
  const response = await fetch(`${API_URL}/restaurants`, {
    method: "GET",
    credentials: "include"
  })

  const data: RestaurantsResponse = await response.json()

  if (!response.ok || !data.success) {
    throw new Error("Unable to load restaurants.")
  }

  return data
}