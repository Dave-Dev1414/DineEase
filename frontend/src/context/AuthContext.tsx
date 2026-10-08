import {  createContext,  useContext,  useEffect,  useState,  type ReactNode } from "react"

type User = {
  id: number
  name: string
  email: string
}

type AuthContextValue = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost/dineease/api/users?action=me", {
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUser(data.user)
        }
      })
      .catch(error => {
        console.error("Auth check error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    )
  }

  return context
}