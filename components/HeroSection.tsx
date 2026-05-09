"use client";

import { useGame } from "@/context/DataContext";
import { HOME_HERO } from "@/lib/config";
import { motion } from "framer-motion";

export function HeroSection() {
  const featured = useGame(HOME_HERO.featuredGameSlug);
  const heroCover = featured?.mainImage?.trim()
    ? featured.mainImage
    : "/hero.png";
  const headline =
    featured?.title?.trim() || "Featured game";

  return (
    <section
      className="relative isolate flex h-[800px] w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-cover bg-center bg-no-repeat py-8 sm:py-10"
      style={{ backgroundImage: `url(${heroCover})` }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-black/55"
        aria-hidden
      />

      <div className="container relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 min-[1000px]:grid-cols-2 min-[1000px]:gap-12 min-[1000px]:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 flex min-w-0 flex-col justify-center"
          >
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
              {headline}
            </h1>
            <p className="mb-6 text-balance text-lg leading-relaxed text-white/95 sm:mb-8 sm:text-xl md:text-2xl">
              A Mörk Borg-inspired first-person shooter that combines brutal
              dungeon runs with narrative progression and a stylized hand-drawn
              art.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href={HOME_HERO.steamWishlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors shrink-0"
              >
                Wishlist on Steam
              </a>
              <a
                href="/community"
                className="inline-flex min-h-[48px] items-center justify-center px-8 py-4 border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors shrink-0"
              >
                Join Community
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 w-full min-w-0"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg shadow-black/40">
              {/*
              <GameCarousel games={games} variant="hero" />
              */}
              <img
                src={HOME_HERO.previewGifUrl}
                alt=""
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
