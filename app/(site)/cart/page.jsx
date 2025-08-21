"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus } from 'lucide-react'

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

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart()
  const total = useMemo(() => items.reduce((acc, it) => acc + computeLineTotal(it), 0), [items])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        {items.length === 0 ? (
          <div className="rounded-xl border p-6 text-center">
            <div className="text-sm text-muted-foreground">Your cart is empty.</div>
            <Button asChild className="mt-4"><Link href="/products">Browse products</Link></Button>
          </div>
        ) : (
          items.map((it, i) => (
            <div key={i} className="rounded-md border p-3 grid grid-cols-[80px_1fr_auto] gap-3">
              <img src={it.image || "/placeholder.svg?height=120&width=120&query=product"} alt={it.name} className="w-20 h-20 object-cover rounded-md border" />
              <div className="space-y-1">
                <div className="font-medium">{it.name}</div>
                <div className="text-xs text-muted-foreground">{it.options?.material} • {it.options?.size} • {it.options?.sides}</div>
                {it.notes ? <div className="text-xs text-muted-foreground line-clamp-2">Notes: {it.notes}</div> : null}
                <div className="flex items-center gap-2 mt-2">
                  <Button size="icon" variant="outline" onClick={() => updateQuantity(i, it.quantity - 1)} aria-label="Decrease"><Minus className="w-4 h-4" /></Button>
                  <Input value={it.quantity} onChange={(e) => updateQuantity(i, Number(e.target.value) || 1)} className="w-16 h-8 text-center" />
                  <Button size="icon" variant="outline" onClick={() => updateQuantity(i, it.quantity + 1)} aria-label="Increase"><Plus className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="font-medium">₹{computeLineTotal(it)}</div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(i)} aria-label="Remove"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Subtotal</div>
            <div className="text-xl font-bold">₹{total}</div>
          </div>
          <div className="text-xs text-muted-foreground">Taxes and shipping are calculated at checkout.</div>
          <Button asChild disabled={items.length === 0} className="w-full mt-2">
            <Link href="/checkout">Checkout</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
