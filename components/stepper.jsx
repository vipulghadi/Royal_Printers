"use client"

import { Check } from 'lucide-react'

const steps = [
  { key: "placed", label: "Order Placed" },
  { key: "production", label: "In Production" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
]

export default function Stepper({ status = "placed" }) {
  const index = steps.findIndex(s => s.key === status)
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const done = i <= index
        return (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`size-7 rounded-full flex items-center justify-center border ${done ? "bg-primary text-primary-foreground" : "bg-background"}`}>
              {done ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
            </div>
            <div className={`text-sm ${done ? "font-medium" : "text-muted-foreground"}`}>{s.label}</div>
            {i < steps.length - 1 && <div className={`w-10 h-[2px] ${done ? "bg-primary" : "bg-muted"}`} />}
          </div>
        )
      })}
    </div>
  )
}
