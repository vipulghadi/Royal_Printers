"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden ">
      {/* Shared container for all content */}
      <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-3">
        <Header />
        
        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
