"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WordRotate } from "@/components/ui/word-rotate"
import { DotPattern } from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"

export default function Hero() {
  return (
    <section className="relative flex flex-col sm:flex-row items-center justify-between w-full min-h-[80vh] rounded-2xl overflow-hidden px-6 sm:px-12 py-10 bg-green-500">
      {/* Dot Background */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-0",
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] opacity-30"
        )}
      />

      {/* Left Side */}
      <div className="relative z-10 w-full sm:w-1/2 flex flex-col items-start space-y-6">
        {/* Small Rotating Heading */}
        <h3 className="text-3xl font-medium uppercase tracking-wide">
          <WordRotate
            className="text-black inline-block"
            words={["Printing", "Design", "Branding"]}
          />
        </h3>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-6xl font-bold leading-tight text-white">
          Smarter Solutions for Your Ideas
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-gray-100 max-w-md">
          Royal Printers delivers custom printing services that help your brand
          stand out — from business cards to banners, we print it all.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-black text-white hover:bg-gray-800">
            Explore
          </Button>
        
          <Button variant="secondary" className="bg-orange-500 text-white hover:bg-orange-400">
            Get Quote
          </Button>
        </div>
      </div>

      {/* Right Side: Absolute Main Image with Floating Cards */}
      <div className="relative z-10 w-full sm:w-1/2 h-[400px] mt-12 sm:mt-0">
        {/* Absolute Main Image */}
        <div className="absolute top-0 right-0 w-72 sm:w-96">
          <Image
            src="/heroImage.png"
            alt="Royal Printers"
            width={400}
            height={400}
            className="object-contain w-full h-full"
          />

          {/* Floating Cards */}
          <div className="absolute top-5 left-0 bg-white shadow-lg rounded-xl p-3 text-sm font-medium text-gray-800">
            Premium Quality
          </div>
          <div className="absolute bottom-10 right-4 bg-white shadow-lg rounded-xl p-3 text-sm font-medium text-gray-800">
            Fast Delivery
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-lg rounded-xl p-3 text-sm font-medium text-gray-800">
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  )
}
