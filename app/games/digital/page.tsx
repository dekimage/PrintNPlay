import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { GamesGrid } from "@/components/GamesGrid";

export const metadata: Metadata = {
  title: "Digital Games | Print & Play",
  description: "Discover our digital-only games, managed from Contentful.",
};

export default function DigitalGamesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <SectionHeader
          title="Digital games"
          subtitle="Digital experiences — thumbnails, gallery art, and bios from Contentful"
        />
        <GamesGrid kind="digital" />
      </div>
    </div>
  );
}
