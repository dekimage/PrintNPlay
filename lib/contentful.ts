import type {
  Game,
  Post,
  Category,
  Tag,
  ExternalLink,
  Author,
  Artist,
} from "./models";

// Contentful client setup
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENV || "master";

const contentfulClient =
  SPACE_ID && ACCESS_TOKEN
    ? {
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN,
        environment: ENVIRONMENT,
      }
    : null;

// Helper function to fetch from Contentful
async function fetchContentful(query: string) {
  if (!contentfulClient) {
    throw new Error(
      "Contentful not configured - please check your environment variables"
    );
  }

  const url = `https://cdn.contentful.com/spaces/${contentfulClient.space}/environments/${contentfulClient.environment}/entries?${query}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${contentfulClient.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Contentful API error: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
}

// Helper to get asset URL
function getAssetUrl(assetId: string, assets: any[]): string {
  const asset = assets.find((a) => a.sys.id === assetId);
  return asset ? `https:${asset.fields.file.url}` : "";
}

// Helper to resolve references
function resolveReference(refId: string, entries: any[]): any {
  return entries.find((entry) => entry.sys.id === refId);
}

// Map Contentful category entry
function mapContentfulCategory(entry: any): Category {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    name: fields.name,
    slug: fields.slug,
    description: fields.description,
    color: fields.color,
  };
}

// Map Contentful tag entry
function mapContentfulTag(entry: any): Tag {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    name: fields.name,
    slug: fields.slug,
    description: fields.description,
  };
}

// Map Contentful artist entry
function mapContentfulArtist(entry: any, assets: any[]): Artist {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    fullName: fields.fullname,
    image: fields.image ? getAssetUrl(fields.image.sys.id, assets) : undefined,
  };
}

// Map Contentful author entry
function mapContentfulAuthor(entry: any, assets: any[]): Author {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    fullName: fields.fullname,
    image: fields.image ? getAssetUrl(fields.image.sys.id, assets) : undefined,
  };
}

// Map Contentful external link entry
function mapContentfulExternalLink(entry: any, assets: any[]): ExternalLink {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    platform: fields.platform,
    url: fields.url,
    label: fields.label,
    image: fields.image ? getAssetUrl(fields.image.sys.id, assets) : undefined,
  };
}

// Map Contentful game entry to our Game model
function mapContentfulGame(entry: any, assets: any[], entries: any[]): Game {
  const fields = entry.fields;

  // Resolve category reference
  const categoryRef = fields.category
    ? resolveReference(fields.category.sys.id, entries)
    : null;
  const category = categoryRef ? mapContentfulCategory(categoryRef) : undefined;

  // Resolve tags references
  const tags =
    fields.tags
      ?.map((tagRef: any) => {
        const tagEntry = resolveReference(tagRef.sys.id, entries);
        return tagEntry ? mapContentfulTag(tagEntry) : null;
      })
      .filter(Boolean) || [];

  // Resolve authors references
  const authors =
    fields.authors
      ?.map((authorRef: any) => {
        const authorEntry = resolveReference(authorRef.sys.id, entries);
        return authorEntry ? mapContentfulAuthor(authorEntry, assets) : null;
      })
      .filter(Boolean) || [];

  // Resolve artists references
  const artists =
    fields.artists
      ?.map((artistRef: any) => {
        const artistEntry = resolveReference(artistRef.sys.id, entries);
        return artistEntry ? mapContentfulArtist(artistEntry, assets) : null;
      })
      .filter(Boolean) || [];

  // Resolve external links references
  const externalLinks =
    fields.externalLinks
      ?.map((linkRef: any) => {
        const linkEntry = resolveReference(linkRef.sys.id, entries);
        return linkEntry ? mapContentfulExternalLink(linkEntry, assets) : null;
      })
      .filter(Boolean) || [];

  return {
    id: entry.sys.id,
    slug: fields.slug,
    title: fields.title,
    tagline: fields.tagline,
    description: fields.description,
    category,
    tags,
    authors,
    artists,
    mainImage: fields.mainImage
      ? getAssetUrl(fields.mainImage.sys.id, assets)
      : "",
    gallery: fields.gallery?.map((img: any) => getAssetUrl(img.sys.id, assets)),
    videoUrl: fields.videoUrl,
    externalLinks,
    createdDate: entry.sys.createdAt,
    updatedDate: entry.sys.updatedAt,
    playTime: fields.playTime,
    players: fields.players,
    complexity: fields.complexity,
  };
}

// Map Contentful post entry to our Post model
function mapContentfulPost(entry: any, assets: any[], entries: any[]): Post {
  const fields = entry.fields;

  // Resolve tags references
  const tags =
    fields.tags
      ?.map((tagRef: any) => {
        const tagEntry = resolveReference(tagRef.sys.id, entries);
        return tagEntry ? mapContentfulTag(tagEntry) : null;
      })
      .filter(Boolean) || [];

  return {
    id: entry.sys.id,
    slug: fields.slug,
    title: fields.title,
    excerpt: fields.excerpt,
    body: fields.body,
    coverImage: fields.coverImage
      ? getAssetUrl(fields.coverImage.sys.id, assets)
      : undefined,
    authorName: fields.authorName,
    tags,
    publishedDate: fields.publishedDate,
  };
}

// Fetch all authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await fetchContentful("content_type=author");
    return response.items.map((item: any) => mapContentfulAuthor(item, []));
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
}

// Fetch all artists
export async function getAllArtists(): Promise<Artist[]> {
  try {
    const response = await fetchContentful("content_type=artist");
    return response.items.map((item: any) => mapContentfulArtist(item, []));
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
}

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetchContentful("content_type=category");
    return response.items.map((item: any) => mapContentfulCategory(item));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Fetch all tags
export async function getAllTags(): Promise<Tag[]> {
  try {
    const response = await fetchContentful("content_type=tag");
    return response.items.map((item: any) => mapContentfulTag(item));
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

export async function getAllGames(): Promise<Game[]> {
  try {
    const response = await fetchContentful("content_type=game&include=2");
    const games = response.items.map((item: any) =>
      mapContentfulGame(
        item,
        response.includes?.Asset || [],
        response.includes?.Entry || []
      )
    );

    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  try {
    const response = await fetchContentful(
      `content_type=game&fields.slug=${slug}&include=2`
    );

    if (response.items.length === 0) {
      return undefined;
    }

    return mapContentfulGame(
      response.items[0],
      response.includes?.Asset || [],
      response.includes?.Entry || []
    );
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetchContentful(
      "content_type=post&order=-fields.publishedDate&include=2"
    );
    const posts = response.items.map((item: any) =>
      mapContentfulPost(
        item,
        response.includes?.Asset || [],
        response.includes?.Entry || []
      )
    );

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const response = await fetchContentful(
      `content_type=post&fields.slug=${slug}&include=2`
    );

    if (response.items.length === 0) {
      return undefined;
    }

    return mapContentfulPost(
      response.items[0],
      response.includes?.Asset || [],
      response.includes?.Entry || []
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}
