"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col gap-16 sm:mt-16 mt-2">



      {/* Company Story */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampaigns.sgs.com%2F-%2Fmedia%2Fglobal%2Fimages%2Fstructural-website-images%2Fasset-link-images%2Fcampaigns-images%2Fisolated-campaign-banners%2Fclient-stories-600px.png&f=1&nofb=1&ipt=33aa707d961f39aafd25599560d56c5d2b45df388fa559ca1af547dc69e15081"
            alt="Company Story"
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-3">
            Royal Printers was founded with a vision to provide top-notch printing solutions to businesses and individuals alike. With over a decade of experience, we have mastered the art of transforming ideas into tangible prints.
          </p>
          <p className="text-gray-700">
            Our mission is to deliver high-quality, affordable, and reliable printing services that help our clients stand out in their industry.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Business Cards</CardTitle>
              <CardDescription>Professional designs to make your first impression count.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Flyers & Brochures</CardTitle>
              <CardDescription>Eye-catching marketing materials to promote your brand.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Posters & Banners</CardTitle>
              <CardDescription>High-quality prints in large formats for events and campaigns.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Custom Merchandise</CardTitle>
              <CardDescription>T-shirts, mugs, and more to make your brand memorable.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Alice", "Bob", "Charlie", "Diana"].map((name, i) => (
            <Card key={i} className="text-center p-4 hover:shadow-lg transition">
              <img
                src={`https://i.pravatar.cc/150?img=${i + 10}`}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
              />
              <CardTitle>{name}</CardTitle>
              <CardDescription>Team Member</CardDescription>
            </Card>
          ))}
        </div>
      </section>



      {/* Call to Action */}
      <section className="bg-amber-200 p-8 rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Print Your Ideas?</h2>
        <p className="text-gray-700 mb-6">Contact us today and let's bring your vision to life!</p>
        <Button className="bg-black text-white hover:bg-gray-800">Contact Us</Button>
      </section>
    </div>
  );
}
