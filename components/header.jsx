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
            ? "font-semibold text-black"
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
        className={`bg-slate-50 fixed top-0 left-0 right-0 z-50 w-full transition-all ${
          scrolled ? "shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl"
          >
            <Printer className="w-6 h-6 text-orange-500" />
            <span className="text-orange-500">Royal Printers</span>
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
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
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
