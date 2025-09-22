"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const clientStories = [
  {
    id: 1,
    name: "ABC Corp",
    description: "We designed their full branding and print materials.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081",
  },
  {
    id: 2,
    name: "XYZ Enterprises",
    description: "Created high-quality brochures and flyers.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081",
  },
  {
    id: 3,
    name: "Tech Solutions",
    description: "Printed banners and packaging for product launches.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081",
  },
  {
    id: 4,
    name: "Creative Minds",
    description: "Delivered custom stickers and labels for their products.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081",
  },
  {
    id: 5,
    name: "StartUp Hub",
    description: "Full print solutions for events and promotions.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081",
  },
  {
    id: 6,
    name: "Global Ventures",
    description: "Premium business cards and office stationery.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081",
  },
  {
    id: 7,
    name: "Bright Ideas",
    description: "Eye-catching banners and marketing materials.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081",
  },
];

export default function ClientStories() {
  return (
    <section className="py-16 px-6 sm:px-12 ">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
          Our Client Stories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how we’ve helped our clients grow their brand and business through our custom printing solutions.
        </p>
      </div>

      <BentoGrid className="max-w-6xl mx-auto gap-6">
        {clientStories.map((story, i) => (
          <BentoGridItem
            key={story.id}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            header={
              <div className="w-full h-48 relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
              </div>
            }
            title={story.name}
            description={story.description}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
