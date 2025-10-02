import React from "react";
import Link from "next/link";

function ProductCard({ product, adminPage = false }) {
  const productLink = adminPage
    ? `/admin/products/${product.id}`
    : `/products/${product.id}`;

  return (
    <Link
        href={productLink}
    >
      <div className="overflow-hidden rounded-2xl cursor-pointer transition">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={product.images?.[0]?.url || ""}
            alt={product.name}
            className="w-full sm:h-80 h-40 object-cover rounded-2xl transform transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-3 flex flex-col justify-between">
          <h3 className="text-sm font-semibold">{product.name}</h3>
          <p className="text-gray-600 mt-1">{product.basePrice}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
