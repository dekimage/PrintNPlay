export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Author {
  id: string;
  fullName: string;
  image?: string;
}

export interface Artist {
  id: string;
  fullName: string;
  image?: string;
}

export interface ExternalLink {
  id: string;
  platform: string;
  url: string;
  label?: string;
  image?: string;
}

export type GameKind = "physical" | "digital";

export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  /** From Contentful `gameType`: Physical or Digital. Defaults to physical if unset. */
  kind: GameKind;
  /** Optional card/list image; falls back to mainImage in UI when absent */
  thumbnail?: string;
  /** Optional extra bio (plain text). Shown in addition to the main description when set. */
  bio?: string;
  category?: Category;
  tags?: Tag[];
  authors?: Author[];
  artists?: Artist[];
  mainImage: string;
  gallery?: string[];
  videoUrl?: string;
  externalLinks?: ExternalLink[];
  createdDate: string;
  updatedDate?: string;
  playTime?: string;
  players?: string;
  complexity?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body: string;
  coverImage?: string;
  authorName?: string;
  tags?: Tag[];
  publishedDate: string;
}
