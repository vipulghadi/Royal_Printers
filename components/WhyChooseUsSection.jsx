"use client";
import { CheckCircle, Clock, ThumbsUp, Shield } from "lucide-react";

export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-gray-50 py-16 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Choose <span className="text-green-500">Royal Printers</span>?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          At Royal Printers, we combine <strong>affordable printing services</strong>,
          <strong> fast delivery</strong>, and <strong>premium quality</strong> to
          ensure your business stands out. With years of experience and trusted
          expertise, we’ve become the go-to printing solution for individuals,
          startups, and enterprises across India.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <CheckCircle className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">High Quality Prints</h3>
            <p className="text-sm text-gray-600">
              Crisp, vibrant colors and durable finishes that make your brand shine.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <Clock className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">On-Time Delivery</h3>
            <p className="text-sm text-gray-600">
              We value your deadlines — expect fast, reliable printing services.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <ThumbsUp className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Affordable Pricing</h3>
            <p className="text-sm text-gray-600">
              Get premium quality at competitive rates that fit your budget.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <Shield className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trusted & Secure</h3>
            <p className="text-sm text-gray-600">
              With 5+ years of expertise, we are a trusted printing partner for businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
