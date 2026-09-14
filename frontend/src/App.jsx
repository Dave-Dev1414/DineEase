import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Discover from "./pages/Discover"
import Reserve from "./pages/Reserve"
import Order from "./pages/Order"
import Bookings from "./pages/Bookings"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail"
import CheckYourEmail from "./pages/CheckYourEmail"
import Footer from "./components/Footer"

function AppContent() {
  const location = useLocation()
  const hideLayout = location.pathname === "/signup"

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/order" element={<Order />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/check-email" element={<CheckYourEmail />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App