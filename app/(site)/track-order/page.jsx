"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Stepper from "@/components/stepper"

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [mobile, setMobile] = useState("")
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`/api/track-order?${new URLSearchParams({ orderId, mobile }).toString()}`)
    const json = await res.json()
    setStatus(json.status || "placed")
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Track your order</h1>
      <form onSubmit={onSubmit} className="grid gap-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="orderId">Order ID</Label>
          <Input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g., RP-123456" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Optional" />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Checking..." : "Check Status"}</Button>
      </form>

      {status && (
        <div className="mt-8">
          <Stepper status={status} />
        </div>
      )}
    </div>
  )
}
