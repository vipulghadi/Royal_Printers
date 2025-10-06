import React from "react"
import CategoryCard from "./categoryCard"
import { Button } from "../ui/button"
import { dummyCategories } from "@/lib/dummyData"
export default function PopularCategorySection() {
  


  return (
    <section className="w-full mt-16  py-12 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Popular Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {dummyCategories.slice(0,10).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="flex justify-center mt-12 ">
            <Button className="cursor-pointer bg-red-500 hover:bg-red-600 px-8 rounded-4xl py-6 font-semibold ">Explore more</Button>
        </div>
      </div>
    </section>
  )
}
