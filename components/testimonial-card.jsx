"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'

export default function TestimonialCard({ name = "Customer", role = "Verified Buyer", quote = "", rating = 5 }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-primary" : "stroke-muted-foreground"}`} />)}
        </div>
        <p className="mt-3">{"\"" + quote + "\""}</p>
        <div className="mt-3 text-sm text-muted-foreground">{name} • {role}</div>
      </CardContent>
    </Card>
  )
}
