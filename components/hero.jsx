"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="h-[90vh] sm:h-[80vh] w-full bg-[#f46817] rounded-2xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 md:py-16 overflow-hidden">
      
      {/* Left side: Text */}
      <div className="flex flex-col gap-6 text-white max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Print Smarter with <span className="text-yellow-300">Royal Printers</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          High-quality printing for your business, events, and personal needs. 
          Fast delivery, premium materials, and unbeatable prices.
        </p>
        <div>
          <Button size="lg" className="bg-white text-[#f46817] font-semibold hover:bg-white/90">
            Get Started
          </Button>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="mt-10 md:mt-0 md:ml-10 flex justify-center">
        <Image
          src="/heroImage.png" // 
          alt="Printing illustration"
          width={550}
          height={550}
          className="w-full max-w-sm md:max-w-md object-contain overflow-hidden"
        />
      </div>
    </section>
  )
}
