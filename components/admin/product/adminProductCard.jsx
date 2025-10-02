import React from "react";
import Link from "next/link";

function AdminProductCard({ product }) {


  return (
    <Link
        href={`/admin/products/${product.id}`}
    >
      <div className="overflow-hidden bg-green-100 cursor-pointer transition">
        <div className="overflow-hidden">
          <img
            src={product.images?.[0]?.url || "/imageNotFound.png"}
            alt={product.name}
            className="w-full sm:h-80 h-40 object-cover  transform transition-transform duration-500 hover:scale-110"
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

export default AdminProductCard;
