"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SiteLayout({ children }) {
  return (

      <div className="min-h-svh flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
 

  )
}
