"use client";

import { GameCarousel } from "@/components/GameCarousel";
import { useGames } from "@/context/DataContext";
import { SITE } from "@/lib/config";
import { motion } from "framer-motion";

export function HeroSection() {
  const games = useGames();

  return (
    <section
      className="h-[500px] bg-black flex items-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {SITE.tagline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Discover a diverse, unique world in every single game. Print,
              play, and embark on unforgettable adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#latest-games"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors"
              >
                Explore Games
              </a>
              <a
                href="/community"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Join Community
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GameCarousel games={games} variant="hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
