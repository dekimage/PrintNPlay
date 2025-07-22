import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Star } from "lucide-react";
import type { Game } from "@/lib/models";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group block bg-white/5 rounded-lg border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
    >
      <div className="relative aspect-square">
        <Image
          src={game.mainImage || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl mb-2 group-hover:text-white/90">
            {game.title}
          </h3>
          {game.tagline && (
            <p className="text-sm text-white/80 mb-3">{game.tagline}</p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-white/70 mb-3">
            {game.players && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{game.players}</span>
              </div>
            )}
            {game.playTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{game.playTime}</span>
              </div>
            )}
            {game.complexity && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>{game.complexity}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {game.tags && game.tags.length > 0 && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {game.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            {game.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{game.tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
