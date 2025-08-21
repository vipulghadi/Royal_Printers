"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const onSubmit = (e) => {
    e.preventDefault()
    alert("Thanks for contacting Royal Printers! We'll get back to you.")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="text-2xl font-semibold">Contact Us</h1>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input id="mobile" name="mobile" type="tel" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required rows={5} />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="font-medium">Royal Printers</div>
          <div className="text-sm text-muted-foreground mt-1">
            Phone: +91 98765 43210<br />
            Email: support@royalprinters.example<br />
            WhatsApp: +91 98765 43210<br />
            Address: 123 Print Street, Mumbai, India
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border">
          <iframe
            title="Royal Printers location"
            src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%" height="360" style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
