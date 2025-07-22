"use client";

import { GameCard } from "@/components/GameCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useGames } from "@/context/DataContext";

interface RelatedGamesProps {
  currentGameId: string;
  category?: string;
}

export function RelatedGames({ currentGameId, category }: RelatedGamesProps) {
  const games = useGames();

  // Get related games (same category or random)
  const relatedGames = games
    .filter((game) => game.id !== currentGameId)
    .filter((game) => (category ? game.category?.name === category : true))
    .slice(0, 3);

  // If not enough games in category, fill with random games
  if (relatedGames.length < 3) {
    const remainingGames = games
      .filter((game) => game.id !== currentGameId)
      .filter((game) => !relatedGames.some((rg) => rg.id === game.id))
      .slice(0, 3 - relatedGames.length);

    relatedGames.push(...remainingGames);
  }

  if (relatedGames.length === 0) {
    return null;
  }

  return (
    <div>
      <SectionHeader
        title="You Might Also Like"
        subtitle="Discover more games from our collection"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
