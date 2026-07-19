import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import PrayerTimes from "./pages/PrayerTimes"

function App() {

  return (
    <div className="min-h-screen bg-primary-dim">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayer-timetable" element={<PrayerTimes />} />
        </Routes>
      </main>
      <Footer />
    </div >
  )
}

export default App
