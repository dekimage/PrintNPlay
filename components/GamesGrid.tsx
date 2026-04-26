"use client";

import { useState } from "react";
import { useGames, useCategories, useTags } from "@/context/DataContext";
import { GameCard } from "@/components/GameCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GameKind } from "@/lib/models";

interface GamesGridProps {
  /** If set, only list games of this kind (both still use the same content model). */
  kind?: GameKind;
}

export function GamesGrid({ kind }: GamesGridProps) {
  const allGames = useGames();
  const games = kind ? allGames.filter((g) => g.kind === kind) : allGames;
  const categories = useCategories();
  const tags = useTags();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter games based on selected category and tags
  const filteredGames = games.filter((game) => {
    const categoryMatch =
      !selectedCategory || game.category?.slug === selectedCategory;
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tagSlug) =>
        game.tags?.some((tag) => tag.slug === tagSlug)
      );
    return categoryMatch && tagMatch;
  });

  const toggleTag = (tagSlug: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagSlug)
        ? prev.filter((t) => t !== tagSlug)
        : [...prev, tagSlug]
    );
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.slug ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.slug)}
                style={{
                  backgroundColor:
                    selectedCategory === category.slug
                      ? category.color
                      : undefined,
                  borderColor: category.color,
                }}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant={
                  selectedTags.includes(tag.slug) ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => toggleTag(tag.slug)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || selectedTags.length > 0) && (
          <div>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-white/60">
        Showing {filteredGames.length} of {games.length} games
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No games found</h3>
          <p className="text-white/60 mb-4">
            Try adjusting your filters to see more games.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
