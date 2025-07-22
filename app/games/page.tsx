import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { GamesGrid } from "@/components/GamesGrid";

export const metadata: Metadata = {
  title: "All Games | Print & Play",
  description:
    "Browse our complete collection of print-and-play tabletop games. Find your next adventure!",
};

export default function GamesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <SectionHeader
          title="All Games"
          subtitle="Browse our complete collection of print-and-play tabletop games"
        />

        <GamesGrid />
      </div>
    </div>
  );
}
