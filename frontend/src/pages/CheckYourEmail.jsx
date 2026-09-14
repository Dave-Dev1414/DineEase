import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

function CheckYourEmail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const email = searchParams.get("email") || ""

  const [seconds, setSeconds] = useState(60)
  const [resending, setResending] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (seconds <= 0) return

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds])

  const handleResend = async () => {
    if (seconds > 0 || resending || !email) return

    setResending(true)
    setMessage("")

    try {
      const response = await fetch(
        "http://localhost/dineease/api/users?action=resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email
          })
        }
      )

      const data = await response.json()

      if (data.success) {
        setMessage("A new verification email has been sent.")
        setSeconds(60)
      } else {
        setMessage(data.message || "Unable to resend verification email.")
      }
    } catch (error) {
      console.error("Resend verification error:", error)
      setMessage("Unable to connect to DineEase. Please try again.")
    } finally {
      setResending(false)
    }
  }

  const maskEmail = email => {
    if (!email) return ""

    const [username, domain] = email.split("@")

    if (!username || !domain) return email

    const visibleCharacters = Math.min(2, username.length)

    return `${username.slice(0, visibleCharacters)}•••@${domain}`
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">

        <p className="font-[DM_Sans] text-sm font-semibold tracking-[0.25em] uppercase mb-10">
          DineEase
        </p>

        <div className="flex justify-center mb-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border border-red-600/20 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border border-red-600/30 animate-[pulse_2s_ease-in-out_infinite]"></div>
            <div className="absolute inset-5 rounded-full bg-red-600 animate-[pulse_2s_ease-in-out_infinite]"></div>
          </div>
        </div>

        <h1 className="font-[Bodoni_Moda] text-5xl md:text-6xl leading-tight mb-6">
          Check your email
        </h1>

        <p className="font-[DM_Sans] text-lg text-gray-600 leading-8 mb-3">
          We've sent a verification link to
        </p>

        <p className="font-[DM_Sans] font-semibold text-black mb-8 break-all">
          {maskEmail(email)}
        </p>

        <p className="font-[DM_Sans] text-sm text-gray-500 leading-7 max-w-md mx-auto mb-8">
          Click the link in the email to verify your email address and
          continue with DineEase.
        </p>

        {message && (
          <p className="font-[DM_Sans] text-sm text-gray-600 leading-6 mb-6">
            {message}
          </p>
        )}

        {seconds > 0 ? (
          <p className="font-[DM_Sans] text-sm text-gray-500">
            Didn't receive the email? Resend available in{" "}
            <span className="font-semibold text-black">
              0:{seconds.toString().padStart(2, "0")}
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 font-[DM_Sans] font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            {resending ? "Sending..." : "Resend verification email"}
          </button>
        )}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="block mx-auto mt-6 font-[DM_Sans] text-sm font-semibold text-gray-600 hover:text-black transition-colors duration-200"
        >
          Back to DineEase
        </button>

      </div>
    </main>
  )
}

export default CheckYourEmail