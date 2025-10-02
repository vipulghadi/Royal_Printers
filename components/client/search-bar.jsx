"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar({ defaultQuery = "" }) {
  const [q, setQ] = useState(defaultQuery)
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    router.push(`/products?${new URLSearchParams({ q }).toString()}`)
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products (e.g., mugs, t-shirts)" />
      <Button type="submit"><Search className="w-4 h-4 mr-2" /> Search</Button>
    </form>
  )
}
