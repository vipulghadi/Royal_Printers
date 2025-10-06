"use client";

import { useState } from "react";
import { Search } from "lucide-react"; // using lucide-react icons
import ProductCard from "@/components/client/productCard";

import { dummyProducts } from "@/lib/dummyData";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesName && matchesCategory;
  });

  return (
    <section className="w-[90%] mx-auto  py-10 px-4 max-w-7xl mx-auto ">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
<ProductCard product={product}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Fixed Search Bar at Bottom */}
      <div className="fixed bottom-6 left-0 right-0 w-full flex justify-center px-4 z-50">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 shadow-lg focus:ring-2 focus:ring-orange-500 outline-none  bg-white"
          />
        </div>
      </div>
    </section>
  );
}
