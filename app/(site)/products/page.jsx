"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ProductCard from "@/components/product-card"
import Filters from "@/components/filters"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = Number(searchParams.get("page") || "1")
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || "all"
  const sort = searchParams.get("sort") || "popularity"
  const price = Number(searchParams.get("price") || "10000")

  useEffect(() => {
    async function load() {
      setLoading(true)
      const res = await fetch(`/api/products`)
      const json = await res.json()
      setProducts(json.products || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products
      .filter(p => (category === "all" ? true : p.category === category))
      .filter(p => (q ? (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : true))
      .filter(p => p.priceFrom <= price)
      .sort((a, b) => {
        if (sort === "price-asc") return a.priceFrom - b.priceFrom
        if (sort === "price-desc") return b.priceFrom - a.priceFrom
        return (b.popularity || 0) - (a.popularity || 0)
      })
  }, [products, query, category, sort, price])

  const perPage = 9
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  const handleFilterChange = (next) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") params.delete(k)
      else params.set(k, String(v))
    })
    params.set("page", "1")
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Filters
        defaults={{
          q: query,
          category,
          sort,
          price
        }}
        onChange={handleFilterChange}
      />

      {loading ? (
        <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-[320px] rounded-xl" />)}
        </div>
      ) : (
        <>
          <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const isActive = i + 1 === page
                  const params = new URLSearchParams(searchParams.toString())
                  params.set("page", String(i + 1))
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink isActive={isActive} href={`/products?${params.toString()}`}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  )
}
