import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | PrintN'Play",
  description: "Privacy policy for PrintN'Play Games",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information"
      lastUpdated={lastUpdated}
    >
      <LegalSection title="Information We Collect">
        <p>
          We collect information you provide directly to us, such as when you
          create an account, subscribe to our newsletter, contact us, or interact
          with our services. This may include:
        </p>
        <ul>
          <li>Name and email address</li>
          <li>Messages and communications you send to us</li>
          <li>Information about your preferences and interests</li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Send you newsletters and updates (with your consent)</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Communicate with you about products, services, and events</li>
        </ul>
      </LegalSection>

      <LegalSection title="Information Sharing">
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except as described in this
          policy. We may share your information:
        </p>
        <ul>
          <li>
            With service providers who assist us in operating our website
          </li>
          <li>When required by law or to protect our rights</li>
          <li>In connection with a business transfer or acquisition</li>
        </ul>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We implement appropriate security measures to protect your personal
          information against unauthorized access, alteration, disclosure, or
          destruction. However, no method of transmission over the internet is
          100% secure.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>You have the right to:</p>
        <ul>
          <li>Access and update your personal information</li>
          <li>Unsubscribe from our newsletters at any time</li>
          <li>Request deletion of your personal information</li>
          <li>Object to processing of your personal information</li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies and Tracking">
        <p>
          We use cookies and similar tracking technologies to improve your
          experience on our website. You can control cookie settings through
          your browser preferences.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page and updating
          the &quot;last updated&quot; date.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          If you have any questions about this privacy policy, please contact
          us on <Link href="/contact">our contact page</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
