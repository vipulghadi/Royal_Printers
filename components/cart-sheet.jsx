"use client"

import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react'
import { useMemo, useState } from "react"

function computeLineTotal({ basePrice, options, quantity }) {
  const { material, size, sides } = options || {}
  const qty = Number(quantity || 1)
  const materialMultiplier = ["Premium", "Magic", "Dry-fit"].includes(material) ? 1.5 : 1
  const sizeMultiplier =
    (typeof size === "string" && (size.toLowerCase().includes("xl") || size.includes("90x54") || size.includes("450"))) ? 1.2 : 1
  const sidesMultiplier = sides === "Double" ? 1.2 : 1
  const unit = (basePrice || 0) * materialMultiplier * sizeMultiplier * sidesMultiplier
  const total = Math.round(unit * Math.sqrt(qty))
  return total
}

export default function CartSheet() {
  const { items, removeItem, updateQuantity, count } = useCart()
  const [open, setOpen] = useState(false)

  const total = useMemo(() => {
    return items.reduce((acc, it) => acc + computeLineTotal(it), 0)
  }, [items])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open cart" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] h-4 min-w-4 px-1">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-[92vw] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto mt-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-sm text-muted-foreground">Your cart is empty.</div>
          ) : (
            items.map((it, i) => (
              <div key={i} className="rounded-md border p-3 grid grid-cols-[64px_1fr_auto] gap-3">
                <img
                  src={it.image || "/placeholder.svg?height=96&width=96&query=product"}
                  alt={it.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="space-y-1">
                  <div className="font-medium leading-tight">{it.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {it.options?.material} • {it.options?.size} • {it.options?.sides}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(i, it.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      value={it.quantity}
                      onChange={(e) => updateQuantity(i, Number(e.target.value) || 1)}
                      className="w-14 h-8 text-center"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(i, it.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="font-medium">₹{computeLineTotal(it)}</div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                    onClick={() => removeItem(i)}
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="mt-4">
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Subtotal</div>
              <div className="text-lg font-semibold">₹{total}</div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                <Link href="/products">Continue shopping</Link>
              </Button>
              <Button asChild className="flex-1" onClick={() => setOpen(false)}>
                <Link href="/cart">Review cart</Link>
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
