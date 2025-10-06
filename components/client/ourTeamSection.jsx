"use client";

import React from "react";

export default function OurTeam() {
  const instructors = [
    {
      name: "Rajesh Kumar",
      role: "Classical Music Director",
      img: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "20+ years in classical music, performed internationally, and trained hundreds of students.",
    },
    {
      name: "Priya Singh",
      role: "Dance Instructor",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Award-winning dancer specializing in classical and contemporary styles.",
    },
    {
      name: "Vikram Mehta",
      role: "Acting Coach",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "15 years in theatre and film, passionate about guiding aspiring actors.",
    },
    {
      name: "Aisha Kapoor",
      role: "Photography Mentor",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Fashion and portrait photographer featured in leading magazines.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Meet The Team</h2>
        <p className="text-lg text-gray-600 mb-10">
          Learn from experts with years of real-world experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((inst, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={inst.img}
                  alt={inst.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold">{inst.name}</h3>
                <p className="text-tab-purple">{inst.role}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg translate-y-full group-hover:translate-y-0 transition duration-300 shadow-lg">
                <p className="text-sm text-gray-700">{inst.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/team"
            className="inline-block bg-tab-purple text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-tab-teal transition-transform hover:-translate-y-1"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
