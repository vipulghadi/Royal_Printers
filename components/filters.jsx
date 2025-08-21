"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const categories = [
  { label: "All", value: "all" },
  { label: "Visiting Cards", value: "visiting-cards" },
  { label: "Mugs", value: "mugs" },
  { label: "T-Shirts", value: "tshirts" },
  { label: "Banners", value: "banners" },
  { label: "Stickers", value: "stickers" },
  { label: "Flyers", value: "flyers" },
]

export default function Filters({ defaults = { q: "", category: "all", sort: "popularity", price: 10000 }, onChange = () => {} }) {
  const [q, setQ] = useState(defaults.q)
  const [category, setCategory] = useState(defaults.category)
  const [sort, setSort] = useState(defaults.sort)
  const [price, setPrice] = useState(defaults.price)

  useEffect(() => {
    setQ(defaults.q)
    setCategory(defaults.category)
    setSort(defaults.sort)
    setPrice(defaults.price)
  }, [defaults])

  const apply = () => onChange({ q, category, sort, price })

  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="q">Search</Label>
          <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Sort</Label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Max Price: ₹{price}</Label>
          <Slider value={[price]} min={0} max={10000} step={50} onValueChange={(v) => setPrice(v[0])} />
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={apply}>Apply Filters</Button>
      </div>
    </div>
  )
}
