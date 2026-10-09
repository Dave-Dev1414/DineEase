import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { NotificationProvider } from "./context/NotificationContext"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element was not found.")
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>,
)
