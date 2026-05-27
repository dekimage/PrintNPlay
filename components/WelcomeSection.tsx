"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function WelcomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-cover bg-center bg-no-repeat bg-zinc-950"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      <div className="absolute inset-0 bg-zinc-950/75" />
      <div className="container relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Welcome to PrintN'Play Games
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            We are a small game development studio from North Macedonia, born
            from the world of printable TTRPG-inspired games. After a successful
            Kickstarter campaign and an award for Best One-Page RPG, we stepped
            into digital games without leaving our tabletop roots behind. Today
            our work lives somewhere between paper and pixels, bringing together
            the best of both worlds.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
