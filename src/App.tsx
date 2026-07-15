import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"

function App() {

  return (
    <div className="min-h-screen bg-plaster-dim font-body">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div >
  )
}

export default App
