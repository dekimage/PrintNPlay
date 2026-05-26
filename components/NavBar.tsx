"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialIcons } from "@/components/SocialIcons";
import { SITE } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[200] w-full border-b border-zinc-800 bg-zinc-950 text-white shadow-sm shadow-black/40">
      <div className="container relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={102}
              height={120}
              className="h-12 w-auto shrink-0 object-contain object-left"
              priority
            />
            <div>
              <div className="font-bold text-lg">{SITE.name}</div>
              <div className="text-xs text-white/60 hidden sm:block">
                {SITE.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/news"
              className="hover:text-white/80 transition-colors"
            >
              News
            </Link>

            <Link
              href="/games/physical"
              className="hover:text-white/80 transition-colors"
            >
              Printable Games
            </Link>

            <Link
              href="/games/digital"
              className="hover:text-white/80 transition-colors"
            >
              Digital Games
            </Link>

            <Link
              href="/community"
              className="hover:text-white/80 transition-colors"
            >
              Community
            </Link>
            <Link
              href="/about"
              className="hover:text-white/80 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-white/80 transition-colors"
            >
              Contact
            </Link>

            <SocialIcons size="sm" />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden max-h-[min(100dvh,32rem)] overflow-y-auto overscroll-y-contain border-t border-zinc-800 bg-zinc-950"
          >
            <div className="container py-4 space-y-4">
              <Link
                href="/news"
                className="block py-2 hover:text-white/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                News
              </Link>

              <Link
                href="/games/physical"
                className="block py-2 hover:text-white/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Printable Games
              </Link>

              <Link
                href="/games/digital"
                className="block py-2 hover:text-white/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Digital Games
              </Link>

              <Link
                href="/community"
                className="block py-2 hover:text-white/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <Link
                href="/about"
                className="block py-2 hover:text-white/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 hover:text-white/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-white/10">
                <SocialIcons size="sm" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
