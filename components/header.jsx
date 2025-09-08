"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Printer, Search } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { useState } from "react"

function MobileNav() {
  return (
    <div className="grid gap-1">
      <Link href="/" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        Home
      </Link>
      <Link href="/products" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        Products
      </Link>
      <Link href="/about" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        About
      </Link>
      <Link href="/contact" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        Contact
      </Link>
      <Link href="/faqs" className="px-2 py-2 rounded-md hover:bg-muted text-base">
        FAQs
      </Link>
    </div>
  )
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [q, setQ] = useState("")

  const onSearch = (e) => {
    e.preventDefault()
    router.push(`/products?${new URLSearchParams({ q }).toString()}`)
  }

  const NavLink = ({ href, label }) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        className={`text-base px-2 py-1 rounded-md ${active ? "font-semibold" : "text-muted-foreground hover:text-foreground"}`}
      >
        {label}
      </Link>
    )
  }

  return (
<header className="bg-white sticky   w-full  overflow-x-hidden">
  <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
    {/* Left: Logo */}
    <Link href="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl">
      <Printer className="w-6 h-6" />
      <span>Royal Printers</span>
    </Link>

    {/* Middle: Nav Links */}
    <nav className="hidden md:flex items-center gap-6 font-semibold">
      <NavLink href="/" label="Home" />
      <NavLink href="/products" label="Products" />
      <NavLink href="/about" label="About" />
      <NavLink href="/contact" label="Contact" />
      <NavLink href="/faqs" label="FAQs" />
    </nav>

    {/* Right: Search Icon (Desktop) */}
    <div className="hidden md:flex items-center">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search className="w-6 h-6" />
      </Button>
    </div>

    {/* Mobile menu trigger */}
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85vw] sm:w-[360px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Printer className="w-6 h-6" />
              <span className="text-xl font-semibold">Royal Printers</span>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
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
          <div className="mt-4">
            <MobileNav />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</header>

  )
}
