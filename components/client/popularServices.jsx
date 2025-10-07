"use client";

import React from "react";

export default function PopularServices() {
  return (
    <div className="relative overflow-hidden bg-orange-100">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Popular Printing Services
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              At <strong>Royal Printers</strong>, we specialize in a wide range of
              <strong> professional printing solutions</strong> designed to elevate your
              brand and business presence. From <strong>custom banners</strong> and
              <strong> visiting cards</strong> to <strong>photo gifts</strong> and
              <strong> packaging solutions</strong>, we deliver precision, quality, and
              creativity in every print.
            </p>


          </div>

          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src={"/Banner.png"}
                          className="h-full w-full object-cover object-center"
                          alt="Banner Printing"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={"/GiftHamper.png"}
                          alt="Gift Hamper Printing"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={"/Mug.png"}
                          alt="Custom Mug Printing"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={"/Packaging.png"}
                          alt="Packaging Solutions"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={"/PhotoAlbum.png"}
                          alt="Photo Album Printing"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={"/SchoolID.png"}
                          alt="School ID Cards"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={"/Sticker.png"}
                          alt="Sticker Printing"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="inline-block rounded-md border border-transparent bg-red-500 py-3 px-8 text-center font-medium text-white hover:bg-red-600"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
