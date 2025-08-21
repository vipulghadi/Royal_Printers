"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'

export default function Reviews({ productId = "", initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews)
  const [rating, setRating] = useState(5)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

  const submit = (e) => {
    e.preventDefault()
    setReviews(r => [{ name, rating, comment }, ...r])
    setName("")
    setComment("")
    setRating(5)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Customer Reviews</h2>
      <div className="mt-3 space-y-3">
        {reviews.length === 0 && <div className="text-sm text-muted-foreground">No reviews yet.</div>}
        {reviews.map((r, i) => (
          <div key={i} className="rounded-md border p-3">
            <div className="font-medium">{r.name}</div>
            <div className="flex items-center gap-1 my-1">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`w-4 h-4 ${j < r.rating ? "fill-primary" : "stroke-muted-foreground"}`} />)}
            </div>
            <div className="text-sm">{r.comment}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <div className="text-sm font-medium">Leave a review</div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} type="button" aria-label={`Rate ${i+1} stars`} onClick={() => setRating(i + 1)}>
              <Star className={`w-5 h-5 ${i < rating ? "fill-primary" : "stroke-muted-foreground"}`} />
            </button>
          ))}
        </div>
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Textarea placeholder="Your feedback" value={comment} onChange={(e) => setComment(e.target.value)} required rows={4} />
        <Button type="submit">Submit Review</Button>
      </form>
    </div>
  )
}
