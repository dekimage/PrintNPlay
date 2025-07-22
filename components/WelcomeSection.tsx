"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function WelcomeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-zinc-950">
      <div className="container max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome to Print & Play Games</h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            We're a TTRPG tabletop games creator with a taste for small, fast, and fun wonders. Our games are designed
            to be accessible to everyone, requiring minimal setup while delivering maximum enjoyment. Whether you're a
            seasoned adventurer or new to the world of tabletop gaming, our collection offers something special for
            every table.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
