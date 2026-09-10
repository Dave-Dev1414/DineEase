import { useEffect, useRef, useState } from "react"

function Home() {
  const crossRef = useRef(null)
  const [crossVisible, setCrossVisible] = useState(false)
  const restaurantsRef = useRef(null)
const [restaurantsVisible, setRestaurantsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCrossVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (crossRef.current) {
      observer.observe(crossRef.current)
    }
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setRestaurantsVisible(true)
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  if (restaurantsRef.current) {
    observer.observe(restaurantsRef.current)
  }
  return () => observer.disconnect()
}, [])
  return (
    <main>
      <section className="px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-5 text-base font-medium uppercase tracking-[0.22em] text-red-600">
              Dine. Order. Reserve. Rescue.
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Great food.
              <br />
              Better experiences.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-stone-600 md:text-lg">
              Discover restaurants, reserve your table, order your favourites,
              and help good food find another purpose instead of going to waste.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/discover"
                className="bg-black px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Discover restaurants
              </a>

              <a
                href="/reserve"
                className="border border-black px-7 py-4 text-center text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                Reserve a table
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-stone-200 sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85"
                alt="A beautifully prepared restaurant dish"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute bottom-5 left-5 bg-white p-5 shadow-lg sm:bottom-8 sm:left-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
                Loved by diners
              </p>
              <p className="mt-1 font-serif text-3xl font-semibold">
                4.9/5
              </p>
            </div>

            <div className="absolute right-5 top-5 bg-white p-5 shadow-lg sm:right-8 sm:top-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
                Restaurants
              </p>
              <p className="mt-1 text-sm font-semibold">
                Near you
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={crossRef}  className="border-t border-black/10 px-6 py-20 md:px-10 md:py-28">
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          One platform
        </p>

        <h2 className="mt-4 max-w-lg font-serif text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          Everything you need to dine better.
        </h2>
      </div>

      <div className="grid gap-px bg-black/10 sm:grid-cols-2">
        <article className={`reveal-card ${crossVisible ? "visible" : ""} bg-[#fffaf2] p-7 md:p-9 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-lg`}>
          <span className="text-sm font-semibold text-red-600">01</span>
          <h3 className="mt-8 font-serif text-3xl font-semibold">
            Discover
          </h3>
          <p className="mt-4 leading-7 text-stone-600">
            Find restaurants, explore menus, discover new places, and choose
            somewhere that fits the moment.
          </p>
        </article>

        <article className={`reveal-card ${crossVisible ? "visible" : ""} bg-[#fffaf2] p-7 md:p-9 transition-all duration-100 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-lg`}>
          <span className="text-sm font-semibold text-red-600">02</span>
          <h3 className="mt-8 font-serif text-3xl font-semibold">
            Reserve
          </h3>
          <p className="mt-4 leading-7 text-stone-600">
            Book a table without the back-and-forth. Keep your reservations
            organised in one place.
          </p>
        </article>

        <article className={`reveal-card ${crossVisible ? "visible" : ""} bg-[#fffaf2] p-7 md:p-9 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-lg`}>
          <span className="text-sm font-semibold text-red-600">03</span>
          <h3 className="mt-8 font-serif text-3xl font-semibold">
            Order
          </h3>
          <p className="mt-4 leading-7 text-stone-600">
            Order directly from restaurants and follow your order from
            confirmation to completion.
          </p>
        </article>

        <article className={`reveal-card ${crossVisible ? "visible" : ""} bg-[#fffaf2] p-7 md:p-9 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-lg`}>
          <span className="text-sm font-semibold text-red-600">04</span>
          <h3 className="mt-8 font-serif text-3xl font-semibold">
            Rescue
          </h3>
          <p className="mt-4 leading-7 text-stone-600">
            Give surplus food another chance through discounts, donations,
            and smarter food management.
          </p>
        </article>
      </div>
    </div>
  </div>
</section>
   
   <section 
   ref={restaurantsRef}
   className="px-6 py-20 md:px-10 md:py-28">
  <div className="mx-auto max-w-7xl">
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="reveal">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600 md:text-base">
          Discover your next table
        </p>

        <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          Places worth making plans for.
        </h2>
      </div>

      <a
        href="/discover"
        className="group inline-flex w-fit items-center gap-3 text-base font-semibold transition-all duration-300 hover:gap-5"
      >
        Explore all restaurants
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article className={`reveal-card ${restaurantsVisible ? "visible" : ""} group overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}>
  <div className="aspect-[4/3] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85"
            alt="Elegant restaurant interior"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-semibold">
              The Ember Room
            </h3>

            <span className="text-base font-semibold text-red-600">
              4.9
            </span>
          </div>

          <p className="mt-2 text-base text-stone-600">
            Contemporary dining · Lagos
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
            <span className="text-sm font-medium text-stone-500">
              ₦₦₦
            </span>

            <a
              href="/reserve"
              className="bg-black px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
            >
              Reserve
            </a>
          </div>
        </div>
      </article>

      <article className={`reveal-card ${restaurantsVisible ? "visible" : ""} group overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}>
  <div className="aspect-[4/3] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85"
            alt="Restaurant dining area"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-semibold">
              Maison 24
            </h3>

            <span className="text-base font-semibold text-red-600">
              4.8
            </span>
          </div>

          <p className="mt-2 text-base text-stone-600">
            Modern Nigerian · Lagos
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
            <span className="text-sm font-medium text-stone-500">
              ₦₦
            </span>

            <a
              href="/reserve"
              className="bg-black px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
            >
              Reserve
            </a>
          </div>
        </div>
      </article>

      <article className={`reveal-card ${restaurantsVisible ? "visible" : ""} group overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}>
  <div className="aspect-[4/3] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85"
            alt="Restaurant table with food"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-semibold">
              Olive & Stone
            </h3>

            <span className="text-base font-semibold text-red-600">
              4.7
            </span>
          </div>

          <p className="mt-2 text-base text-stone-600">
            European fusion · Lagos
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
            <span className="text-sm font-medium text-stone-500">
              ₦₦ₙ
            </span>

            <a
              href="/reserve"
              className="bg-black px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
            >
              Reserve
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>

   <section className="border-t border-black/10 px-6 py-20 md:px-10 md:py-28">
  <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
    <div>
      <p className="text-base font-semibold uppercase tracking-[0.2em] text-red-600 md:text-lg">
        DineEase Surplus
      </p>
      <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
        Good food shouldn't go to waste.
      </h2>
      <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 md:text-lg md:leading-8">
        Restaurants can turn surplus food into extra revenue, offer it at a
        discount, or connect it with approved organisations that can put it to
        good use.
      </p>
      <a
        href="/discover"
        className="mt-8 inline-flex bg-black px-7 py-4 text-base font-semibold text-white transition-all duration-500 hover:bg-red-600"
      >
        Explore surplus food
      </a>
    </div>

    <div className="relative">
      <div className="aspect-[4/3] overflow-hidden bg-stone-200">
        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
          alt="Fresh food prepared for serving"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="absolute bottom-5 left-5 max-w-xs bg-white p-5 shadow-lg sm:bottom-8 sm:left-8">
        <p className="text-base font-semibold uppercase tracking-[0.15em] text-red-600">
          Rescue more
        </p>
        <p className="mt-2 font-serif text-2xl font-semibold">
          Discount. Donate. Repeat.
        </p>
      </div>
    </div>
  </div>
</section>

   <section className="border-t border-black/10 px-6 py-20 md:px-10 md:py-28">
  <div className="mx-auto max-w-7xl">
    <div className="max-w-3xl">
      <p className="text-base font-semibold uppercase tracking-[0.2em] text-red-600 md:text-lg">
        How it works
      </p>
      <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
        From finding a place to enjoying the meal.
      </h2>
    </div>

    <div className="mt-14 grid gap-px bg-black/10 md:grid-cols-3">
      <article className="bg-[#fffaf2] p-7 md:p-10">
        <span className="font-serif text-5xl font-semibold text-red-600">01</span>
        <h3 className="mt-8 font-serif text-3xl font-semibold">
          Find
        </h3>
        <p className="mt-4 text-base leading-7 text-stone-600 md:text-lg">
          Discover restaurants, browse menus, and find something that fits
          your taste and plans.
        </p>
      </article>

      <article className="bg-[#fffaf2] p-7 md:p-10">
        <span className="font-serif text-5xl font-semibold text-red-600">02</span>
        <h3 className="mt-8 font-serif text-3xl font-semibold">
          Choose
        </h3>
        <p className="mt-4 text-base leading-7 text-stone-600 md:text-lg">
          Reserve your table or order directly from the restaurant without
          unnecessary back-and-forth.
        </p>
      </article>

      <article className="bg-[#fffaf2] p-7 md:p-10">
        <span className="font-serif text-5xl font-semibold text-red-600">03</span>
        <h3 className="mt-8 font-serif text-3xl font-semibold">
          Enjoy
        </h3>
        <p className="mt-4 text-base leading-7 text-stone-600 md:text-lg">
          Keep track of your reservations and orders while DineEase takes
          care of the details.
        </p>
      </article>
    </div>
  </div>
</section>
    </main>
  )
}

export default Home