import { ArrowUpRight, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { SiGoogle, SiApple } from "@icons-pack/react-simple-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DineEaseNotification from "../components/DineEaseNotification"

function Login() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setNotification("Please enter your email address.")
      return
    }

    if (!password) {
      setNotification("Please enter your password.")
      return
    }

    setNotification("Login will be connected to your account soon.")
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#171717] overflow-hidden">

      <DineEaseNotification
        message={notification}
        onClose={() => setNotification("")}
      />



      <section className="min-h-screen grid lg:grid-cols-[0.9fr_1.1fr] items-center px-6 md:px-10 lg:px-16 py-12">

        <div className="max-w-xl mx-auto lg:mx-0 w-full z-10">

          <p className="font-[DM_Sans] text-xs tracking-[0.35em] text-[#9b7b62] uppercase mb-5">
            Welcome back
          </p>

          <h1 className="font-[Bodoni_Moda] text-6xl md:text-7xl xl:text-8xl leading-[0.88] tracking-tight">
            Good
            <br />
            Food.
            <br />
            Great
            <br />
            <span className="text-red-600">Moments.</span>
          </h1>

          <p className="font-[DM_Sans] text-gray-600 text-base md:text-lg leading-7 max-w-md mt-8">
            Sign in to discover restaurants, manage your reservations, order
            your favourites, and keep your dining experiences in one place.
          </p>

          <div className="mt-10 space-y-5 font-[DM_Sans]">

            <div className="flex items-center gap-4">
              <span className="text-2xl">♜</span>
              <div>
                <p className="font-semibold">Discover</p>
                <p className="text-sm text-gray-500">
                  Restaurants worth visiting
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl text-red-600">♡</span>
              <div>
                <p className="font-semibold">Reserve</p>
                <p className="text-sm text-gray-500">
                  Tables without the hassle
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">♧</span>
              <div>
                <p className="font-semibold">Enjoy</p>
                <p className="text-sm text-gray-500">
                  More from every meal
                </p>
              </div>
            </div>

          </div>

          <p className="font-[Bodoni_Moda] italic text-4xl text-red-600 mt-12">
            More Than A Meal
          </p>

        </div>

        <div className="relative flex items-center justify-center min-h-[650px]">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),transparent_65%)]"></div>

          <div className="relative z-10 w-full max-w-xl">

            <div className="bg-white/55 backdrop-blur-xl border border-white/80 shadow-[0_20px_70px_rgba(100,70,40,0.12)] rounded-3xl p-7 md:p-10">

              <h2 className="font-[Bodoni_Moda] text-4xl md:text-5xl leading-tight">
                Welcome back
              </h2>

              <p className="font-[DM_Sans] text-gray-600 mt-2 mb-8">
                Sign in to continue your DineEase journey.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/45 border border-gray-300 rounded-xl pl-12 pr-4 py-4 font-[DM_Sans] outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-white/45 border border-gray-300 rounded-xl pl-12 pr-12 py-4 font-[DM_Sans] outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setNotification("Password recovery will be available soon.")}
                    className="font-[DM_Sans] text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-[DM_Sans] font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  Log in
                  <ArrowUpRight size={19} />
                </button>

              </form>

              <div className="flex items-center gap-4 my-7">
                <div className="h-px bg-gray-300 flex-1"></div>

                <span className="font-[DM_Sans] text-sm text-gray-500">
                  or continue with
                </span>

                <div className="h-px bg-gray-300 flex-1"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setNotification("Google sign in will be available soon.")}
                  className="border border-gray-300 bg-white/40 py-3 rounded-xl font-[DM_Sans] font-semibold flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white hover:border-red-600 active:bg-red-700 transition-all duration-200"
                >
                  <SiGoogle size={18} />
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => setNotification("Apple sign in will be available soon.")}
                  className="border border-gray-300 bg-white/40 py-3 rounded-xl font-[DM_Sans] font-semibold flex items-center justify-center gap-3 hover:bg-black hover:text-white hover:border-black active:bg-gray-800 transition-all duration-200"
                >
                  <SiApple size={18} />
                  Apple
                </button>

              </div>

              <p className="font-[DM_Sans] text-sm text-gray-500 text-center leading-5 mt-7">
                New to DineEase?
                {" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  Create an account
                </button>
              </p>

            </div>

          </div>

          <div className="absolute right-0 xl:right-4 top-12 w-40 h-72 pointer-events-none hidden xl:block">
            <div className="w-full h-full rounded-full bg-red-600/5"></div>
          </div>

        </div>

      </section>

    </main>
  )
}

export default Login