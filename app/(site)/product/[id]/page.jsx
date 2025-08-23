'use client';

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageCircle, Phone, Users } from "lucide-react"
import ProductCard from "@/components/product-card"
import Reviews from "@/components/reviews"
import PriceCalculator from "@/components/price-calculator"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [price, setPrice] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState(null)
  const [customerName, setCustomerName] = useState("")
  const [customerNotes, setCustomerNotes] = useState("")
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/product/${id}`)
      const json = await res.json()
      setProduct(json.product)
      setPrice(json.product?.priceFrom || 0)

      // Load recommended products
      const recRes = await fetch(`/api/products`)
      const recJson = await recRes.json()
      const filtered = recJson.products?.filter((p) => p.id !== id).slice(0, 4) || []
      setRecommendedProducts(filtered)
    }
    load()
  }, [id])

  const images = product?.images?.length
    ? product.images
    : ["/product-print-preview-1.png", "/product-print-preview-2.png", "/product-print-preview-3.png"]

  const avgRating = useMemo(() => {
    if (!product?.reviews?.length) return 0
    const sum = product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0)
    return Math.round((sum / product.reviews.length) * 10) / 10
  }, [product])

  const handleWhatsAppContact = () => {
    if (!customerName.trim()) {
      alert("Please enter your name first")
      return
    }

    const { quantity, material, size, sides } = selectedOptions || {}
    const whatsappNumber = "919876543210" // Replace with your actual WhatsApp number

    const message = `Hi Royal Printers! 👋

I'm interested in: *${product?.name}*

*Customer Details:*
Name: ${customerName}

*Product Configuration:*
• Quantity: ${quantity || "Not selected"}
• Material: ${material || "Not selected"}
• Size: ${size || "Not selected"}
• Sides: ${sides || "Not selected"}

*Estimated Cost: ₹${price}*

${customerNotes ? `*Additional Notes:*\n${customerNotes}` : ""}

Please provide me with the final quote and delivery timeline. Thank you!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-muted-foreground">Loading product...</div>
      </div>
    )
  }

  return (
    <div>
        Product Detail Page Coming Soon!
    </div>
    
  )
}

// <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
    //   {/* Main Product Section */}
    //   <div className="grid gap-8 lg:grid-cols-2">
    //     {/* Left Side - Images */}
    //     <div className="space-y-4">
    //       <Card className="overflow-hidden">
    //         <CardContent className="p-0">
    //           <img
    //             src={images[0] || "/placeholder.svg"}
    //             alt={`${product.name} main image`}
    //             className="w-full h-[500px] object-cover"
    //           />
    //         </CardContent>
    //       </Card>

    //       {/* Thumbnail Images */}
    //       <div className="grid grid-cols-3 gap-3">
    //         {images.map((src, i) => (
    //           <Card key={i} className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary">
    //             <CardContent className="p-0">
    //               <img
    //                 src={src || "/placeholder.svg"}
    //                 alt={`${product.name} view ${i + 1}`}
    //                 className="w-full h-24 object-cover"
    //               />
    //             </CardContent>
    //           </Card>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Right Side - Product Details */}
    //     <div className="space-y-6">
    //       {/* Product Info */}
    //       <div>
    //         <h1 className="text-3xl font-bold">{product.name}</h1>
    //         <div className="flex items-center gap-3 mt-2">
    //           <div className="flex items-center gap-1">
    //             {Array.from({ length: 5 }).map((_, i) => (
    //               <Star
    //                 key={i}
    //                 className={`w-4 h-4 ${i < Math.round(avgRating) ? "fill-primary text-primary" : "stroke-muted-foreground"}`}
    //               />
    //             ))}
    //           </div>
    //           <span className="text-sm text-muted-foreground">
    //             {avgRating} ({product.reviews?.length || 0} reviews)
    //           </span>
    //         </div>
    //         <div className="mt-3">
    //           <Badge variant="secondary" className="text-lg px-3 py-1">
    //             Starting at ₹{product.priceFrom}
    //           </Badge>
    //         </div>
    //       </div>

    //       <Separator />

    //       {/* Product Description */}
    //       <div>
    //         <h3 className="font-semibold mb-2">Description</h3>
    //         <p className="text-muted-foreground leading-relaxed">{product.description}</p>
    //       </div>

    //       <Separator />

    //       {/* Price Calculator */}
    //       <div>
    //         <h3 className="font-semibold mb-4">Customize Your Order</h3>
    //         <PriceCalculator
    //           basePrice={product.priceFrom}
    //           options={product.options}
    //           onPriceChange={setPrice}
    //           onOptionsChange={setSelectedOptions}
    //         />
    //       </div>

    //       {/* Estimated Cost */}
    //       <Card className="bg-primary/5 border-primary/20">
    //         <CardContent className="p-4">
    //           <div className="flex items-center justify-between">
    //             <span className="text-lg font-medium">Estimated Cost:</span>
    //             <span className="text-3xl font-bold text-primary">₹{price}</span>
    //           </div>
    //           <p className="text-sm text-muted-foreground mt-1">
    //             *Final price may vary based on design complexity and additional requirements
    //           </p>
    //         </CardContent>
    //       </Card>

    //       <Separator />

    //       {/* Customer Details */}
    //       <div className="space-y-4">
    //         <h3 className="font-semibold">Your Details</h3>
    //         <div className="grid gap-4">
    //           <div>
    //             <Label htmlFor="customerName">Your Name *</Label>
    //             <Input
    //               id="customerName"
    //               value={customerName}
    //               onChange={(e) => setCustomerName(e.target.value)}
    //               placeholder="Enter your full name"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <Label htmlFor="customerNotes">Additional Requirements (Optional)</Label>
    //             <Textarea
    //               id="customerNotes"
    //               value={customerNotes}
    //               onChange={(e) => setCustomerNotes(e.target.value)}
    //               placeholder="Any special instructions, design preferences, or questions..."
    //               rows={3}
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       {/* WhatsApp Contact Button */}
    //       <Card className="bg-green-50 border-green-200">
    //         <CardContent className="p-4">
    //           <div className="flex items-center gap-3 mb-3">
    //             <MessageCircle className="w-5 h-5 text-green-600" />
    //             <span className="font-medium">Get Instant Quote & Support</span>
    //           </div>
    //           <p className="text-sm text-muted-foreground mb-4">
    //             Connect with our team on WhatsApp for personalized assistance, final pricing, and order placement.
    //           </p>
    //           <Button
    //             onClick={handleWhatsAppContact}
    //             className="w-full bg-green-600 hover:bg-green-700 text-white"
    //             size="lg"
    //           >
    //             <MessageCircle className="w-5 h-5 mr-2" />
    //             Chat on WhatsApp
    //           </Button>
    //           <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
    //             <div className="flex items-center gap-1">
    //               <Phone className="w-3 h-3" />
    //               <span>Instant Response</span>
    //             </div>
    //             <div className="flex items-center gap-1">
    //               <Users className="w-3 h-3" />
    //               <span>Expert Support</span>
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>

    //   <Separator className="my-8" />

    //   {/* Reviews Section */}
    //   <div>
    //     <Reviews productId={id} initialReviews={product.reviews || []} />
    //   </div>

    //   <Separator className="my-8" />

    //   {/* Recommended Products */}
    //   <div>
    //     <div className="flex items-center justify-between mb-6">
    //       <h2 className="text-2xl font-bold">You Might Also Like</h2>
    //     </div>
    //     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    //       {recommendedProducts.map((recProduct) => (
    //         <ProductCard key={recProduct.id} product={recProduct} compact />
    //       ))}
    //     </div>
    //   </div>
    // </div>
