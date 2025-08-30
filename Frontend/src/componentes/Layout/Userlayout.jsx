// src/components/layout/Userlayout.jsx

import Navbar from "../Common/Navbar"
import Footer from "../Common/Footer";

function Userlayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Userlayout;