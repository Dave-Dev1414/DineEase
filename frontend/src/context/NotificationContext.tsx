import { createContext, useCallback, useContext, useEffect,  useState,  type ReactNode } from "react"
import DineEaseNotification from "../components/DineEaseNotification"

type NotificationContextValue = {
  showNotification: (message: string) => void
  hideNotification: () => void
}

const NotificationContext =
  createContext<NotificationContextValue | null>(null)

type NotificationProviderProps = {
  children: ReactNode
}

export function NotificationProvider({
  children
}: NotificationProviderProps) {
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = useCallback((message: string) => {
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