import type { Metadata } from "next"
import { SectionHeader } from "@/components/SectionHeader"
import { ContactForm } from "@/components/ContactForm"
import { Mail, MessageCircle, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | Print & Play",
  description: "Get in touch with the Print & Play Games team",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <SectionHeader
          title="Contact Us"
          subtitle="We'd love to hear from you! Send us a message and we'll get back to you soon."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1 text-white/60" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-white/80">hello@printandplay.games</p>
                    <p className="text-white/60 text-sm">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 mt-1 text-white/60" />
                  <div>
                    <h3 className="font-semibold mb-1">Discord</h3>
                    <p className="text-white/80">Join our community server</p>
                    <p className="text-white/60 text-sm">Get real-time support from our team and community</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 text-white/60" />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-white/80">Remote Team</p>
                    <p className="text-white/60 text-sm">We work with creators worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Personal response from our team</li>
                <li>• Detailed answers to your questions</li>
                <li>• Follow-up if needed</li>
                <li>• Respectful and friendly communication</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-3">Before You Contact Us</h3>
              <p className="text-white/80 mb-3">
                For faster support, please check our FAQ section first. Many common questions are answered there, and
                you might find what you're looking for immediately.
              </p>
              <a href="/faq" className="text-white hover:text-white/80 underline">
                View FAQ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
