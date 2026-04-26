import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { GamesGrid } from "@/components/GamesGrid";

export const metadata: Metadata = {
  title: "Physical Games | Print & Play",
  description:
    "Browse our print-and-play tabletop games — print at home and play.",
};

export default function PhysicalGamesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <SectionHeader
          title="Physical games"
          subtitle="Our print-and-play collection — your next adventure is a few pages away"
        />
        <GamesGrid kind="physical" />
      </div>
    </div>
  );
}
