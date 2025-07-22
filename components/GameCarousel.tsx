"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Game } from "@/lib/models"
import { motion } from "framer-motion"

interface GameCarouselProps {
  games: Game[]
  variant?: "hero" | "dropdown" | "section"
}

export function GameCarousel({ games, variant = "section" }: GameCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (variant === "dropdown") {
    return (
      <div className="grid grid-cols-2 gap-3">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            className="group p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <Image
              src={game.mainImage || "/placeholder.svg"}
              alt={game.title}
              width={120}
              height={120}
              className="w-full aspect-square object-cover rounded mb-2"
            />
            <div className="text-sm font-medium group-hover:text-white/90">{game.title}</div>
            {game.tagline && <div className="text-xs text-white/60 mt-1">{game.tagline}</div>}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {games.length > 3 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-white/20 hover:bg-black/90"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-white/20 hover:bg-black/90"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0"
          >
            <Link
              href={`/games/${game.slug}`}
              className="group block w-64 bg-white/5 rounded-lg border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-square">
                <Image src={game.mainImage || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-white/90">{game.title}</h3>
                  {game.tagline && <p className="text-sm text-white/80">{game.tagline}</p>}
                </div>
              </div>

              {game.tags && game.tags.length > 0 && (
                <div className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {game.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
