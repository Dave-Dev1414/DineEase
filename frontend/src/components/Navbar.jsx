import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative flex items-center justify-between px-6 py-5 md:px-10">
      <Link to="/" className="font-serif text-2xl font-medium tracking-tight">
        <span className="text-black">Dine</span><span className="text-red-600">Ease</span>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        <Link to="/" className="text-sm font-medium transition-colors duration-300 hover:text-red-600">Home</Link>
       <Link to="/discover" className="text-sm font-medium transition-colors duration-300 hover:text-red-600">Discover</Link>
        <Link to="/reserve" className="text-sm font-medium transition-colors duration-300 hover:text-red-600">Reserve</Link>
       <Link to="/order" className="text-sm font-medium transition-colors duration-300 hover:text-red-600">Order</Link>
       <Link to="/bookings" className="text-sm font-medium transition-colors duration-300 hover:text-red-600">Bookings</Link>
      </div>

      <Link to="/reserve" className="hidden bg-black px-5 py-3 text-sm font-semibold text-white md:block">
        Reserve a table
      </Link>

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
      <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Home</Link>
      <Link to="/discover" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Discover</Link>
      <Link to="/reserve" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Reserve</Link>
      <Link to="/order" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Order</Link>
      <Link to="/bookings" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Bookings</Link>
      <Link to="/reserve" onClick={() => setIsMenuOpen(false)} className="bg-black px-5 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-800">
        Reserve a table
      </Link>
    </div>
  </div>
)}
    </nav>
  )
}

export default Navbar