import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
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
  return useContext(AuthContext)
}