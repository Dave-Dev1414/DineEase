import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Discover from "./pages/Discover"
import Reserve from "./pages/Reserve"
import Order from "./pages/Order"
import Bookings from "./pages/Bookings"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/order" element={<Order />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App