"use client";
import React, { useState, useEffect } from "react";

function CustomCarousel({

  autoPlay = true,
  interval = 5000,
  itemsPerSlide = 2, // how many images visible per slide
  imgClass = "h-[400px] object-cover", // custom image class
  containerClass = "w-full max-w-6xl mx-auto", // custom wrapper
}) {
  const [current, setCurrent] = useState(0);
 const items = [
    "https://assets.ajio.com/medias/sys_master/root/20240507/mdc0/663a557116fd2c6e6af0ef6f/-473Wx593H-467293008-brown-MODEL.jpg",
    "https://www.mashup.in/cdn/shop/files/M-6392Maroon_2.jpg?v=1683573164",
    "https://d1fufvy4xao6k9.cloudfront.net/images/landings/43/shirts-mob-1.jpg",
    "https://campussutra.com/cdn/shop/files/CSMSSRT6078_1_ad9219ef-869d-44b2-9dd2-5876b06cc708.webp?v=1713879728",
  ];
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % Math.ceil(items.length / itemsPerSlide));
  };

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + Math.ceil(items.length / itemsPerSlide)) %
        Math.ceil(items.length / itemsPerSlide)
    );
  };

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [current, autoPlay, interval]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg ${containerClass}`}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map(
          (_, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid"
              style={{ gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)` }}
            >
              {items
                .slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                )
                .map((item, index) => (
                  <div key={index} className="p-2">
                    <img
                      src={item}
                      alt={`slide-${index}`}
                      className={`w-full rounded-xl ${imgClass}`}
                    />
                  </div>
                ))}
            </div>
          )
        )}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-3 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        ◀
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          )
        )}
      </div>
    </div>
  );
}

export default CustomCarousel;
