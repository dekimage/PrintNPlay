"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Game, Post, Category, Tag, Author, Artist } from "@/lib/models";

interface DataContextType {
  games: Game[];
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  artists: Artist[];
  getGameBySlug: (slug: string) => Game | undefined;
  getPostBySlug: (slug: string) => Post | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getTagBySlug: (slug: string) => Tag | undefined;
  getAuthorById: (id: string) => Author | undefined;
  getArtistById: (id: string) => Artist | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
  initialData: {
    games: Game[];
    posts: Post[];
    categories: Category[];
    tags: Tag[];
    authors: Author[];
    artists: Artist[];
  };
}

export function DataProvider({ children, initialData }: DataProviderProps) {
  const getGameBySlug = (slug: string) => {
    return initialData.games.find((game) => game.slug === slug);
  };

  const getPostBySlug = (slug: string) => {
    return initialData.posts.find((post) => post.slug === slug);
  };

  const getCategoryBySlug = (slug: string) => {
    return initialData.categories.find((category) => category.slug === slug);
  };

  const getTagBySlug = (slug: string) => {
    return initialData.tags.find((tag) => tag.slug === slug);
  };

  const getAuthorById = (id: string) => {
    return initialData.authors.find((author) => author.id === id);
  };

  const getArtistById = (id: string) => {
    return initialData.artists.find((artist) => artist.id === id);
  };

  const value: DataContextType = {
    games: initialData.games,
    posts: initialData.posts,
    categories: initialData.categories,
    tags: initialData.tags,
    authors: initialData.authors,
    artists: initialData.artists,
    getGameBySlug,
    getPostBySlug,
    getCategoryBySlug,
    getTagBySlug,
    getAuthorById,
    getArtistById,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useGames() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useGames must be used within a DataProvider");
  }
  return context.games;
}

export function useGame(slug: string) {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a DataProvider");
  }
  return context.getGameBySlug(slug);
}

export function usePosts() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a DataProvider");
  }
  return context.posts;
}

export function usePost(slug: string) {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a DataProvider");
  }
  return context.getPostBySlug(slug);
}

export function useCategories() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a DataProvider");
  }
  return context.categories;
}

export function useCategory(slug: string) {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a DataProvider");
  }
  return context.getCategoryBySlug(slug);
}

export function useTags() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a DataProvider");
  }
  return context.tags;
}

export function useTag(slug: string) {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useTag must be used within a DataProvider");
  }
  return context.getTagBySlug(slug);
}

export function useAuthors() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useAuthors must be used within a DataProvider");
  }
  return context.authors;
}

export function useAuthor(id: string) {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useAuthor must be used within a DataProvider");
  }
  return context.getAuthorById(id);
}

export function useArtists() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useArtists must be used within a DataProvider");
  }
  return context.artists;
}

export function useArtist(id: string) {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useArtist must be used within a DataProvider");
  }
  return context.getArtistById(id);
}
