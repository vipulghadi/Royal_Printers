"use client";

import { useState } from "react";
import { Search } from "lucide-react"; // using lucide-react icons
import ProductCard from "@/components/client/productCard";

import { dummyProducts } from "@/lib/dummyData";
import SearchProductSection from "@/components/client/SearchProductSection";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesName && matchesCategory;
  });

  return (
    <section className=" w-full mx-auto ">
<SearchProductSection/>
      {/* Product Grid */}
      <div className=" w-[90vw] mx-auto  mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
<ProductCard product={product}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>


    </section>
  );
}
