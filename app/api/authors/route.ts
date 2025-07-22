import { NextResponse } from "next/server";
import { getAllAuthors } from "@/lib/contentful";

export async function GET() {
  try {
    const authors = await getAllAuthors();
    return NextResponse.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch authors from Contentful",
        details: error instanceof Error ? error.message : "Unknown error",
        authors: [],
      },
      { status: 500 }
    );
  }
}
