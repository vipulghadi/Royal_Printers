import React from "react"
import { Button } from "../ui/button"
import ProductCard from "./productCard"
import { dummyProducts } from "@/lib/dummyData"
import Link from "next/link"


function ProductSection() {
  return (
    <section className="w-[90%] mx-auto py-10   mb-5">
    <div className="flex justify-between items-center mb-3">
    <h2 className="text-3xl font-bold mb-6 text-center mx-auto">Products</h2>

        
    </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-3">
        {dummyProducts.map((product,ind) => (
 <ProductCard product={product} key={ind}/>
        ))}
      </div>
          <div className="flex justify-center mt-12 ">
          <Link href={"/products"}>
              <Button className="cursor-pointer bg-red-500 hover:bg-red-600 px-8 rounded-4xl py-6 font-semibold ">Explore more</Button></Link>
                
                        
              </div>

    </section>
  )
}

export default ProductSection
