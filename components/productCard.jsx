import React from "react"
import Link from "next/link"

function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div
    
        className="overflow-hidden rounded-2xl cursor-pointer transition"
      >
        <div className="overflow-hidden rounded-2xl">
          <img
            src={product.img}
            alt={product.name}
            className="w-full sm:h-80 h-40 object-cover rounded-2xl transform transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-3 flex flex-col justify-between">
          <h3 className="text-sm font-semibold">{product.name}</h3>
          <p className="text-gray-600 mt-1">{product.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
