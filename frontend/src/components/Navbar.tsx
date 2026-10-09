import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { label: "Home", to: "/" },
  { label: "Discover", to: "/discover" },
  { label: "Reserve", to: "/reserve" },
  { label: "Order", to: "/order" },
  { label: "Bookings", to: "/bookings" }
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname.replace(/\/+$/, "") || "/"

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#fffaf2]/95 px-5 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="DineEase home"
          className="flex shrink-0 items-center gap-3"
        >
          <span className="grid h-10 w-10 place-items-center rounded-[14px] rounded-bl-[4px] bg-red-600 font-serif text-xl font-semibold text-white">
            D
          </span>
          <span className="font-serif text-xl font-medium leading-none tracking-tight sm:text-2xl">
            <span className="text-black">Dine</span><span className="text-red-600">Ease</span>
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item.to) ? "page" : undefined}
              className={`group relative whitespace-nowrap py-2 text-[13px] font-semibold transition-colors duration-200 ${
                isActive(item.to) ? "text-[#171717]" : "text-[#75695e] hover:text-[#171717]"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-[width] duration-200 ${
                  isActive(item.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
          <Link
            to="/reserve"
            className="hidden items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.04em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_9px_22px_rgba(32,25,20,0.16)] sm:inline-flex"
          >
            Reserve a table <span aria-hidden="true">↗</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(open => !open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 text-xl transition-colors hover:border-red-600 hover:text-red-600 lg:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="dineease-mobile-navigation"
          >
            {isMenuOpen ? (
              <i className="bi bi-x-lg" aria-hidden="true" />
            ) : (
              <i className="bi bi-list" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="dineease-mobile-navigation"
          className="absolute left-0 right-0 top-full border-b border-black/10 bg-[#fffaf2] px-6 pb-6 pt-3 shadow-[0_15px_30px_rgba(32,25,20,0.08)] lg:hidden"
        >
          <div className="mx-auto flex max-w-[1600px] flex-col">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`border-b border-black/[0.06] py-3.5 text-sm font-semibold transition-colors hover:text-red-600 ${
                  isActive(item.to) ? "text-red-600" : "text-[#75695e]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/reserve"
              onClick={closeMenu}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Reserve a table <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
