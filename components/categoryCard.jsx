import React from "react"

export default function CategoryCard({ category }) {
  return (
    <div className="flex flex-col items-center text-center cursor-pointer group">
      {/* Image */}
      <div className="w-28 h-28 rounded-full overflow-hidden shadow-md bg-gray-100 group-hover:shadow-lg transition duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Category Name */}
      <h3 className="mt-3 text-base font-semibold text-gray-800 group-hover:text-green-500">
        {category.name}
      </h3>
    </div>
  )
}
