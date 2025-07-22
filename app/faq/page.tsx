import type { Metadata } from "next"
import { SectionHeader } from "@/components/SectionHeader"
import { FAQ_ENTRIES } from "@/lib/config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ | Print & Play",
  description: "Frequently asked questions about Print & Play Games",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our games and services"
        />

        <Accordion type="single" collapsible className="space-y-4">
          {FAQ_ENTRIES.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white/5 rounded-lg border border-white/10 px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-white/80">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 p-8 bg-white/5 rounded-lg border border-white/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-white/80 mb-6">Can't find what you're looking for? We're here to help!</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
