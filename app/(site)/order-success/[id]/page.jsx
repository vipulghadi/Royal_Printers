"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OrderSuccessPage() {
  const { id } = useParams()
  const eta = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold">Thank you for your order!</h1>
          <p className="text-muted-foreground mt-2">Your order ID is <span className="font-mono font-medium">{id}</span></p>
          <p className="mt-1">Estimated delivery date: {eta}</p>
          <p className="mt-1">We’ll contact you on WhatsApp shortly.</p>

          <div className="mt-6 flex gap-2 justify-center">
            <Button asChild><Link href="/track-order">Track Order</Link></Button>
            <Button asChild variant="outline"><Link href="/">Back to Home</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
