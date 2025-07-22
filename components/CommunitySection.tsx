"use client"

import { DiscordCard } from "@/components/DiscordCard"
import { PatreonCard } from "@/components/PatreonCard"
import { SectionHeader } from "@/components/SectionHeader"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function CommunitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-zinc-950">
      <div className="container">
        <SectionHeader title="Join Our Community" subtitle="Connect with fellow players and support our work" />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <DiscordCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <PatreonCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
