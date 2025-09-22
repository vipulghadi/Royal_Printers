"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="w-full  py-12 flex flex-col gap-16">

      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Royal Printers</h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Have a question or want to start a project with us? Reach out via the form or check our address below.
        </p>
      </section>

      {/* Main Section: Image + Form */}
      <section className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Company Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.cms.yp.ca%2Fecms%2Fmedia%2F1%2F1-royalprinters-6045255441-owner-700x500.jpg&f=1&nofb=1&ipt=44a2ec55a9d6c27750735db7d4f3925c67d0fb357c795ea5b068b5508b369658"
            alt="Royal Printers Office"
            className="rounded-2xl w-full max-w-md object-cover shadow-lg"
          />
        </div>

        {/* Right: Contact Form */}
        <div className="md:w-1/2">
          <Card className="shadow-lg">
            <CardContent className="p-8 flex flex-col gap-6">
              <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
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
      </section>


    </div>
  );
}
