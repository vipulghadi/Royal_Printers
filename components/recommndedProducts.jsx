import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./productCard";

function ProductSkeleton() {
  return (
    <div className="rounded-lg border bg-gray-100 animate-pulse p-4 flex flex-col items-center">
      <div className="w-full h-40 bg-gray-300 rounded-md mb-3"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}

function RecommendedProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Business Cards", price: "₹199", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
        { id: 2, name: "Flyers", price: "₹299", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
        { id: 3, name: "Posters", price: "₹499", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
        { id: 4, name: "T-Shirts", price: "₹799", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
        { id: 5, name: "T-Shirts", price: "₹799", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
        { id: 6, name: "T-Shirts", price: "₹799", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
        { id: 7, name: "T-Shirts", price: "₹799", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
        { id: 8, name: "T-Shirts", price: "₹799", img: "https://toffle.in/cdn/shop/files/wtwide1.jpg?v=1709646109&width=800" },
      ]);
      setLoading(false);
    }, 1500);
  }, [productId]);

  return (
    <div className="w-full ">
      <Carousel opts={{ align: "start" }} className="w-full ">
        <CarouselContent>
          {(loading ? Array.from({ length: 4 }) : products).map((item, index) => (
            <CarouselItem key={item?.id || index} className="basis-1/2 md:basis-1/2 lg:basis-1/5 p-2">
              {loading ? <ProductSkeleton /> : <ProductCard product={item} />}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows container positioned inside carousel */}
        <div className=" absolute bottom-1 right-12 flex gap-2 z-10 ">
          <CarouselPrevious>
            <button className="p-2 border rounded bg-white shadow hover:bg-gray-100 transition">
              ◀
            </button>
          </CarouselPrevious>
          <CarouselNext>
            <button className="p-2 border rounded bg-white shadow hover:bg-gray-100 transition">
              ▶
            </button>
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
}

export default RecommendedProducts;
