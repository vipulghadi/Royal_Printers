"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const clientStories = [
  {
    id: 1,
    name: "ABC Corp",
    tagline: "Full branding and print materials",
    image: "https://iili.io/33etOiX.png",
    details:
      "We collaborated with ABC Corp to design and print their complete brand identity — from business cards and brochures to event banners. The focus was on delivering vibrant, professional-quality print that matches their innovative brand tone.",
  },
  {
    id: 2,
    name: "XYZ Enterprises",
    tagline: "Brochures and Flyers that Convert",
    image: "https://iili.io/33etkfn.png",
    details:
      "XYZ Enterprises needed creative marketing materials to boost sales. We delivered eye-catching brochure designs and high-quality prints that helped them stand out in their market campaigns.",
  },
  {
    id: 3,
    name: "Tech Solutions",
    tagline: "Product Launch Prints & Packaging",
    image: "https://iili.io/33etvls.png",
    details:
      "For Tech Solutions’ new product line, we created sleek packaging and banner designs. The consistent color palette and finish helped position their product as premium and tech-forward.",
  },
    {
    id: 4,
    name: "Tech Solutions",
    tagline: "Product Launch Prints & Packaging",
    image: "https://iili.io/33etvls.png",
    details:
      "For Tech Solutions’ new product line, we created sleek packaging and banner designs. The consistent color palette and finish helped position their product as premium and tech-forward.",
  },
    {
    id: 5,
    name: "Tech Solutions",
    tagline: "Product Launch Prints & Packaging",
    image: "https://iili.io/33etvls.png",
    details:
      "For Tech Solutions’ new product line, we created sleek packaging and banner designs. The consistent color palette and finish helped position their product as premium and tech-forward.",
  },
    {
    id: 6,
    name: "Tech Solutions",
    tagline: "Product Launch Prints & Packaging",
    image: "https://iili.io/33etvls.png",
    details:
      "For Tech Solutions’ new product line, we created sleek packaging and banner designs. The consistent color palette and finish helped position their product as premium and tech-forward.",
  },
    {
    id: 7,
    name: "Tech Solutions",
    tagline: "Product Launch Prints & Packaging",
    image: "https://iili.io/33etvls.png",
    details:
      "For Tech Solutions’ new product line, we created sleek packaging and banner designs. The consistent color palette and finish helped position their product as premium and tech-forward.",
  },
];

export default function ClientStories() {
  return (
    <section className="w-full bg-white dark:bg-[#0A2025] py-16 px-8">
      <div className="mx-auto max-w-[1160px]">
        {/* Section Header */}
        <header className="text-center mb-10">
          <h2 className="text-[#0A2025] dark:text-white text-3xl font-bold">
            Our Client Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-2xl mx-auto">
            Real stories from our happy clients who trusted{" "}
            <span className="text-[#3E9D26] font-semibold">Royal Printers</span>{" "}
            to make their brand stand out.
          </p>
        </header>

        {/* Cards Section */}
        <main className="flex flex-col md:flex-row gap-10 flex-wrap justify-center">
          {clientStories.map((client) => (
            <div
              key={client.id}
              className="bg-white dark:bg-gray-900 p-4 rounded-xl  transition-all w-full md:w-[31%] flex flex-col items-start"
            >
              <img
                src={client.image}
                alt={client.name}
                className="rounded-xl mb-6 w-full h-64 object-cover"
              />
              <h3 className="text-[#0A2025] dark:text-white text-xl font-semibold">
                {client.name}
              </h3>
              <p className="mt-3 mb-6 text-gray-600 dark:text-gray-300 text-sm">
                {client.tagline}
              </p>

              {/* Dialog Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                
                    className="text-white bg-orange-500 hover:bg-orange-600"
                  >
                    View Story
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-white dark:bg-gray-900 rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {client.name}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-gray-300">
                      {client.tagline}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="rounded-lg object-cover mb-4 w-full h-64"
                    />
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                      {client.details}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </main>
      </div>
    </section>
  );
}
