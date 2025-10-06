"use client"

import Header from "@/components/client/header"
import Footer from "@/components/client/footer"
import WhatsAppButton from "@/components/client/whatsappButton"

export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden ">

        <Header />
        <WhatsAppButton />
        {/* Main content */}
        <main className=" flex flex-col">
          {children}
        </main>
        
        <Footer />

    </div>
  )
}
