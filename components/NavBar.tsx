"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCarousel } from "@/components/GameCarousel";
import { SocialIcons } from "@/components/SocialIcons";
import { useDigitalGames, usePhysicalGames } from "@/context/DataContext";
import { SITE } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrintableDropdown, setShowPrintableDropdown] = useState(false);
  const [showDigitalDropdown, setShowDigitalDropdown] = useState(false);
  const [mobilePrintableOpen, setMobilePrintableOpen] = useState(false);
  const [mobileDigitalOpen, setMobileDigitalOpen] = useState(false);
  const physicalGames = usePhysicalGames();
  const digitalGames = useDigitalGames();

  const previewMax = 8;
  const physicalPreview = physicalGames.slice(0, previewMax);
  const digitalPreview = digitalGames.slice(0, previewMax);

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

            <div
              className="relative"
              onMouseEnter={() => setShowPrintableDropdown(true)}
              onMouseLeave={() => setShowPrintableDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-1 hover:text-white/80 transition-colors"
                aria-expanded={showPrintableDropdown}
                aria-haspopup="true"
              >
                Printable Games
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showPrintableDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full z-[250] w-[min(96vw,640px)] pt-2"
                  >
                    <div className="max-h-[min(85vh,680px)] overflow-y-auto overscroll-y-contain rounded-2xl border border-zinc-700 bg-zinc-950 p-4 shadow-2xl shadow-black/60 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                          Printable games
                        </span>
                        <Link
                          href="/games/physical"
                          className="text-sm font-medium text-white/85 hover:text-white"
                        >
                          View all printable →
                        </Link>
                      </div>
                      <div className="min-w-0 min-h-[300px]">
                        <p className="mb-2 text-xs text-white/40">
                          Print and play at the table — scroll the row to see
                          more
                        </p>
                        <GameCarousel
                          games={physicalPreview}
                          variant="nav"
                          emptyLabel="No printable games yet — add some in Contentful"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setShowDigitalDropdown(true)}
              onMouseLeave={() => setShowDigitalDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-1 hover:text-white/80 transition-colors"
                aria-expanded={showDigitalDropdown}
                aria-haspopup="true"
              >
                Digital Games
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showDigitalDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full z-[250] w-[min(96vw,640px)] pt-2"
                  >
                    <div className="max-h-[min(85vh,680px)] overflow-y-auto overscroll-y-contain rounded-2xl border border-zinc-700 bg-zinc-950 p-4 shadow-2xl shadow-black/60 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                          Digital games
                        </span>
                        <Link
                          href="/games/digital"
                          className="text-sm font-medium text-white/85 hover:text-white"
                        >
                          View all digital →
                        </Link>
                      </div>
                      <div className="min-w-0 min-h-[300px]">
                        <p className="mb-2 text-xs text-white/40">
                          Digital-only titles — scroll the row to see more
                        </p>
                        <GameCarousel
                          games={digitalPreview}
                          variant="nav"
                          emptyLabel="No digital games yet — set gameType to Digital in Contentful"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            onClick={() => {
              setIsOpen((open) => {
                const next = !open;
                if (!next) {
                  setMobilePrintableOpen(false);
                  setMobileDigitalOpen(false);
                }
                return next;
              });
            }}
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

              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => setMobilePrintableOpen(!mobilePrintableOpen)}
                >
                  Printable Games
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobilePrintableOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobilePrintableOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-3"
                    >
                      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">
                            Printable games
                          </h4>
                          <Link
                            href="/games/physical"
                            className="text-xs text-white/60 hover:text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            View all
                          </Link>
                        </div>
                        <p className="mb-2 text-[11px] text-white/45">
                          Swipe sideways for more
                        </p>
                        <GameCarousel
                          games={physicalPreview}
                          variant="nav"
                          emptyLabel="No printable games yet"
                          onItemClick={() => setIsOpen(false)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => setMobileDigitalOpen(!mobileDigitalOpen)}
                >
                  Digital Games
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileDigitalOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileDigitalOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-3"
                    >
                      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">
                            Digital games
                          </h4>
                          <Link
                            href="/games/digital"
                            className="text-xs text-white/60 hover:text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            View all
                          </Link>
                        </div>
                        <p className="mb-2 text-[11px] text-white/45">
                          Swipe sideways for more
                        </p>
                        <GameCarousel
                          games={digitalPreview}
                          variant="nav"
                          emptyLabel="No digital games yet"
                          onItemClick={() => setIsOpen(false)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
