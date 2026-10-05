import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Search, ArrowUpRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNotification } from "../context/NotificationContext"
import { getDashboardData } from "../services/dashboardService"

const getDishAgeInDays = dish => {
  const createdAt = new Date(dish.created_at)
  const now = new Date()
  return (now - createdAt) / (1000 * 60 * 60 * 24)
}

const isRecentlyAdded = dish => {
  const ageInDays = getDishAgeInDays(dish)
  return ageInDays >= 0 && ageInDays < 14
}

const getNewDishLabel = dish => {
  const ageInDays = Math.floor(getDishAgeInDays(dish))
  if (ageInDays < 1) return "NEW"
  return `Added ${ageInDays} day${ageInDays === 1 ? "" : "s"} ago`
}

function DishCarousel({ title, items }) {
  const carouselRef = useRef(null)
  const scroll = direction => {
    carouselRef.current?.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth"
    })
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-[#171717]">
          {title}
        </h2>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-[#171717] hover:text-white transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-[#171717] hover:text-white transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.length === 0 ? (
          <div className="w-full bg-white border border-black/5 rounded-2xl p-8">
            <p className="text-black/50">
              No dishes available yet.
            </p>
          </div>
        ) : (
          items.map(dish => (
            <article
              key={dish.id}
              className="relative min-w-[260px] sm:min-w-[300px] bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition"
            >
              {isRecentlyAdded(dish) && (
                <span className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#c92a2a] text-white text-[11px] font-bold tracking-wider shadow-sm">
                  {getNewDishLabel(dish)}
                </span>
              )}

              <div className="h-56 overflow-hidden">
                <img
                  src={dish.image_url}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg text-[#171717]">
                      {dish.name}
                    </h3>

                    <p className="text-sm text-black/50 mt-1">
                      {dish.restaurant_name}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-black/40 shrink-0"
                  />
                </div>

                <p className="font-semibold text-[#c92a2a] mt-4">
                  ₦{Number(dish.price).toLocaleString()}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

function Dashboard() {
  const { user } = useAuth()
  const { showNotification } = useNotification()
  const [search, setSearch] = useState("")
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function loadDashboard() {
    try {
      const data = await getDashboardData()
      setDishes(data.data.dishes)
    } catch (error) {
      showNotification(
        "We couldn't load your dashboard right now. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  loadDashboard()
}, [showNotification])

  const availableDishes = dishes.filter(dish => dish.is_available)

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return availableDishes

    return availableDishes.filter(dish =>
      `${dish.name} ${dish.restaurant_name}`
        .toLowerCase()
        .includes(query)
    )
  }, [search, dishes])

  const popularDishes = filteredDishes.slice(0, 4)

  const newDishes = availableDishes
    .filter(isRecentlyAdded)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <main className="min-h-screen bg-[#fffaf2] px-5 sm:px-8 lg:px-12 py-10">
      <style>{`
        @keyframes dineease-orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dineease-orbit-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .dineease-orbit {
          animation: dineease-orbit 14s linear infinite;
        }

        .dineease-orbit-reverse {
          animation: dineease-orbit-reverse 10s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-black/5 px-6 sm:px-10 py-10 mb-12">
          <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full border-[18px] border-[#c92a2a]/10 dineease-orbit" />
          <div className="absolute right-20 bottom-[-70px] w-32 h-32 rounded-full border-[12px] border-black/[0.04] dineease-orbit-reverse" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-sm text-black/50 mb-2">
                Your dining space
              </p>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#171717]">
                Good to see you, {user?.name}
              </h1>

              <p className="text-black/50 mt-3">
                Discover something worth eating today.
              </p>
            </div>

            <div className="relative w-full lg:w-[360px]">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
              />

              <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search dishes or restaurants"
                className="w-full h-12 pl-11 pr-4 rounded-full bg-[#fffaf2] border border-black/10 outline-none focus:border-[#171717] transition"
              />
            </div>
          </div>
        </div>

        {search && (
          <p className="text-sm text-black/50 mb-6">
            {filteredDishes.length} result
            {filteredDishes.length !== 1 ? "s" : ""} for "{search}"
          </p>
        )}

        <DishCarousel
          title={search ? "Search results" : "Popular near you"}
          items={search ? filteredDishes : popularDishes}
        />

        {!search && (
          <>
            <section className="grid lg:grid-cols-2 gap-5 mb-12">
              <div className="bg-white border border-black/5 rounded-2xl p-7">
                <p className="text-sm text-black/50 mb-2">
                  Your next reservation
                </p>

                <h2 className="text-2xl font-semibold text-[#171717]">
                  Nothing booked yet
                </h2>

                <p className="text-black/50 mt-2 max-w-md">
                  Find a restaurant and reserve a table for your next meal.
                </p>

                <button
                  type="button"
                  className="mt-6 px-5 py-3 bg-[#171717] text-white rounded-full font-medium hover:bg-[#c92a2a] transition"
                >
                  Explore restaurants
                </button>
              </div>

              <div className="bg-white border border-black/5 rounded-2xl p-7">
                <p className="text-sm text-black/50 mb-2">
                  Recent activity
                </p>

                <h2 className="text-2xl font-semibold text-[#171717]">
                  Your activity will appear here
                </h2>

                <p className="text-black/50 mt-2">
                  Reservations, orders and dining history will show up here.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-sm text-black/50 mb-1">
                    Fresh from restaurants
                  </p>

                  <h2 className="text-2xl font-semibold text-[#171717]">
                    New on DineEase
                  </h2>
                </div>

                <span className="text-sm text-[#c92a2a] font-medium">
                  Recently added
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {newDishes.length === 0 ? (
                  <div className="sm:col-span-2 lg:col-span-4 bg-white border border-black/5 rounded-2xl p-8">
                    <p className="text-black/50">
                      There are no dishes yet.
                    </p>
                  </div>
                ) : (
                  newDishes.map(dish => (
                    <article
                      key={dish.id}
                      className="relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition"
                    >
                      {isRecentlyAdded(dish) && (
                        <span className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#c92a2a] text-white text-[11px] font-bold tracking-wider shadow-sm">
                          {getNewDishLabel(dish)}
                        </span>
                      )}

                      <div className="h-52 overflow-hidden">
                        <img
                          src={dish.image_url}
                          alt={dish.name}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />
                      </div>

                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-[#171717]">
                          {dish.name}
                        </h3>

                        <p className="text-sm text-black/50 mt-1">
                          {dish.restaurant_name}
                        </p>

                        <p className="font-semibold text-[#c92a2a] mt-4">
                          ₦{Number(dish.price).toLocaleString()}
                        </p>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>

            <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5 pb-10">
              <div className="bg-[#171717] rounded-2xl p-8 text-white min-h-[260px] flex flex-col justify-between">
                <div>
                  <p className="text-sm text-white/50 mb-2">
                    Discover something different
                  </p>

                  <h2 className="text-3xl font-semibold max-w-lg">
                    Your next favourite meal might be closer than you think.
                  </h2>
                </div>

                <button
                  type="button"
                  className="w-fit mt-8 px-5 py-3 bg-white text-[#171717] rounded-full font-medium hover:bg-[#c92a2a] hover:text-white transition"
                >
                  Discover restaurants
                </button>
              </div>

              <div className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-black/50 mb-2">
                    Coming to DineEase
                  </p>

                  <h2 className="text-2xl font-semibold text-[#171717]">
                    More ways to discover food.
                  </h2>

                  <p className="text-black/50 mt-3">
                    Personalized recommendations, restaurant offers and more
                    will appear here as your dining activity grows.
                  </p>
                </div>

                <div className="w-12 h-1 bg-[#c92a2a] mt-8 rounded-full" />
              </div>
            </section>
          </>
        )}

        {search && filteredDishes.length === 0 && (
          <div className="bg-white border border-black/5 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-semibold text-[#171717]">
              No dishes found
            </h2>

            <p className="text-black/50 mt-2">
              Try another dish or restaurant name.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Dashboard