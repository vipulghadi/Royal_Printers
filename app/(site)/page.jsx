"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/client/hero";
import { Marquee } from "@/components/magicui/marquee";
import { HomeMarqueeProduct, MarqueeDemo } from "@/components/client/homeMarquee";
import NewArrivalProduct from "@/components/client/newArrivalProduct";
import PopularServiceSection from "@/components/client/PopularServiceSection";
import ProductSection from "@/components/client/productSection";
import WhyChooseUsSection from "@/components/client/WhyChooseUsSection";

import PopularCategorySection from "@/components/client/popularCategorySection";

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
