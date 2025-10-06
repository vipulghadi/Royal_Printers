"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function ContactUs() {
  return (
    <div className="w-full py-16 flex flex-col gap-16">

      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Royal Printers
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Have a question or want to start a project with us? Reach out via the form or check our address below.
        </p>
      </section>

      {/* Main Section: Image + Form */}
      <section className="flex flex-col md:flex-row gap-10 items-stretch max-w-6xl mx-auto w-full">
        
        {/* Left: Company Image */}
        <div className="md:w-1/2 flex">
          <img
            src="https://static.cms.yp.ca/ecms/media/1/1-royalprinters-6045255441-owner-700x500.jpg"
            alt="Royal Printers Office"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Right: Contact Form */}
        <div className="md:w-1/2 flex">
          <Card className="w-full rounded-2xl shadow-xl flex flex-col justify-center">
            <CardContent className="p-8 flex flex-col gap-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Send Us a Message
              </CardTitle>
              <form className="flex flex-col gap-4">
                <Input placeholder="Your Name" type="text" required />
                <Input placeholder="Email Address" type="email" required />
                <Input placeholder="Phone Number" type="tel" required />
                <Textarea placeholder="Your Message" rows={5} required />
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </section>

    </div>
  );
}
