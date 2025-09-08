'use client';

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



  return (
    <div className="w-auto">
      <Hero />


    </div>
  );
}


