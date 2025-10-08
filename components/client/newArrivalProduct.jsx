"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./productCard";
import { dummyProducts } from "@/lib/dummyData";


function NewArrivalProduct() {
  // Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // each card animates slightly after the previous
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="w-[90%] mx-auto py-10  ">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-center">New Arrivals</h2>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {dummyProducts.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default NewArrivalProduct;
