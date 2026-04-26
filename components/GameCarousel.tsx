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
  variant?: "hero" | "dropdown" | "section" | "nav"
  /** Shown in nav strips when the list is empty */
  emptyLabel?: string
  /** e.g. close mobile menu when a preview card is tapped */
  onItemClick?: () => void
}

function NavGameStrip({
  games,
  emptyLabel,
  onItemClick,
}: {
  games: Game[]
  emptyLabel?: string
  onItemClick?: () => void
}) {
  if (games.length === 0) {
    return (
      <p className="text-sm text-white/50 py-6 text-center border border-dashed border-white/15 rounded-lg">
        {emptyLabel ?? "No games yet"}
      </p>
    )
  }

  return (
    <div
      className="flex gap-3 overflow-x-auto overflow-y-hidden pb-1 -mx-1 px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {games.map((game) => (
        <Link
          key={game.id}
          href={`/games/${game.slug}`}
          onClick={onItemClick}
          className="group flex-shrink-0 w-[min(44vw,200px)] min-w-[140px] max-w-[200px] snap-start bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-black/30"
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={game.thumbnail || game.mainImage || "/placeholder.svg"}
              alt={game.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 44vw, 200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 pt-10">
              <h4 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-white">
                {game.title}
              </h4>
              {game.tagline && (
                <p className="text-xs text-white/75 mt-1 line-clamp-2">{game.tagline}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function GameCarousel({
  games,
  variant = "section",
  emptyLabel,
  onItemClick,
}: GameCarouselProps) {
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

  if (variant === "nav" || variant === "dropdown") {
    return (
      <NavGameStrip
        games={games}
        emptyLabel={emptyLabel}
        onItemClick={onItemClick}
      />
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
                <Image
                  src={game.thumbnail || game.mainImage || "/placeholder.svg"}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
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
                      <Badge key={tag.id} variant="outline" className="text-xs">
                        {tag.name}
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
