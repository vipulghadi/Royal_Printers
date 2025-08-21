"use client"
import idCard from "@/public/id_card.png";
import Image from "next/image";
import BrochureCard from "@/public/brochures.png";
import tshirtCard from "@/public/tshirts.png";
export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-100">
            {/* Floating Product Images */}
            <div className="absolute h-full w-full ">
            
             <Image src={idCard} alt="ID Card" className="w-80 h-80 " />
            
 <Image src={tshirtCard} alt="ID Card" className="absolute bottom-[-100px] right-[-150px] " />

    
            </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center">
          <div className="max-w-4xl mx-auto relative">
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
We Don’t Just Print, We Make You Shine
            </h2>



            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From corporate branding to personal gifts, we've got you covered with our comprehensive printing services.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
