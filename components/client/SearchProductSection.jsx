"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { dummyProducts } from "@/lib/dummyData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { CustomBreadcrumb } from "../shared/customBreadCrumb";
export default function SearchProductSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = dummyProducts.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <section
      className="w-full  h-[90vh] sm:h-[75vh] py-10 px-6 sm:px-12 
      bg-gradient-to-b from-red-700 via-red-600 to-red-500 text-white 
      bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/searchProductBG.jpg')",
      }}
    >

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-800/60 to-red-500/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-8">
         
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
        <div className="flex mb-2 sm:mb-1">
                    <div className="inline-block bg-slate-200 px-2 py-1 rounded-2xl">
            <CustomBreadcrumb data={[
                {
                    "title":"home",
                    "link":"/"
                },
                {
                    "title":"products"
                }
            ]} textColor="text-black"/>
        </div>
        </div>

          <h2 className="text-3xl sm:text-4xl font-bold">
            Find Your Perfect Printing Solution
          </h2>
          <p className="mt-2 text-white/90 max-w-2xl mx-auto">
            Search through our premium printing products — from business cards
            to custom gifts. Crafted for professionals and creatives alike.
          </p>
        </motion.div>

        {/* Trending Product Thumbnails */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {dummyProducts.slice(0, 6).map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transform transition"
              onClick={() => {
                handleSearch(item.name);
                setOpen(true);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg object-cover border-2 border-white"
              />
              <span className="mt-2 text-sm font-semibold sm:block hidden">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Input (opens dialog) */}
        <div className="relative w-full max-w-xl mx-auto bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            readOnly
            onClick={() => setOpen(true)}
            placeholder="Search for products..."
            className="w-full py-3 px-4 rounded-lg text-gray-900 font-medium focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* 🔍 Fixed-size Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-2xl w-full h-[500px] flex flex-col justify-start"
          aria-describedby="search-products-description"
        >
          <DialogHeader>
            <DialogTitle className="mx-auto text-center">Search Products</DialogTitle>
            <DialogDescription id="search-products-description">
              Type to find your ideal printing products.
            </DialogDescription>
          </DialogHeader>

          {/* Search Input */}
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full py-2 px-3 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Results Section */}
          <div className="flex-1 overflow-y-auto p-2  rounded-lg">
            {searchTerm.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                🔍 Start typing to search for products
              </p>
            ) : results.length > 0 ? (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {results.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="p-2 border rounded-lg flex flex-col items-center hover:bg-red-50 cursor-pointer transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover mb-2"
                    />
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 mt-10"
              >
                😕 No products found
              </motion.p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
