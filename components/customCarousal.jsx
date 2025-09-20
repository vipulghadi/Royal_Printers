"use client";
import React, { useState, useEffect } from "react";

function CustomCarousel({
  items = [],
  renderItem,
  responsive = { default: 2, 640: 1, 1024: 3 }, 
  autoPlay = true,
  interval = 5000,
  containerClass = "w-full max-w-6xl mx-auto",
  slideClass = "p-2",
  controls = true,
  dots = true,
}) {
  const [current, setCurrent] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(responsive.default || 1);

  // Handle responsive breakpoints
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      let newCount = responsive.default || 1;
      Object.keys(responsive).forEach((bp) => {
        if (width <= bp) {
          newCount = responsive[bp];
        }
      });
      setItemsPerSlide(newCount);
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, [responsive]);

  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);

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
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
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
                <div key={index} className={slideClass}>
                  {renderItem ? renderItem(item, index) : <div>{item}</div>}
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Controls */}
      {controls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-3 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            ▶
          </button>
        </>
      )}

      {/* Dots */}
      {dots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomCarousel;
