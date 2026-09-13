import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const [message, setMessage] = useState("Verifying your email...")
  const [status, setStatus] = useState("loading")
  const verificationStarted = useRef(false)

  useEffect(() => {
    if (!token || verificationStarted.current) {
      if (!token) {
        setStatus("error")
        setMessage("No verification token was provided.")
      }
      return
    }

    verificationStarted.current = true

    const startedAt = Date.now()

    fetch(
      `http://localhost/dineease/api/users?token=${encodeURIComponent(token)}`
    )
      .then(response => response.json())
      .then(data => {
        const elapsed = Date.now() - startedAt
        const remaining = Math.max(4000 - elapsed, 0)

        setTimeout(() => {
          setMessage(data.message)
          setStatus(data.success ? "success" : "error")
        }, remaining)
      })
      .catch(() => {
        const elapsed = Date.now() - startedAt
        const remaining = Math.max(4000 - elapsed, 0)

        setTimeout(() => {
          setStatus("error")
          setMessage("Something went wrong while verifying your email.")
        }, remaining)
      })
  }, [token])

  return (
    <main className="min-h-screen bg-[#fffaf2] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">

        <p className="font-[DM_Sans] text-sm font-semibold tracking-[0.25em] uppercase mb-10">
          DineEase
        </p>

        {status === "loading" && (
          <>
            <div className="flex justify-center mb-10">
              <div className="relative w-16 h-16 animate-spin">
                <div className="absolute inset-0 rounded-full border-[4px] border-transparent border-t-red-600 border-l-red-600"></div>
                <div className="absolute inset-2 rounded-full border-[4px] border-transparent border-b-red-600 border-r-red-600"></div>
              </div>
            </div>

            <h1 className="font-[Bodoni_Moda] text-5xl md:text-6xl leading-tight mb-5">
              Verifying your email account
            </h1>

            <p className="font-[DM_Sans] text-lg text-gray-600 leading-8">
              Should only take a moment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="font-[Bodoni_Moda] text-5xl md:text-6xl leading-tight mb-6">
              Email Account verified
            </h1>

            <p className="font-[DM_Sans] text-lg text-gray-600 leading-8 mb-9">
              {message}
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:bg-red-800 text-white px-8 py-4 font-[DM_Sans] font-semibold transition-colors duration-200"
            >
              Continue to DineEase
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-[Bodoni_Moda] text-5xl md:text-6xl leading-tight mb-6">
              Verification failed
            </h1>

            <p className="font-[DM_Sans] text-lg text-gray-600 leading-8 mb-9">
              {message}
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:bg-red-800 text-white px-8 py-4 font-[DM_Sans] font-semibold transition-colors duration-200"
            >
              Request a new email
            </button>
          </>
        )}

      </div>
    </main>
  )
}

export default VerifyEmail