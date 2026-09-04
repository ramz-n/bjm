import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import PrayerTimes from "./pages/PrayerTimes"
import KeyDates from "./pages/KeyDates"
import Names from "./pages/99Names"
import Learn from "./pages/Learn"
import AboutUs from "./pages/AboutUs"
import Committee from "./pages/Committee"
import Upcoming from "./pages/Upcoming"
import AllEvents from "./pages/AllEvents"
import Domate from "./pages/Donate"

function App() {

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/committee-members" element={<Committee />} />
          <Route path="/upcoming-events" element={<Upcoming />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/prayer-timetable" element={<PrayerTimes />} />
          <Route path="/key-dates" element={<KeyDates />} />
          <Route path="/99-names" element={<Names />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/donate" element={<Domate />} />
        </Routes>
      </main>
      <Footer />
    </div >
  )
}

export default App
