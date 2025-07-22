"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCarousel } from "@/components/GameCarousel";
import { SocialIcons } from "@/components/SocialIcons";
import { useGames } from "@/context/DataContext";
import { SITE } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGamesDropdown, setShowGamesDropdown] = useState(false);
  const games = useGames();

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm">P&P</span>
            </div>
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
              <button className="flex items-center gap-1 hover:text-white/80 transition-colors">
                Our Games
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showGamesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-96 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-xl"
                  >
                    <div className="mb-3">
                      <Link
                        href="/games"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        View All Games →
                      </Link>
                    </div>
                    <GameCarousel
                      games={games.slice(0, 6)}
                      variant="dropdown"
                    />
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
            className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-white/10"
          >
            <div className="container py-4 space-y-4">
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => setShowGamesDropdown(!showGamesDropdown)}
                >
                  Our Games
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
                      className="mt-2 space-y-3"
                    >
                      <Link
                        href="/games"
                        className="block p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-center font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        View All Games
                      </Link>
                      <div className="grid grid-cols-2 gap-3">
                        {games.slice(0, 6).map((game) => (
                          <Link
                            key={game.id}
                            href={`/games/${game.slug}`}
                            className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <Image
                              src={game.mainImage || "/placeholder.svg"}
                              alt={game.title}
                              width={80}
                              height={80}
                              className="w-full aspect-square object-cover rounded mb-2"
                            />
                            <div className="text-sm font-medium">
                              {game.title}
                            </div>
                          </Link>
                        ))}
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
