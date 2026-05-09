"use client";

import { GameCard } from "@/components/GameCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useGames } from "@/context/DataContext";
import { MOST_POPULAR_GAME_SLUGS } from "@/lib/config";
import type { Game } from "@/lib/models";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useMemo, useRef } from "react";

function pickGamesBySlugOrder(all: Game[], slugs: readonly string[]): Game[] {
  return slugs
    .map((slug) => all.find((g) => g.slug === slug))
    .filter((g): g is Game => Boolean(g));
}

export function LatestGamesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const allGames = useGames();

  const featured = useMemo(
    () => pickGamesBySlugOrder(allGames, MOST_POPULAR_GAME_SLUGS),
    [allGames]
  );

  return (
    <section id="most-popular" ref={ref} className="py-24 bg-black">
      <div className="container">
        <SectionHeader
          title="Most Popular"
          subtitle="Our fan-favorite printable & digital releases."
        />
        {featured.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/60">
            Curated games will show here once{" "}
            <code className="text-white/80">MOST_POPULAR_GAME_SLUGS</code> match
            entries in Contentful.
          </p>
        )}
      </div>
    </section>
  );
}
