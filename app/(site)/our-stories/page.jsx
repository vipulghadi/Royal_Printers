"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const clientStories = [
  {
    id: 1,
    client: "ABC Tech",
    project: "Business Cards & Brochures",
    description:
      "We designed and printed high-quality business cards and brochures for ABC Tech to boost their marketing and professional presence.",
    testimonial:
      "Royal Printers delivered exactly what we needed! Our business cards and brochures look professional and have received so many compliments. Highly recommend!",
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fclient-success-story_1029473-215076.jpg&f=1&nofb=1&ipt=e7bd22688a6eda11cdb18952ac94f944e3a9d9b945ddd1e815e8f28b35b46807",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gov.br%2Fplanaltoacci%2Fen%2Flatest-news%2F2025%2F03%2Flula-to-vietnam-business-leaders-20182019milestone-for-new-stage-of-cooperation20192019%2F29032025_forum_empresarial32a.jpg%2F%40%40images%2F2b3a38c7-ecda-4220-aab6-042812a03af1.jpeg&f=1&nofb=1&ipt=d7a9e8f53d76ec5197003c34cf637567f1b3b758849a12418aa23d55dec24a61",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.corebusiness.com.au%2Fwp-content%2Fuploads%2F2018%2F03%2FiStock_000014528855Medium-1698x849.jpg&f=1&nofb=1&ipt=d87479ad20cd4d917a4a256065e9b0786aa423f512bf303c8269e5cee2812855",
    ],
  },
  {
    id: 2,
    client: "GreenLeaf Cafe",
    project: "Menu Posters & Flyers",
    description:
      "We created visually appealing menu posters and flyers for GreenLeaf Cafe to attract more customers and enhance their in-store experience.",
    testimonial:
      "Amazing work! The menu posters and flyers look fantastic and really helped in boosting our cafe's branding. The team was professional and responsive.",
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fclient-success-story_1029473-215076.jpg&f=1&nofb=1&ipt=e7bd22688a6eda11cdb18952ac94f944e3a9d9b945ddd1e815e8f28b35b46807",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gov.br%2Fplanaltoacci%2Fen%2Flatest-news%2F2025%2F03%2Flula-to-vietnam-business-leaders-20182019milestone-for-new-stage-of-cooperation20192019%2F29032025_forum_empresarial32a.jpg%2F%40%40images%2F2b3a38c7-ecda-4220-aab6-042812a03af1.jpeg&f=1&nofb=1&ipt=d7a9e8f53d76ec5197003c34cf637567f1b3b758849a12418aa23d55dec24a61",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.corebusiness.com.au%2Fwp-content%2Fuploads%2F2018%2F03%2FiStock_000014528855Medium-1698x849.jpg&f=1&nofb=1&ipt=d87479ad20cd4d917a4a256065e9b0786aa423f512bf303c8269e5cee2812855",
    ]
  },
];

export default function ClientStories() {
  return (
    <div className="w-full mt-12 flex flex-col gap-24">

      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Client Stories</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          See how we helped our clients bring their ideas to life with high-quality printing solutions and hear what they have to say.
        </p>
      </section>

      {/* Modern Client Stories Layout */}
      {clientStories.map((story, index) => (
        <section
          key={story.id}
          className={`flex flex-col md:flex-row gap-8 items-center ${
            index % 2 === 0 ? "" : "md:flex-row-reverse"
          }`}
        >
          {/* Images Grid */}
          <div className="md:w-1/2 grid grid-cols-2 gap-2">
            {story.images.map((img, idx) => (
              <div key={idx} className={`overflow-hidden rounded-xl ${idx === 0 ? "col-span-2" : ""}`}>
                <img
                  src={img}
                  alt={`${story.client} image ${idx + 1}`}
                  className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Story Text */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{story.client}</h2>
            <h3 className="text-xl font-semibold text-gray-600">{story.project}</h3>
            <p className="text-gray-700">{story.description}</p>

            {/* Testimonial */}
            <blockquote className="border-l-4 border-amber-400 pl-4 italic text-gray-800 mt-2">
              "{story.testimonial}"
            </blockquote>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-amber-200 p-8 rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Want Your Story Featured?</h2>
        <p className="text-gray-700 mb-6">
          Contact us today and let us help you create high-quality printed materials for your business.
        </p>
        <Button className="bg-black text-white hover:bg-gray-800">Contact Us</Button>
      </section>
    </div>
  );
}
