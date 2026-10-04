import { createContext, useCallback, useContext, useEffect, useState } from "react"
import DineEaseNotification from "../components/DineEaseNotification"

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null)

  const showNotification = useCallback((message) => {
    setNotification(message)
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(null)
  }, [])

  useEffect(() => {
    if (!notification) return

    const timeout = setTimeout(() => {
      setNotification(null)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [notification])

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification
      }}
    >
      {children}

      <DineEaseNotification
        message={notification}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider."
    )
  }

  return context
}