"use client"

import { VideoEmbed } from "@/components/VideoEmbed"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function VideoTutorialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=600&width=1200&query=tabletop gaming scene with dice and cards)",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Learn to Play from Our Videos</h2>
            <h4 className="text-lg md:text-xl text-white/90 mb-8">
              Check out our tutorial videos and playthroughs to learn more about our games and see which one you like
              most. Perfect for getting started or mastering advanced strategies.
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VideoEmbed videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="How to Play Print & Play Games" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
