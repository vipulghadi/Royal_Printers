"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">FAQs</h1>
      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="item-1">
          <AccordionTrigger>What file formats are accepted?</AccordionTrigger>
          <AccordionContent>We accept PDF, PNG, JPG, and CDR formats.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does delivery take?</AccordionTrigger>
          <AccordionContent>Most orders ship within 2–4 business days depending on product and quantity.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I cancel after uploading?</AccordionTrigger>
          <AccordionContent>You can cancel before production starts. Please contact support as soon as possible.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Do you offer bulk discounts?</AccordionTrigger>
          <AccordionContent>Yes, bulk pricing is available. Contact us with your requirements.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
