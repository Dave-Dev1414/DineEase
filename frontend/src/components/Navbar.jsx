import { useState } from "react"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative flex items-center justify-between px-6 py-5 md:px-10">
      <a href="/" className="font-serif text-2xl font-semibold">
        DineEase
      </a>

      <div className="hidden items-center gap-8 md:flex">
        <a href="/" className="text-sm font-medium">Home</a>
        <a href="/discover" className="text-sm font-medium">Discover</a>
        <a href="/reserve" className="text-sm font-medium">Reserve</a>
        <a href="/order" className="text-sm font-medium">Order</a>
        <a href="/bookings" className="text-sm font-medium">Bookings</a>
      </div>

      <a href="/reserve" className="hidden bg-black px-5 py-3 text-sm font-semibold text-white md:block">
        Reserve a table
      </a>

      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-2xl md:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-black/10 bg-[#fffaf2] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <a href="/" className="text-sm font-medium">Home</a>
            <a href="/discover" className="text-sm font-medium">Discover</a>
            <a href="/reserve" className="text-sm font-medium">Reserve</a>
            <a href="/order" className="text-sm font-medium">Order</a>
            <a href="/bookings" className="text-sm font-medium">Bookings</a>
            <a href="/reserve" className="bg-black px-5 py-3 text-center text-sm font-semibold text-white">
              Reserve a table
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar