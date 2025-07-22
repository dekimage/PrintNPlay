import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/contentful";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch categories from Contentful",
        details: error instanceof Error ? error.message : "Unknown error",
        categories: [],
      },
      { status: 500 }
    );
  }
}
