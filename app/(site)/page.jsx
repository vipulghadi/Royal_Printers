"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/hero";
import ProductCard from "@/components/product-card";
import TestimonialCard from "@/components/testimonial-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import ProductCategoryCard from "@/components/product-category-card";
import WhyChooseCard from "@/components/why-choose-card";
import BannerService from "@/components/banner-service";
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const res = await fetch("/api/products");
      const json = await res.json();
      if (mounted) {
        setProducts(json.products || []);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const byCategory = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    }
    return map;
  }, [products]);

  const categories = useMemo(() => {
    const toTitle = (s) =>
      s
        ?.split("-")
        .map((w) => w[0]?.toUpperCase() + w.slice(1))
        .join(" ") || "Category";
    return Array.from(byCategory.entries()).map(([key, list]) => ({
      key,
      label: toTitle(key),
      image: list[0]?.image || "/abstract-category.png",
    }));
  }, [byCategory]);

  const popular = useMemo(() => {
    return products
      .slice()
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 8);
  }, [products]);

  const trending = useMemo(() => {
    return products
      .slice()
      .sort(
        (a, b) =>
          (b.popularity || 0) +
          Math.random() * 10 -
          ((a.popularity || 0) + Math.random() * 10)
      )
      .slice(0, 6);
  }, [products]);

  const branded = useMemo(
    () =>
      products
        .filter((p) => ["tshirts", "mugs"].includes(p.category))
        .slice(0, 6),
    [products]
  );

  const newArrival = useMemo(() => {
    const arr = products.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 6);
  }, [products]);

  return (
    <div>
      <Hero />

      {/* Top categories - compact cards */}
<section className="max-w-7xl mx-auto px-4 py-10 mt-10 ">
  <div className="flex items-center justify-between">
    <h2 className=" text-3xl lg:text-4xl font-bold lg:mx-auto">Top Categories</h2>

  </div>

  <div className="grid gap-4 mt-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
    {Array.from({ length: 10 }).map((_, i) => (
      <ProductCategoryCard key={i} />
    ))}
  </div>
    <div className="flex justify-center mt-6">
              <Button asChild variant="ghost" className="border  rounded-[5px] border-black px-10 py-5 text-md hover:bg-black hover:text-white transition-colors">
            <Link href="/products" aria-label="Browse popular products">
              Explore More 
            </Link>
          </Button>
  </div>
</section>

      {/* Our Most Popular Products - compact cards */}
      <section className="max-w-7xl mx-auto px-4 py-10 mt-10 h-auto ">
        <div className="flex items-center justify-between">
          <h2 className=" text-3xl sm:text-4xl font-bold lg:mx-auto"> Popular Products</h2>
        </div>
  <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCard key={i} />
    ))}

  </div>
  <div className="flex justify-center mt-6">
              <Button asChild variant="ghost" className="border  rounded-[5px] border-black px-10 py-5 text-md hover:bg-black hover:text-white transition-colors">
            <Link href="/products" aria-label="Browse popular products">
              Browse all 
            </Link>
          </Button>
  </div>
        
      </section>

    {/* Display Images section */}
    <BannerService/>
    


      {/* Special Offers */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl overflow-hidden">
              <img
                src="/historical-printing-team.png"
                alt="Royal Printers production team at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold">Special Offers</h3>
              <p className="text-muted-foreground mt-2">
                Save more with bundle deals and seasonal discounts.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-lg border p-4 bg-background">
                  <div className="text-sm font-medium">
                    Visiting Cards Combo
                  </div>
                  <div className="text-2xl font-bold mt-2">₹199</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    500 cards, premium matte
                  </p>
                </div>
                <div className="rounded-lg border p-4 bg-background">
                  <div className="text-sm font-medium">Custom Mug Bundle</div>
                  <div className="text-2xl font-bold mt-2">₹349</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    2 photo mugs
                  </p>
                </div>
              </div>
              <Button asChild className="mt-6">
                <Link href="/products">Start Printing Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 py-12 mt-5 mb-3">
        <div className="text-6xl font-semibold mx-auto  px-3 pt-2 rounded-full flex justify-center ">Why choose Royal Printers</div>
        <div className="flex justify-center items-center gap-4 mt-12">
<WhyChooseCard/>
        </div>
      </section>



      <Separator />



      {/* Trust bar */}
      <section className="bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <Trust>ISO Certified</Trust>
            <Trust>Eco-friendly Inks</Trust>
            <Trust>Secure Payments</Trust>
            <Trust>30k+ Happy Customers</Trust>
            <Trust className="text-primary">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Satisfaction Guaranteed
            </Trust>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-xl border p-4 bg-background">
      <div className="flex items-center gap-2 font-medium">
        {icon}
        {title}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{desc}</div>
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="rounded-xl border p-4 bg-background">
      <div className="text-4xl font-bold text-muted-foreground/50">{n}</div>
      <div className="font-medium mt-1">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}

function Trust({ children, className = "" }) {
  return (
    <div className={`text-sm inline-flex items-center ${className}`}>
      {children}
    </div>
  );
}
