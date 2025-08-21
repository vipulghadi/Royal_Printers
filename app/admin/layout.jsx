"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, Users, ShoppingCart, Star, FolderOpen, LogOut, Menu, X, Tag } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Attributes", href: "/admin/attributes", icon: Tag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },

]

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h1 className="text-lg font-semibold">Royal Printers Admin</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-md  transition-colors font-semibold ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
            <Link href="/">
              <LogOut className="w-4 h-4 mr-2" />
              Back to Site
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex-1" />
          <div className="text-sm text-muted-foreground">Welcome to Royal Printers Admin Panel</div>
        </div>

        {/* Page content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
