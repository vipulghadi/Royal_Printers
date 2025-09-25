"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./productCard";

const products = [
  {
    id: 1,
    name: "Business Cards",
    price: "₹199",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 2,
    name: "Flyers",
    price: "₹299",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 3,
    name: "Posters",
    price: "₹499",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 4,
    name: "T-Shirts",
    price: "₹799",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
];

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
    <section className="w-full py-10 border-b mb-10">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-center">New Arrivals</h2>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default NewArrivalProduct;
