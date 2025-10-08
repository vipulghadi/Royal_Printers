"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Printer, Search } from "lucide-react"
import { useState, useEffect } from "react"

function MobileNav({ open }) {
  return (
    <div
      className={`flex flex-col bg-white shadow-md transition-max-h duration-300 overflow-hidden ${
        open ? "max-h-96 p-4" : "max-h-0 p-0"
      }`}
    >
      <Link href="/" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        Home
      </Link>
      <Link href="/products" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        Products
      </Link>
      <Link href="/about-us" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        About
      </Link>
      <Link href="/contact-us" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        Contact
      </Link>
      <Link href="/our-stories" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        Our Stories
      </Link>
    </div>
  )
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [q, setQ] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    router.push(`/products?${new URLSearchParams({ q }).toString()}`)
  }

  const NavLink = ({ href, label }) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        className={`text-base px-2 py-1 rounded-md ${
          active
            ? "font-semibold text-red-500"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <>
      <header
        className={`bg-white fixed top-0 left-0 right-0 z-50 w-full transition-all ${
          scrolled ? "shadow-md" : "bg-white"
        }`}
      >
        <div className="px-2  max-w-7xl mx-auto   h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl"
          >
            <Printer className="w-8 h-8 text-red-500" />
            <span className="text-black uppercase">Royal Printers</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-semibold">
            <NavLink href="/" label="Home" />
            <NavLink href="/products" label="Products" />
            <NavLink href="/about-us" label="About" />
            <NavLink href="/contact-us" label="Contact" />
            <NavLink href="/our-stories" label="Our Stories" />
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <Button variant="outline" className="bg-red-500 text-white hover:bg-pink-500 mr-4">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden relative">

              <Menu 
               onClick={() => setMobileOpen(!mobileOpen)}
               className="w-8 h-8 text-black" />
            
          </div>
        </div>

        {/* Mobile Dropdown below navbar */}
        <div className="md:hidden">
          <MobileNav open={mobileOpen} />
        </div>
      </header>

      {/* Spacer so content isn’t hidden under fixed header */}
      <div className="h-20"></div>
    </>
  )
}
