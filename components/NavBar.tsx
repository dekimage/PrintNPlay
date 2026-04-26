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
  const [showGamesDropdown, setShowGamesDropdown] = useState(false);
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
              width={120}
              height={40}
              className="h-8 w-auto max-w-[120px] object-contain object-left"
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
            <div
              className="relative"
              onMouseEnter={() => setShowGamesDropdown(true)}
              onMouseLeave={() => setShowGamesDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-1 hover:text-white/80 transition-colors"
                aria-expanded={showGamesDropdown}
                aria-haspopup="true"
              >
                Games
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showGamesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 right-0 top-full z-[250] w-full pt-2 sm:left-1/2 sm:w-[min(96vw,1180px)] sm:-translate-x-1/2"
                  >
                    <div className="max-h-[min(85vh,680px)] overflow-y-auto overscroll-y-contain rounded-2xl border border-zinc-700 bg-zinc-950 p-4 shadow-2xl shadow-black/60 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                          Browse games
                        </span>
                        <Link
                          href="/games"
                          className="text-sm font-medium text-white/85 hover:text-white"
                        >
                          All games overview →
                        </Link>
                      </div>
                      <div className="grid min-h-[300px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                        <div className="min-w-0">
                          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                            <h3 className="text-base font-bold text-white">
                              Physical games
                            </h3>
                            <Link
                              href="/games/physical"
                              className="shrink-0 text-sm text-white/55 hover:text-white"
                            >
                              View all →
                            </Link>
                          </div>
                          <p className="mb-2 text-xs text-white/40">
                            Print and play at the table — scroll the row to see
                            more
                          </p>
                          <GameCarousel
                            games={physicalPreview}
                            variant="nav"
                            emptyLabel="No physical games yet — add some in Contentful"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                            <h3 className="text-base font-bold text-white">
                              Digital games
                            </h3>
                            <Link
                              href="/games/digital"
                              className="shrink-0 text-sm text-white/55 hover:text-white"
                            >
                              View all →
                            </Link>
                          </div>
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/news"
              className="hover:text-white/80 transition-colors"
            >
              News
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
            onClick={() => setIsOpen(!isOpen)}
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
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => setShowGamesDropdown(!showGamesDropdown)}
                >
                  Games
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showGamesDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showGamesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-4"
                    >
                      <Link
                        href="/games"
                        className="block p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-center font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        All games overview
                      </Link>

                      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">
                            Physical games
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
                          emptyLabel="No physical games yet"
                          onItemClick={() => setIsOpen(false)}
                        />
                      </div>

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
                href="/news"
                className="block py-2 hover:text-white/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                News
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
