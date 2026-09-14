import { ArrowUpRight, Eye, EyeOff, Mail, Lock, UserRound } from "lucide-react"
import { SiGoogle, SiApple } from "@icons-pack/react-simple-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DineEaseNotification from "../components/DineEaseNotification"

function Signup() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [notification, setNotification] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setNotification("Please enter your name.")
      return
    }

    if (!email.trim()) {
      setNotification("Please enter your email address.")
      return
    }

    if (!password) {
      setNotification("Please enter a password.")
      return
    }

    if (password.length < 8) {
      setNotification("Your password must be at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setNotification("Passwords do not match.")
      return
    }

    const response = await fetch(
      "http://localhost/dineease/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    )

    const data = await response.json()

    if (data.success) {
  navigate(`/check-email?email=${encodeURIComponent(email)}`)
  return
}

setNotification(data.message || "Something went wrong. Please try again.")
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#171717] overflow-hidden">

      <DineEaseNotification
        message={notification}
        onClose={() => setNotification("")}
      />

      <header className="absolute top-0 left-0 w-full z-20 px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="font-[Bodoni_Moda] text-3xl">
          <span className="text-black">Dine</span>
          <span className="text-red-600">Ease</span>
        </div>

        <div className="flex items-center gap-4 font-[DM_Sans] text-sm">
          <span className="hidden sm:block text-gray-600">
            Already have an account?
          </span>

          <button
            type="button"
            className="border border-red-600 text-red-600 px-5 py-2.5 hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            Log in
          </button>
        </div>
      </header>

      <section className="min-h-screen grid lg:grid-cols-[0.9fr_1.1fr] items-center px-6 md:px-10 lg:px-16 pt-28 pb-12">

        <div className="max-w-xl mx-auto lg:mx-0 w-full z-10">

          <p className="font-[DM_Sans] text-xs tracking-[0.35em] text-[#9b7b62] uppercase mb-5">
            Good food · Brighter days
          </p>

          <h1 className="font-[Bodoni_Moda] text-6xl md:text-7xl xl:text-8xl leading-[0.88] tracking-tight">
            Great
            <br />
            Food.
            <br />
            Greater
            <br />
            <span className="text-red-600">Stories.</span>
          </h1>

          <p className="font-[DM_Sans] text-gray-600 text-base md:text-lg leading-7 max-w-md mt-8">
            Create your account and become part of a community that loves to
            dine, discover, and share unforgettable food experiences.
          </p>

          <div className="mt-10 space-y-5 font-[DM_Sans]">

            <div className="flex items-center gap-4">
              <span className="text-2xl">♜</span>
              <div>
                <p className="font-semibold">Discover</p>
                <p className="text-sm text-gray-500">Amazing restaurants</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl text-red-600">♡</span>
              <div>
                <p className="font-semibold">Save</p>
                <p className="text-sm text-gray-500">Your favourites</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">♧</span>
              <div>
                <p className="font-semibold">Share</p>
                <p className="text-sm text-gray-500">
                  Your dining experiences
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
                Create your account
              </h2>

              <p className="font-[DM_Sans] text-gray-600 mt-2 mb-8">
                Start your DineEase journey today.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="relative">
                  <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/45 border border-gray-300 rounded-xl pl-12 pr-4 py-4 font-[DM_Sans] outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
                  />
                </div>

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
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/45 border border-gray-300 rounded-xl pl-12 pr-12 py-4 font-[DM_Sans] outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-[DM_Sans] font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  Create account
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
                  className="border border-gray-300 bg-white/40 py-3 rounded-xl font-[DM_Sans] font-semibold flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white hover:border-red-600 active:bg-red-700 transition-all duration-200"
                >
                  <SiGoogle size={18} />
                  Google
                </button>

                <button
                  type="button"
                  className="border border-gray-300 bg-white/40 py-3 rounded-xl font-[DM_Sans] font-semibold flex items-center justify-center gap-3 hover:bg-black hover:text-white hover:border-black active:bg-gray-800 transition-all duration-200"
                >
                  <SiApple size={18} />
                  Apple
                </button>

              </div>

              <p className="font-[DM_Sans] text-xs text-gray-500 text-center leading-5 mt-7">
                By creating an account, you agree to our
                <br />
                <u>Terms of Service</u> and <u>Privacy Policy</u>.
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

export default Signup