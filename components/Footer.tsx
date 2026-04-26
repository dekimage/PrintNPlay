import Image from "next/image"
import Link from "next/link"
import { NewsletterForm } from "@/components/NewsletterForm"
import { SocialIcons } from "@/components/SocialIcons"
import { SITE } from "@/lib/config"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={SITE.logo}
                alt={SITE.name}
                width={120}
                height={40}
                className="h-8 w-auto max-w-[120px] object-contain object-left"
              />
              <div className="font-bold text-lg">{SITE.name}</div>
            </Link>
            <p className="text-white/60 text-sm">Creating small, fast, and fun TTRPG experiences for everyone.</p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-white/80 mb-4">
              Get updates on newly released games and other newsletter-only subscriber goodies right in your mailbox.
            </p>
            <NewsletterForm />
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <SocialIcons size="md" className="mb-6" />

            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/support" className="text-white/60 hover:text-white transition-colors">
                Support
              </Link>
              <Link href="/faq" className="text-white/60 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
