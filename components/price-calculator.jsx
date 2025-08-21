"use client"

import { useEffect, useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PriceCalculator({
  basePrice = 199,
  options = {
    quantity: [1, 5, 10],
    material: ["Standard"],
    size: ["M"],
    sides: ["Single"]
  },
  onPriceChange = () => {},
  onOptionsChange = () => {},
}) {
  const [quantity, setQuantity] = useState(options.quantity[0])
  const [material, setMaterial] = useState(options.material[0])
  const [size, setSize] = useState(options.size[0])
  const [sides, setSides] = useState(options.sides[0])

  const price = useMemo(() => {
    const qtyMultiplier = typeof quantity === "number" ? quantity : Number(quantity)
    const materialMultiplier = material === "Premium" || material === "Magic" || material === "Dry-fit" ? 1.5 : 1
    const sizeMultiplier = size?.toString().toLowerCase().includes("xl") || size?.toString().includes("90x54") || size?.toString().includes("450") ? 1.2 : 1
    const sidesMultiplier = sides === "Double" ? 1.2 : 1
    const unit = basePrice * materialMultiplier * sizeMultiplier * sidesMultiplier
    const total = Math.round(unit * Math.sqrt(qtyMultiplier))
    return total
  }, [basePrice, quantity, material, size, sides])

  useEffect(() => {
    onPriceChange(price)
  }, [price, onPriceChange])

  useEffect(() => {
    onOptionsChange({ quantity, material, size, sides })
  }, [quantity, material, size, sides, onOptionsChange])

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Quantity</Label>
        <Select value={String(quantity)} onValueChange={(v) => setQuantity(Number(v))}>
          <SelectTrigger><SelectValue placeholder="Quantity" /></SelectTrigger>
          <SelectContent>
            {options.quantity.map(q => <SelectItem key={q} value={String(q)}>{q}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Material</Label>
        <Select value={material} onValueChange={setMaterial}>
          <SelectTrigger><SelectValue placeholder="Material" /></SelectTrigger>
          <SelectContent>
            {options.material.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Size</Label>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger><SelectValue placeholder="Size" /></SelectTrigger>
          <SelectContent>
            {options.size.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Sides</Label>
        <Select value={sides} onValueChange={setSides}>
          <SelectTrigger><SelectValue placeholder="Sides" /></SelectTrigger>
          <SelectContent>
            {options.sides.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
