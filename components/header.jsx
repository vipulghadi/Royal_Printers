"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Printer, Search } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useState, useEffect } from "react"

function MobileNav() {
  return (
    <div className="grid gap-1">
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

  // 🔥 Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
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
            ? "font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <>
      {/* Fixed Header */}
      <header
        className={` bg-white fixed top-0 left-0 right-0 z-50 w-full transition-all ${
          scrolled ? " shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl"
          >
            <Printer className="w-6 h-6 text-orange-500" />
            <span className="text-orange-500">Royal Printers</span>
          </Link>

          {/* Middle: Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 font-semibold">
            <NavLink href="/" label="Home" />
            <NavLink href="/products" label="Products" />
            <NavLink href="/about-us" label="About" />
            <NavLink href="/contact-us" label="Contact" />
            <NavLink href="/our-stories" label="Our Stories" />
          </nav>

          {/* Right: Search Icon (Desktop) */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="w-12 h-12" />
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-12 h-12" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[100vw] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Printer className="w-6 h-6 text-orange-500" />
                    <span className="text-xl font-semibold text-orange-500">
                      Royal Printers
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Search Form */}
                <div className="mt-4 p-4">
                  <form onSubmit={onSearch} className="flex gap-2">
                    <div className="relative w-full">
                      <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search products..."
                        className="pl-8 h-11"
                      />
                    </div>
                    <Button type="submit" className="h-11">
                      Search
                    </Button>
                  </form>
                </div>

                {/* Mobile Nav Links */}
                <div className="mt-4 p-4">
                  <MobileNav />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Spacer so content isn’t hidden under fixed header */}
      <div className="h-20"></div>
    </>
  )
}
