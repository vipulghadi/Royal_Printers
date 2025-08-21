"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function BannerService() {


  return (
    <div className="md:min-h-screen w-[100vw]  flex bg-black gap-0 text-white mt-10 ">
      {/* Hero Banner Section */}
      

          {/* Left Side - Image Slideshow */}
          <div className="w-full sm:w-1/2 bg-black ">
              <img
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bannerworld.co.uk%2Fwp-content%2Fuploads%2FVinylbannersprinting.jpg&f=1&nofb=1&ipt=e02b16704ec5c0278d8083b109d7c10e8957707bf395963954035a015c97f003"
                      
                      className="w-full h-full object-cover"
                    />

          </div>

          {/* Right Side - Content */}
          <div className="px-10 w-full sm:w-1/2   py-10">
            <div className="space-y-4">


              <h1 className="text-6xl md:text-4xl lg:text-7xl font-bold ">
                    Transform your business visibility with our

              </h1>

    
            </div>




          </div>
        </div>


  )
}
