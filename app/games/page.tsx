import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { GamesGrid } from "@/components/GamesGrid";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Games | Print & Play",
  description:
    "Browse our physical print-and-play games and our digital game catalog.",
};

export default function GamesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container space-y-20">
        <div>
          <SectionHeader
            title="All games"
            subtitle="Physical and digital titles from Print & Play"
          />
          <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
            Use{" "}
            <Link
              href="/games/physical"
              className="text-white/90 underline-offset-2 hover:underline"
            >
              physical games
            </Link>{" "}
            for print-and-play, or{" "}
            <Link
              href="/games/digital"
              className="text-white/90 underline-offset-2 hover:underline"
            >
              digital games
            </Link>{" "}
            for on-screen play.
          </p>
        </div>

        <div>
          <SectionHeader
            title="Physical games"
            subtitle="Print, assemble, and play at the table"
          />
          <GamesGrid kind="physical" />
        </div>

        <div>
          <SectionHeader
            title="Digital games"
            subtitle="The same great structure — delivered as digital experiences"
          />
          <GamesGrid kind="digital" />
        </div>
      </div>
    </div>
  );
}
