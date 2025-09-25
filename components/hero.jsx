"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WordRotate } from "@/components/ui/word-rotate"
import { DotPattern } from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"

export default function Hero() {
  return (
    <section className="relative flex flex-col sm:flex-row items-center justify-between w-full min-h-[80vh] rounded-2xl overflow-hidden  bg-green-500">


      {/* Left Side */}
      <div className="relative z-10 w-full sm:w-1/2 flex flex-col items-start space-y-6 p-6">
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
      <div className="relative z-10 w-full sm:w-1/2  h-[400px] sm:h-[500px] mt-12 sm:mt-0  flex items-center justify-center  overflow-hidden">
      <img src="https://imagine-public.x.ai/imagine-public/images/6c7c485a-a89a-4d4b-8ac3-77c35d15cf54.png?cache=1" alt="" className="absolute "/>
    
        
      </div>
    </section>
  )
}
