"use client"

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">About Royal Printers</h1>
      <p className="text-muted-foreground">
        We are a modern printing company delivering premium-quality prints at affordable prices. Our mission is to empower
        businesses and creators with beautiful, reliable print products. With years of experience and state-of-the-art
        machinery, we focus on quality, speed, and customer happiness.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <img src="/placeholder-v56tu.png" alt="Factory machines" className="rounded-lg border object-cover w-full h-72" />
        <img src="/team-photo-print.png" alt="Royal Printers team" className="rounded-lg border object-cover w-full h-72" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>Phone: +91 98765 43210</p>
        <p>Email: support@royalprinters.example</p>
        <p>Address: 123 Print Street, Mumbai, India</p>
      </div>
    </div>
  )
}
