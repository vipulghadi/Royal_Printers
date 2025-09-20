"use client"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello,%20I%20want%20to%20deal%20with%20you%20on%20WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce"
    >
      {/* WhatsApp Icon */}
      <div className="bg-white rounded-full p-1 shadow-md">
        <MessageCircle className="w-6 h-6 text-green-500" />
      </div>

      {/* Text */}
      <span className="font-medium">Connect with us</span>
    </a>
  )
}
