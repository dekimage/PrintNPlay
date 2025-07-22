import { NextResponse } from "next/server";
import {
  getAllGames,
  getAllPosts,
  getAllCategories,
  getAllTags,
  getAllAuthors,
  getAllArtists,
} from "@/lib/contentful";

export async function GET() {
  try {
    const [games, posts, categories, tags, authors, artists] =
      await Promise.all([
        getAllGames(),
        getAllPosts(),
        getAllCategories(),
        getAllTags(),
        getAllAuthors(),
        getAllArtists(),
      ]);

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
    return NextResponse.json(
      {
        error: "Failed to fetch data from Contentful",
        details: error instanceof Error ? error.message : "Unknown error",
        games: [],
        posts: [],
        categories: [],
        tags: [],
        authors: [],
        artists: [],
      },
      { status: 500 }
    );
  }
}
