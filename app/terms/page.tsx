import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms & Conditions | PrintN'Play",
  description: "Terms and conditions for PrintN'Play Games",
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <LegalDocument
      title="Terms & Conditions"
      subtitle="Terms of use for PrintN'Play Games services"
      lastUpdated={lastUpdated}
    >
      <LegalSection title="Acceptance of Terms">
        <p>
          By accessing and using the PrintN&apos;Play Games website and
          services, you accept and agree to be bound by the terms and provisions
          of this agreement. If you do not agree to these terms, please do not
          use this service.
        </p>
      </LegalSection>

      <LegalSection title="Use License">
        <p>
          Permission is granted to temporarily download one copy of the materials
          on PrintN&apos;Play Games&apos; website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a transfer
          of title. Under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>
            Use the materials for any commercial purpose or for any public
            display
          </li>
          <li>
            Attempt to reverse engineer any software contained on the website
          </li>
          <li>
            Remove any copyright or other proprietary notations from the
            materials
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Game Content License">
        <p>
          Our print-and-play games are provided under a Creative Commons license
          that allows personal use and modification for non-commercial
          purposes. You may:
        </p>
        <ul>
          <li>Print and play our games for personal enjoyment</li>
          <li>Share printed copies with friends and family</li>
          <li>Modify games for personal use</li>
        </ul>
        <p>
          Commercial use, redistribution, or resale of our games requires
          explicit written permission.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer">
        <p>
          The materials on PrintN&apos;Play Games&apos; website are provided on
          an &apos;as is&apos; basis. PrintN&apos;Play Games makes no
          warranties, expressed or implied, and hereby disclaims and negates all
          other warranties including, without limitation, implied warranties or
          conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of
          rights.
        </p>
      </LegalSection>

      <LegalSection title="Limitations">
        <p>
          In no event shall PrintN&apos;Play Games or its suppliers be liable
          for any damages (including, without limitation, damages for loss of
          data or profit, or due to business interruption) arising out of the use
          or inability to use the materials on PrintN&apos;Play Games&apos;
          website.
        </p>
      </LegalSection>

      <LegalSection title="User Content">
        <p>
          By submitting content to our website (including comments, reviews, or
          feedback), you grant PrintN&apos;Play Games a non-exclusive,
          royalty-free, perpetual license to use, modify, and display such
          content.
        </p>
      </LegalSection>

      <LegalSection title="Modifications">
        <p>
          PrintN&apos;Play Games may revise these terms of service at any time
          without notice. By using this website, you are agreeing to be bound by
          the then-current version of these terms of service.
        </p>
      </LegalSection>

      <LegalSection title="Contact Information">
        <p>
          If you have any questions about these Terms &amp; Conditions, please
          contact us on{" "}
          <Link href="/contact">our contact page</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
