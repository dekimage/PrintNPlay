import { NextResponse } from "next/server";
import { getEmptySiteData, getSiteData } from "@/lib/site-data";

export async function GET() {
  try {
    const { games, posts, categories, tags, authors, artists } =
      await getSiteData();

    return NextResponse.json({
      games,
      posts,
      categories,
      tags,
      authors,
      artists,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Bootstrap API error:", error);
    const empty = getEmptySiteData();
    return NextResponse.json(
      {
        error: "Failed to fetch data from Contentful",
        details: error instanceof Error ? error.message : "Unknown error",
        ...empty,
      },
      { status: 500 }
    );
  }
}
