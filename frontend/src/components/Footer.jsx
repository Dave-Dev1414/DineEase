import { Link } from "react-router-dom"
import { ArrowUpRight} from "lucide-react"
import { siInstagram, siGithub, siTiktok, siWhatsapp } from "simple-icons"

function SocialIcon({ icon, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="bg-black px-6 py-16 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="font-serif text-3xl font-medium tracking-tight">
              <span className="text-white">Dine</span>
              <span className="text-red-600">Ease</span>
            </Link>

            <p className="mt-6 max-w-md text-base leading-7 text-stone-300 md:text-lg">
              Discover restaurants, reserve tables, order your favourites,
              and help good food find another purpose instead of going to waste.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center border border-stone-700 text-stone-300 transition-colors duration-300 hover:border-red-600 hover:text-red-600"
              >
                <SocialIcon icon={siWhatsapp} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center border border-stone-700 text-stone-300 transition-colors duration-300 hover:border-red-600 hover:text-red-600"
              >
                <SocialIcon icon={siInstagram} />
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center border border-stone-700 text-stone-300 transition-colors duration-300 hover:border-red-600 hover:text-red-600"
              >
                <SocialIcon icon={siTiktok} />
              </a>

              <a
                href="https://github.com/Dave-Dev1414"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center border border-stone-700 text-stone-300 transition-colors duration-300 hover:border-red-600 hover:text-red-600"
              >
                <SocialIcon icon={siGithub} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Explore</h3>

            <div className="mt-5 flex flex-col gap-4">
              <Link to="/discover" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                Discover
              </Link>
              <Link to="/reserve" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                Reserve
              </Link>
              <Link to="/order" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                Order
              </Link>
              <Link to="/surplus" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                DineEase Surplus
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">DineEase</h3>

            <div className="mt-5 flex flex-col gap-4">
              <Link to="/partner" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                Partner with us
              </Link>
              <Link to="/about" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                About DineEase
              </Link>
              <Link to="/contact" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                Contact
              </Link>
              <Link to="/bookings" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                My bookings
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">For restaurants</h3>

            <div className="mt-5 flex flex-col gap-4">
              <Link to="/partner" className="inline-flex items-center gap-2 text-base text-stone-400 transition-colors duration-300 hover:text-white">
                Become a partner
                <ArrowUpRight size={17} />
              </Link>

              <Link to="/restaurant/login" className="text-base text-stone-400 transition-colors duration-300 hover:text-white">
                Restaurant login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-stone-800 pt-7">
          <div className="flex flex-col gap-5 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; 2026 DineEase. All rights reserved.
            </p>

            <div className="flex gap-6">
              <Link to="/privacy" className="transition-colors duration-300 hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="transition-colors duration-300 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer