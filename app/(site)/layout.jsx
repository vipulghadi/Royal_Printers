"use client"

import Header from "@/components/client/header"
import Footer from "@/components/client/footer"
import WhatsAppButton from "@/components/client/whatsappButton"

export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden ">
      {/* Shared container for all content */}
      <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto sm:px-10 px-3">
        <Header />
        <WhatsAppButton />
        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
