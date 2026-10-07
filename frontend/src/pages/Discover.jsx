import { useEffect, useMemo, useState } from "react"
import { Search, MapPin, ArrowUpRight } from "lucide-react"
import { getRestaurants } from "../services/restaurantService"
import { useNotification } from "../context/NotificationContext"

function Discover() {
  const { showNotification } = useNotification()
  const [restaurants, setRestaurants] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

useEffect(() => {
  async function loadRestaurants() {
    const startTime = Date.now()

    try {
      const data = await getRestaurants()
      setRestaurants(data.data.restaurants)
    } catch (error) {
      showNotification(
        "We couldn't load restaurants right now. Please try again."
      )
    } finally {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(600 - elapsed, 0)

      if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining))
      }

      setLoading(false)
    }
  }

  loadRestaurants()
}, [showNotification])

  const filteredRestaurants = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return restaurants

    return restaurants.filter(restaurant =>
      `${restaurant.name} ${restaurant.description} ${restaurant.city} ${restaurant.state}`
        .toLowerCase()
        .includes(query)
    )
  }, [search, restaurants])

  return (
    <main className="min-h-screen bg-[#fffaf2] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Discover
          </p>

          <div className="mt-3 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Find somewhere worth eating.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
                Explore verified restaurants on DineEase and find your next
                place to eat, reserve, or order from.
              </p>
            </div>

            <div className="relative w-full lg:w-[380px]">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
              />

              <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search restaurants"
                className="h-13 w-full rounded-full border border-black/10 bg-white pl-11 pr-5 outline-none transition focus:border-black"
              />
            </div>
          </div>
        </section>

        {loading ? (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(item => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-black/5 bg-white"
              >
                <div className="aspect-[4/3] animate-pulse bg-stone-200" />

                <div className="p-6">
                  <div className="h-7 w-3/5 animate-pulse rounded bg-stone-200" />

                  <div className="mt-3 h-4 w-2/5 animate-pulse rounded bg-stone-200" />

                  <div className="mt-5 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-stone-200" />
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                    <div className="h-4 w-1/4 animate-pulse rounded bg-stone-200" />

                    <div className="h-10 w-28 animate-pulse rounded bg-stone-200" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : filteredRestaurants.length === 0 ? (
          <section className="rounded-2xl border border-black/5 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#171717]">
              No restaurants found
            </h2>

            <p className="mt-2 text-black/50">
              Try searching for another restaurant or location.
            </p>
          </section>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-black/50">
                {filteredRestaurants.length} restaurant
                {filteredRestaurants.length !== 1 ? "s" : ""}
              </p>
            </div>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRestaurants.map(restaurant => (
                <article
                  key={restaurant.id}
                  className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] shadow-sm">
                      Verified
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#171717]">
                          {restaurant.name}
                        </h2>

                        <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
                          <MapPin size={15} />

                          <span>
                            {restaurant.city}, {restaurant.state}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={19}
                        className="shrink-0 text-black/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-stone-600">
                      {restaurant.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                      <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                        {restaurant.business_scale}
                      </span>

                      <button
                        type="button"
                        className="bg-black px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-600"
                      >
                        View restaurant
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  )
}

export default Discover