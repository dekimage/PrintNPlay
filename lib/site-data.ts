import {
  getAllGames,
  getAllPosts,
  getAllCategories,
  getAllTags,
  getAllAuthors,
  getAllArtists,
} from "@/lib/contentful";
import type { Game, Post, Category, Tag, Author, Artist } from "@/lib/models";

export type SiteData = {
  games: Game[];
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  artists: Artist[];
};

const empty: SiteData = {
  games: [],
  posts: [],
  categories: [],
  tags: [],
  authors: [],
  artists: [],
};

/**
 * Fetches all CMS data in one round-trip (used by the root layout and /api/bootstrap).
 * Call from the server so env vars and Contentful work reliably — do not use HTTP
 * to your own /api/bootstrap (SITE_URL is often wrong in dev and yields empty data).
 */
export async function getSiteData(): Promise<SiteData> {
  const [games, posts, categories, tags, authors, artists] = await Promise.all([
    getAllGames(),
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
    getAllAuthors(),
    getAllArtists(),
  ]);

  return {
    games: games.filter((g) => Boolean(g?.slug)),
    posts,
    categories,
    tags,
    authors,
    artists,
  };
}

export function getEmptySiteData(): SiteData {
  return { ...empty };
}
