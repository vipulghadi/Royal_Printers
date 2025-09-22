"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/hero";
import { Marquee } from "@/components/magicui/marquee";
import { HomeMarqueeProduct, MarqueeDemo } from "@/components/homeMarquee";
import NewArrivalProduct from "@/components/newArrivalProduct";
import PopularServiceSection from "@/components/PopularServiceSection";
import ProductSection from "@/components/productSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

import PopularCategorySection from "@/components/popularCategorySection";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-auto">
      <Hero />
      <HomeMarqueeProduct />
<NewArrivalProduct/>
      <PopularServiceSection />
      <PopularCategorySection/>
 <ProductSection/>
    
     
      <WhyChooseUsSection/>
    </div>
  );
}
