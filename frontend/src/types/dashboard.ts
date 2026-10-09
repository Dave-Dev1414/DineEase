export type Dish = {
  id: number
  restaurant_id: number
  name: string
  description: string | null
  price: string | number
  image_url: string | null
  category: string | null
  is_available: boolean | 0 | 1 | "0" | "1"
  is_new: boolean | 0 | 1 | "0" | "1"
  created_at: string
  updated_at: string | null
  restaurant_name: string
}

export type DashboardSuccessResponse = {
  success: true
  data: {
    restaurants: unknown[]
    dishes: Dish[]
  }
}

export type DashboardErrorResponse = {
  success: false
  message?: string
}

export type DashboardApiResponse =
  | DashboardSuccessResponse
  | DashboardErrorResponse
