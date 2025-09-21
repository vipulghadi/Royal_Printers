"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="w-full mt-12 flex flex-col gap-16">

      {/* Page Header */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Have a question or want to start a project with us? Fill out the form below or reach us directly.
        </p>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col md:flex-row gap-12">
        {/* Contact Form */}
        <div className="md:w-2/3">
          <Card className="shadow-lg">
            <CardContent className="p-8 flex flex-col gap-6">
              <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
              <CardDescription className="text-gray-600 mb-4">
                Fill out the form and we will get back to you as soon as possible.
              </CardDescription>
              
              <form className="flex flex-col gap-4">
                <Input placeholder="Your Name" type="text" required />
                <Input placeholder="Email Address" type="email" required />
                <Input placeholder="Phone Number" type="tel" required />
                <Textarea placeholder="Your Message" rows={5} required />
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-gray-700">123 Royal Street, Mumbai, India</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-700">contact@royalprinters.com</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-700">+91 98765 43210</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.123456789!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c63abc123456%3A0xabcdef1234567890!2sMumbai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
          title="Royal Printers Location"
        ></iframe>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-200 p-8 rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-gray-700 mb-6">Contact us today and let's bring your ideas to life!</p>
        <Button className="bg-black text-white hover:bg-gray-800">Get in Touch</Button>
      </section>

    </div>
  );
}
