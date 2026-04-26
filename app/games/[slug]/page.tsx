import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Users, Clock, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { GameGallery } from "@/components/GameGallery";
import { VideoEmbed } from "@/components/VideoEmbed";
import { RelatedGames } from "@/components/RelatedGames";
import { getGameBySlug, getAllGames } from "@/lib/contentful";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const games = await getAllGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} | Print & Play`,
    description: game.tagline || game.description.substring(0, 160),
    openGraph: {
      title: game.title,
      description: game.tagline || game.description.substring(0, 160),
      images: [{ url: game.mainImage }],
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container pt-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link
            href={
              game.kind === "digital" ? "/games/digital" : "/games/physical"
            }
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {game.kind === "digital"
              ? "Back to digital games"
              : "Back to physical games"}
          </Link>
        </Button>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={game.mainImage || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12">
            <Badge className="mb-3 bg-white/20 text-white border-white/30">
              {game.kind === "digital" ? "Digital" : "Physical"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {game.title}
            </h1>
            {game.tagline && (
              <p className="text-xl md:text-2xl text-white/90">
                {game.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container py-12">
        {((game.kind === "physical" &&
          (game.players || game.playTime || game.complexity)) ||
          (game.tags && game.tags.length > 0)) && (
          <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-white/5 rounded-lg border border-white/10">
            {game.kind === "physical" && (
              <>
                {game.players && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{game.players}</span>
                  </div>
                )}
                {game.playTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{game.playTime}</span>
                  </div>
                )}
                {game.complexity && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span>{game.complexity}</span>
                  </div>
                )}
              </>
            )}
            {game.tags && game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Game</h2>
              <RichTextRenderer content={game.description} />
            </div>

            {game.bio && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Bio</h2>
                <p className="text-white/85 whitespace-pre-wrap leading-relaxed">
                  {game.bio}
                </p>
              </div>
            )}

            {/* Credits */}
            {(game.authors && game.authors.length > 0) ||
            (game.artists && game.artists.length > 0) ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Credits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {game.authors && game.authors.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-white/80">
                        Authors
                      </h3>
                      <div className="space-y-3">
                        {game.authors.map((author) => (
                          <div
                            key={author.id}
                            className="flex items-center gap-3"
                          >
                            {author.image ? (
                              <Image
                                src={author.image}
                                alt={author.fullName || "Author"}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <span className="text-white/60 text-sm font-medium">
                                  {author.fullName
                                    ? author.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                    : "A"}
                                </span>
                              </div>
                            )}
                            <span className="font-medium">
                              {author.fullName || "Unknown Author"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {game.artists && game.artists.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-white/80">
                        Artists
                      </h3>
                      <div className="space-y-3">
                        {game.artists.map((artist) => (
                          <div
                            key={artist.id}
                            className="flex items-center gap-3"
                          >
                            {artist.image ? (
                              <Image
                                src={artist.image}
                                alt={artist.fullName || "Artist"}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <span className="text-white/60 text-sm font-medium">
                                  {artist.fullName
                                    ? artist.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                    : "A"}
                                </span>
                              </div>
                            )}
                            <span className="font-medium">
                              {artist.fullName || "Unknown Artist"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Gallery */}
            {game.gallery && game.gallery.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <GameGallery images={game.gallery} title={game.title} />
              </div>
            )}

            {/* Video */}
            {game.videoUrl && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Watch Gameplay</h2>
                <VideoEmbed videoUrl={game.videoUrl} title={game.title} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* External Links */}
            {game.externalLinks && game.externalLinks.length > 0 && (
              <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-xl font-bold mb-4">Get This Game</h3>
                <div className="space-y-3">
                  {game.externalLinks.map((link) => (
                    <Button
                      key={link.id}
                      asChild
                      variant="outline"
                      className="w-full bg-transparent hover:bg-white/10 transition-colors"
                    >
                      <Link
                        href={link.url}
                        target="_blank"
                        className="flex items-center justify-start"
                      >
                        {link.image ? (
                          <Image
                            src={link.image}
                            alt={link.platform}
                            width={24}
                            height={24}
                            className="mr-3 rounded-sm"
                          />
                        ) : (
                          <ExternalLink className="w-4 h-4 mr-2" />
                        )}
                        <span className="font-medium">
                          {link.label || link.platform}
                        </span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Games */}
        <div className="mt-16">
          <RelatedGames
            currentGameId={game.id}
            category={game.category?.name}
            kind={game.kind}
          />
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Game",
            name: game.title,
            description: game.description,
            image: game.mainImage,
            url: `https://printandplay.example/games/${game.slug}`,
            genre: game.category?.name,
            ...(game.kind === "physical"
              ? {
                  numberOfPlayers: game.players,
                  playTime: game.playTime,
                }
              : {}),
          }),
        }}
      />
    </div>
  );
}
