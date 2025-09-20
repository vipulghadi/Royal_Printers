"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="sm:h-[80vh] w-full bg-[#f46817] rounded-2xl flex overflow-hidden flex-wrap">
      {/* Left side: Text */}
      <div className="h-[50vh] sm:h-full w-full sm:w-7/12 text-white flex flex-col justify-center items-start p-8">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Print Smarter with <span className="text-black">Royal Printers</span>
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          High-quality printing solutions tailored for your business & personal needs.
        </p>
        <Button className="bg-black text-white hover:bg-gray-800">
          Get Started
        </Button>
      </div>

      {/* Right side: Image with responsive sizes */}
      <div className="h-[30vh] sm:h-full w-full sm:w-5/12 flex justify-center items-center  ">
        <Image
          src="/heroImage.png"
          alt="Printing illustration"
          width={300}   // fallback
          height={300}  // fallback
          className="
            w-[210%] h-[210%]      
            sm:w-[270%] sm:h-[270%]  
            md:w-96 md:h-96  /* 
            lg:w-[650px] lg:h-[650px] 
            object-contain
            
          "
        />
      </div>
    </section>
  )
}
