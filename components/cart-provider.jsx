"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  // Load cart from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("rp:cart")
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem("rp:cart", JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (item) => {
    // Merge same product with same options
    setItems((prev) => {
      const key = JSON.stringify({ id: item.id, options: item.options })
      const idx = prev.findIndex((x) => JSON.stringify({ id: x.id, options: x.options }) === key)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity }
        return next
      }
      return [...prev, item]
    })
  }

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index, quantity) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, quantity: Math.max(1, quantity) } : it)))
  }

  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((acc, it) => acc + it.quantity, 0), [items])

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clear, count }),
    [items, count]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
