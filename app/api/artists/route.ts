import { NextResponse } from "next/server";
import { getAllArtists } from "@/lib/contentful";

export async function GET() {
  try {
    const artists = await getAllArtists();
    return NextResponse.json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch artists from Contentful",
        details: error instanceof Error ? error.message : "Unknown error",
        artists: [],
      },
      { status: 500 }
    );
  }
}
