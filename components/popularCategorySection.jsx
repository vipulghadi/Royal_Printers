import React from "react"
import CategoryCard from "./categoryCard"
import { Button } from "./ui/button"

export default function PopularCategorySection() {
  const imageUrl =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.--2sTQTjkoLQunuq_J6D7wHaE8%3Fpid%3DApi&f=1&ipt=d01589a0dbe76027cde34e585e80cb84b2fc1c6e4891218b9f5b1d6900c2a481"

  const categories = [
    { id: 1, name: "Business Cards", image: imageUrl },
    { id: 2, name: "Flyers & Brochures", image: imageUrl },
    { id: 3, name: "Posters", image: imageUrl },
    { id: 4, name: "Banners", image: imageUrl },
    { id: 5, name: "Custom Packaging", image: imageUrl },
    { id: 6, name: "Stickers & Labels", image: imageUrl },
    { id: 7, name: "Calendars", image: imageUrl },
    { id: 8, name: "Gift Boxes", image: imageUrl },
    { id: 9, name: "Calendars", image: imageUrl },
    { id: 10, name: "Gift Boxes", image: imageUrl },
  ]

  return (
    <section className="w-full mt-16  py-12 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Popular Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="flex justify-center mt-12 ">
            <Button className="cursor-pointer ">Explore more</Button>
        </div>
      </div>
    </section>
  )
}
