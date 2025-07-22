"use client"

import { GameCard } from "@/components/GameCard"
import { SectionHeader } from "@/components/SectionHeader"
import { useGames } from "@/context/DataContext"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function LatestGamesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const games = useGames()

  // Get latest 6 games sorted by creation date
  const latestGames = games
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, 6)

  return (
    <section id="latest-games" ref={ref} className="py-24 bg-black">
      <div className="container">
        <SectionHeader title="Latest Games" subtitle="Discover our newest adventures and experiences" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestGames.map((game, index) => (
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
      </div>
    </section>
  )
}
