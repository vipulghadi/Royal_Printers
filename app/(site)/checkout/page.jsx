"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/file-upload"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"

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

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const subtotal = useMemo(() => items.reduce((acc, it) => acc + computeLineTotal(it), 0), [items])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) {
      alert("Your cart is empty.")
      return
    }
    setSubmitting(true)
    const form = new FormData(e.currentTarget)
    const payload = {
      customer: {
        fullName: form.get("fullName"),
        mobile: form.get("mobile"),
        whatsapp: form.get("whatsapp"),
        email: form.get("email"),
        address: form.get("address"),
        notes: form.get("notes"),
      },
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        image: it.image,
        basePrice: it.basePrice,
        quantity: it.quantity,
        options: it.options,
        notes: it.notes,
        designFileName: it.designFileName,
      })),
      attachmentFileName: file?.name || null,
      subtotal,
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    setSubmitting(false)
    if (json?.orderId) {
      clear()
      router.push(`/order-success/${json.orderId}`)
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 lg:grid-cols-[1fr_360px]">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" name="mobile" type="tel" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
            <Input id="whatsapp" name="whatsapp" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <textarea id="address" name="address" required className="w-full rounded-md border bg-background p-2 text-sm" rows={4} />
          </div>
          <div className="sm:col-span-2">
            <div className="font-medium">Re-upload design (optional)</div>
            <FileUpload accept=".pdf,.png,.jpg,.jpeg,.cdr" maxSizeMB={100} onFileChange={setFile} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="notes">Custom notes</Label>
            <textarea id="notes" name="notes" className="w-full rounded-md border bg-background p-2 text-sm" rows={4} />
          </div>
        </div>
        <Button type="submit" disabled={submitting || items.length === 0}>{submitting ? "Placing Order..." : "Place Order"}</Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.length === 0 ? (
            <div className="text-sm text-muted-foreground">No items in cart.</div>
          ) : (
            items.map((it, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="text-sm">
                  <div className="font-medium leading-tight">{it.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {it.options?.quantity} • {it.options?.material} • {it.options?.size} • {it.options?.sides}
                  </div>
                </div>
                <div className="font-medium whitespace-nowrap">₹{computeLineTotal(it)}</div>
              </div>
            ))
          )}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-muted-foreground">Subtotal</div>
            <div className="text-xl font-bold">₹{subtotal}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
