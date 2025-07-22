import type { Metadata } from "next"
import { SectionHeader } from "@/components/SectionHeader"

export const metadata: Metadata = {
  title: "Privacy Policy | Print & Play",
  description: "Privacy policy for Print & Play Games",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <SectionHeader title="Privacy Policy" subtitle="How we collect, use, and protect your information" />

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/60 mb-8">
            <em>Last updated: {new Date().toLocaleDateString()}</em>
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, subscribe to our
            newsletter, contact us, or interact with our services. This may include:
          </p>
          <ul>
            <li>Name and email address</li>
            <li>Messages and communications you send to us</li>
            <li>Information about your preferences and interests</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you newsletters and updates (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, and events</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your
            consent, except as described in this policy. We may share your information:
          </p>
          <ul>
            <li>With service providers who assist us in operating our website</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or acquisition</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information</li>
            <li>Unsubscribe from our newsletters at any time</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
          </ul>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to improve your experience on our website. You can control
            cookie settings through your browser preferences.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new
            policy on this page and updating the "last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at{" "}
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
