"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col gap-16 sm:mt-16 mt-2">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-200 to-amber-400 rounded-xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Royal Printers</h1>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Your trusted partner in high-quality printing solutions. From business cards to large format posters, we bring your ideas to life with precision and style.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">Get in Touch</Button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1581092795361-04a5ebd9dbd0?auto=format&fit=crop&w=800&q=80"
            alt="Printing"
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Company Story */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1599693244871-c1f4dbd39b23?auto=format&fit=crop&w=800&q=80"
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

      {/* Testimonials */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["John Doe", "Jane Smith", "Michael Lee"].map((client, i) => (
            <Card key={i} className="p-4 hover:shadow-lg transition">
              <CardContent>
                <p className="text-gray-700 mb-3">
                  "Royal Printers transformed our ideas into beautiful prints. Highly professional and reliable service!"
                </p>
                <p className="font-semibold">{client}</p>
              </CardContent>
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
