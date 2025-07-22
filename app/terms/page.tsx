import type { Metadata } from "next"
import { SectionHeader } from "@/components/SectionHeader"

export const metadata: Metadata = {
  title: "Terms & Conditions | Print & Play",
  description: "Terms and conditions for Print & Play Games",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <SectionHeader title="Terms & Conditions" subtitle="Terms of use for Print & Play Games services" />

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/60 mb-8">
            <em>Last updated: {new Date().toLocaleDateString()}</em>
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using Print & Play Games website and services, you accept and agree to be bound by the
            terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
            service.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Print & Play Games' website for
            personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
            and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>Game Content License</h2>
          <p>
            Our print-and-play games are provided under a Creative Commons license that allows for personal use and
            modification for non-commercial purposes. You may:
          </p>
          <ul>
            <li>Print and play our games for personal enjoyment</li>
            <li>Share printed copies with friends and family</li>
            <li>Modify games for personal use</li>
          </ul>
          <p>Commercial use, redistribution, or resale of our games requires explicit written permission.</p>

          <h2>Disclaimer</h2>
          <p>
            The materials on Print & Play Games' website are provided on an 'as is' basis. Print & Play Games makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties including without
            limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Print & Play Games or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
            inability to use the materials on Print & Play Games' website.
          </p>

          <h2>User Content</h2>
          <p>
            By submitting content to our website (including comments, reviews, or feedback), you grant Print & Play
            Games a non-exclusive, royalty-free, perpetual license to use, modify, and display such content.
          </p>

          <h2>Modifications</h2>
          <p>
            Print & Play Games may revise these terms of service at any time without notice. By using this website, you
            are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at{" "}
            <a href="/contact" className="text-white hover:text-white/80">
              our contact page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
