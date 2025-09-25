"use client";

import { useState } from "react";
import { Star, ShoppingCart, MessageCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecommndedProducts from "@/components/recommndedProducts";
import ProductVariations from "@/components/productVariationsPricing";

// Dummy product data
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
  variations: [
    { id: 1, type: "Size", value: "Small", price: 4500 },
    { id: 2, type: "Size", value: "Medium", price: 4800 },
    { id: 3, type: "Size", value: "Large", price: 4999 },
    { id: 4, type: "Color", value: "Red", price: 5000 },
    { id: 5, type: "Color", value: "Black", price: 5100 },
  ],
  whatsappNumber: "919876543210",
};

export default function ProductPage() {
  const [selectedImg, setSelectedImg] = useState(products.images[0]);

  // Group variations by type for display
  const groupedVariations = products.variations.reduce((acc, v) => {
    if (!acc[v.type]) acc[v.type] = [];
    if (!acc[v.type].includes(v.value)) acc[v.type].push(v.value);
    return acc;
  }, {});

  return (
    <div className="w-full mt-5">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8 md:h-[80vh]">
        {/* Left: Image Section */}
        <div className="flex md:flex-row flex-col gap-4 md:w-1/2">
          {/* Main Image */}
          <div className="w-full md:w-4/5 h-96 md:h-[80vh] bg-gray-100 overflow-hidden rounded-2xl">
            <img
              src={selectedImg}
              alt={products.name}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex md:flex-col flex-row gap-3 overflow-x-auto lg:overflow-x-hidden md:overflow-y-auto md:w-1/5">
            {products.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(img)}
                className={`flex-shrink-0 h-20 w-20 md:h-24 md:w-24 rounded-xl border overflow-hidden flex items-center justify-center ${
                  selectedImg === img ? "ring-2 ring-black" : ""
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="object-cover h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col md:w-1/2 items-start mt-6 md:mt-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            {products.name}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
            {products.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-4">
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
            <span className="ml-2 text-sm sm:text-base text-gray-600">
              {products.rating} / 5
            </span>
          </div>

          {/* Price */}
          <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-6">
            ₹{products.price}
          </div>

          {/* Available Variations */}
          <div className="mb-6 space-y-2">
            {Object.entries(groupedVariations).map(([type, values]) => (
              <div key={type}>
                <span className="font-semibold">{type}: </span>
                <span>{values.join(", ")}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
            <Button className="flex-1 flex items-center gap-2 justify-center">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <a
              href={`https://wa.me/${products.whatsappNumber}?text=Hello,%20I%20am%20interested%20in%20${products.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </a>
            <Button
              variant="secondary"
              className="flex-1 flex items-center gap-2 justify-center"
            >
              <CreditCard className="w-5 h-5" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Product Variations & Custom Order */}
      <ProductVariations product={products} />

      {/* Recommended Products */}
      <div className="mt-12 sm:mt-16">
        <h1 className="font-semibold text-lg sm:text-2xl mb-3">
          Recommended Products
        </h1>
        <RecommndedProducts productId={1} />
      </div>
    </div>
  );
}
