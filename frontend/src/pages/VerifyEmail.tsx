import { useEffect, useRef, useState, type FormEvent } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

type VerificationResponse = {
  success: boolean
  message: string
}

type ResendVerificationResponse = {
  success: boolean
  message?: string
}

type VerificationStatus = "loading" | "success" | "error"

function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const [message, setMessage] = useState("Verifying your email...")
  const [status, setStatus] = useState<VerificationStatus>("loading")
  const [email, setEmail] = useState("")
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState("")
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
      .then(response => response.json() as Promise<VerificationResponse>)
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

  const handleResend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (resending || !email.trim()) return

    setResending(true)
    setResendMessage("")

    try {
      const response = await fetch(
        "http://localhost/dineease/api/users?action=resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email.trim() })
        }
      )

      const data = await response.json() as ResendVerificationResponse

      if (!response.ok || !data.success) {
        setResendMessage(
          data.message || "Unable to send a new verification email. Please try again."
        )
        return
      }

      navigate(`/check-email?email=${encodeURIComponent(email.trim())}`, {
        state: { message: "A new verification email has been sent." }
      })
    } catch (error) {
      console.error("Resend verification error:", error)
      setResendMessage("Unable to connect to DineEase. Please try again.")
    } finally {
      setResending(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf2] px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <p className="mb-10 font-[DM_Sans] text-sm font-semibold uppercase tracking-[0.25em]">
          DineEase
        </p>

        {status === "loading" && (
          <>
            <div className="mb-10 flex justify-center">
              <div className="relative h-16 w-16 animate-spin">
                <div className="absolute inset-0 rounded-full border-[4px] border-transparent border-l-red-600 border-t-red-600" />
                <div className="absolute inset-2 rounded-full border-[4px] border-transparent border-b-red-600 border-r-red-600" />
              </div>
            </div>

            <h1 className="mb-5 font-[Bodoni_Moda] text-5xl leading-tight md:text-6xl">
              Verifying your email account
            </h1>

            <p className="font-[DM_Sans] text-lg leading-8 text-gray-600">
              Should only take a moment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="mb-6 font-[Bodoni_Moda] text-5xl leading-tight md:text-6xl">
              Email account verified
            </h1>

            <p className="mb-9 font-[DM_Sans] text-lg leading-8 text-gray-600">
              {message}
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="bg-red-600 px-8 py-4 font-[DM_Sans] font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:bg-red-800"
            >
              Continue to login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="mb-6 font-[Bodoni_Moda] text-5xl leading-tight md:text-6xl">
              Verification failed
            </h1>

            <p className="mb-8 font-[DM_Sans] text-lg leading-8 text-gray-600">
              {message}
            </p>

            <form onSubmit={handleResend} className="mx-auto max-w-md text-left">
              <label
                htmlFor="verification-email"
                className="mb-2 block font-[DM_Sans] text-sm font-semibold text-[#171717]"
              >
                Email address used to create your account
              </label>
              <input
                id="verification-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={event => {
                  setEmail(event.target.value)
                  setResendMessage("")
                }}
                placeholder="you@example.com"
                className="w-full border border-gray-300 bg-white px-4 py-3 font-[DM_Sans] outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />

              {resendMessage && (
                <p role="status" className="mt-3 text-sm leading-6 text-red-700">
                  {resendMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={resending}
                className="mt-5 w-full bg-red-600 px-8 py-4 font-[DM_Sans] font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resending ? "Sending..." : "Request a new email"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}

export default VerifyEmail
