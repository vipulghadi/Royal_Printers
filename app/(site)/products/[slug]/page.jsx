"use client"

import { useState } from "react"
import { Star, ShoppingCart, MessageCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomCarousel from "@/components/customCarousal"
import MultipleCarousel from "@/components/carousels/multcardCarousel"

// Dummy data (replace with API data)
const products = {
  id: 1,
  name: "Premium Running Shoes",
  description:
    "Experience unmatched comfort and performance with our premium running shoes. Designed with breathable mesh, cushioned soles, and a sleek design perfect for daily wear or sports.",
  price: 4999,
  rating: 4.5,
  images: [
    "https://assets.ajio.com/medias/sys_master/root/20240507/mdc0/663a557116fd2c6e6af0ef6f/-473Wx593H-467293008-brown-MODEL.jpg",
    "https://www.mashup.in/cdn/shop/files/M-6392Maroon_2.jpg?v=1683573164",
    "https://d1fufvy4xao6k9.cloudfront.net/images/landings/43/shirts-mob-1.jpg",
    "https://campussutra.com/cdn/shop/files/CSMSSRT6078_1_ad9219ef-869d-44b2-9dd2-5876b06cc708.webp?v=1713879728",
  ],
}

export default function ProductPage() {
  const [selectedImg, setSelectedImg] = useState(products.images[0])

  return (
    <div className="max-w-7xl mx-auto mt-5">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-10 sm:h-[80vh]">
        {/* Left: Product Images */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails - LEFT on big screens */}
          <div className="hidden md:flex flex-col gap-3 overflow-y-auto max-h-[80vh]">
            {products.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(img)}
                className={`h-20 w-20 rounded-xl border overflow-hidden flex items-center justify-center ${
                  selectedImg === img ? "ring-2 ring-black" : ""
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="object-contain h-full w-full"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl">
            <img
              src={selectedImg}
              alt={products.name}
              className="object-contain w-full h-full max-h-[80vh] rounded-2xl"
            />
          </div>

          {/* Thumbnails - BELOW on small screens */}
          <div className="flex md:hidden gap-3 mt-4 overflow-x-auto w-full justify-center">
            {products.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(img)}
                className={`h-20 w-20 rounded-xl border overflow-hidden flex items-center justify-center flex-shrink-0 ${
                  selectedImg === img ? "ring-2 ring-black" : ""
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="object-contain h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {products.name}
          </h1>
          <p className="text-muted-foreground mb-4">{products.description}</p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(products.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {products.rating} / 5
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold mb-6">₹{products.price}</div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Add to Cart */}
            <Button className="flex-1 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>

            {/* WhatsApp Message */}
            <a
              href={`https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20${products.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </a>

            {/* Buy Now */}
            <Button
              variant="secondary"
              className="flex-1 flex items-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <MultipleCarousel/>
      </div>

    </div>
  )
}
