"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 rounded-2xl mt-8 mb-4">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo & About */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <img
                src="https://picsum.photos/seed/logoabout/40/40"
                alt="Company Logo"
                className="h-10 w-10 mr-2 rounded-full"
              />
              <span className="text-2xl font-bold text-white">YourBrand</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              We are dedicated to providing the best service and products.
              Our mission is to innovate and lead in our industry, creating
              value for our customers and community.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "LinkedIn"].map((name, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  aria-label={name}
                >
                  <i className={`ri-${name.toLowerCase()}-fill text-xl`}></i>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">YourBrand</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
