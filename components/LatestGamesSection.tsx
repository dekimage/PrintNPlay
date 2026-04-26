"use client";

import { GameCard } from "@/components/GameCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useDigitalGames, usePhysicalGames } from "@/context/DataContext";
import type { Game } from "@/lib/models";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function sortByDate(games: Game[]) {
  return [...games].sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
}

export function LatestGamesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const physical = sortByDate(usePhysicalGames()).slice(0, 6);
  const digital = sortByDate(useDigitalGames()).slice(0, 6);

  return (
    <section id="latest-games" ref={ref} className="py-24 bg-black">
      <div className="container space-y-20">
        <div>
          <SectionHeader
            title="Physical games"
            subtitle="Our latest print-and-play tabletop releases"
          />
          {physical.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {physical.map((game, index) => (
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
            <p className="text-white/60 text-center">
              New physical games will appear here once they are added in
              Contentful.
            </p>
          )}
        </div>

        <div>
          <SectionHeader
            title="Digital games"
            subtitle="Play on screen with our latest digital-only titles"
          />
          {digital.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {digital.map((game, index) => (
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
            <p className="text-white/60 text-center">
              Digital games will appear here when you set{" "}
              <code className="text-white/80">gameType</code> to Digital in
              Contentful.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
