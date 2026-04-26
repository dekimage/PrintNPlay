import type {
  Game,
  GameKind,
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

// Default Delivery locale: keeps field values unwrapped for that locale
const CDA_LOCALE = process.env.CONTENTFUL_LOCALE || "en-US";

function withDeliveryLocale(query: string): string {
  if (/(^|&)locale=/.test(query)) return query;
  return `${query}${query ? "&" : ""}locale=${encodeURIComponent(CDA_LOCALE)}`;
}

// Unwraps { "en-US": x } (and other locale maps) for spaces that return localized shapes
function pickField(fields: any, id: string): any {
  const v = fields?.[id];
  if (v == null) return undefined;
  if (typeof v !== "object" || v === null) return v;
  if (Array.isArray(v)) return v;
  if ("nodeType" in v) return v; // single-locale rich text at root
  if ("sys" in v) return v; // unlocalized Link/Asset
  const keys = Object.keys(v);
  if (keys.length === 0) return v;
  const allLocaleKeys = keys.every(
    (k) => /^[a-z]{2}(-[A-Z]{2})?$/.test(k) || k === "en" || k === "en-US"
  );
  if (allLocaleKeys) {
    const en = (v as Record<string, unknown>)[CDA_LOCALE] ?? (v as Record<string, unknown>)["en-US"];
    if (en !== undefined) return en;
    return (v as Record<string, unknown>)[keys[0]!];
  }
  return v;
}

// Helper function to fetch from Contentful
async function fetchContentful(query: string) {
  if (!contentfulClient) {
    throw new Error(
      "Contentful not configured - please check your environment variables"
    );
  }

  const q = withDeliveryLocale(query);
  const url = `https://cdn.contentful.com/spaces/${contentfulClient.space}/environments/${contentfulClient.environment}/entries?${q}`;

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

function mapGameKind(raw: unknown): GameKind {
  const v = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (v === "digital") return "digital";
  return "physical";
}

// Map Contentful game entry to our Game model
function mapContentfulGame(entry: any, assets: any[], entries: any[]): Game {
  const fields = entry.fields;
  const categoryLink = pickField(fields, "category");
  const tagsRefList = pickField(fields, "tags");
  const authorsRefList = pickField(fields, "authors");
  const artistsRefList = pickField(fields, "artists");
  const extLinksList = pickField(fields, "externalLinks");
  const mainAsset = pickField(fields, "mainImage");
  const thumbAsset = pickField(fields, "thumbnail");
  const galleryList = pickField(fields, "gallery");
  const slug = String(pickField(fields, "slug") ?? "");
  const title = String(pickField(fields, "title") ?? "");
  const gameType =
    pickField(fields, "gameType") ?? pickField(fields, "gameFormat");
  const description = pickField(fields, "description");
  const tagline = pickField(fields, "tagline");
  const bio = pickField(fields, "bio");
  const playTime = pickField(fields, "playTime");
  const players = pickField(fields, "players");
  const complexity = pickField(fields, "complexity");
  const videoUrl = pickField(fields, "videoUrl");

  // Resolve category reference
  const categoryRef = categoryLink?.sys
    ? resolveReference(categoryLink.sys.id, entries)
    : null;
  const category = categoryRef ? mapContentfulCategory(categoryRef) : undefined;

  const toLinkArray = (v: any): any[] => (Array.isArray(v) ? v : v ? [v] : []);
  // Resolve tags references
  const tags = toLinkArray(tagsRefList)
    .map((tagRef: any) => {
      if (!tagRef?.sys) return null;
      const tagEntry = resolveReference(tagRef.sys.id, entries);
      return tagEntry ? mapContentfulTag(tagEntry) : null;
    })
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  // Resolve authors references
  const authors = toLinkArray(authorsRefList)
    .map((authorRef: any) => {
      if (!authorRef?.sys) return null;
      const authorEntry = resolveReference(authorRef.sys.id, entries);
      return authorEntry ? mapContentfulAuthor(authorEntry, assets) : null;
    })
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  // Resolve artists references
  const artists = toLinkArray(artistsRefList)
    .map((artistRef: any) => {
      if (!artistRef?.sys) return null;
      const artistEntry = resolveReference(artistRef.sys.id, entries);
      return artistEntry ? mapContentfulArtist(artistEntry, assets) : null;
    })
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  // Resolve external links references
  const externalLinks = toLinkArray(extLinksList)
    .map((linkRef: any) => {
      if (!linkRef?.sys) return null;
      const linkEntry = resolveReference(linkRef.sys.id, entries);
      return linkEntry ? mapContentfulExternalLink(linkEntry, assets) : null;
    })
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const mainImage = mainAsset?.sys
    ? getAssetUrl(mainAsset.sys.id, assets)
    : "";
  const thumbnail = thumbAsset?.sys
    ? getAssetUrl(thumbAsset.sys.id, assets)
    : undefined;

  const kind = mapGameKind(gameType);
  // Digital games: we don't use tabletop-style meta from Contentful
  const hasTabletopMeta = kind === "physical";
  const playTimeStr =
    hasTabletopMeta && playTime !== undefined && playTime !== null
      ? String(playTime)
      : undefined;
  const playersStr =
    hasTabletopMeta && players !== undefined && players !== null
      ? String(players)
      : undefined;
  const complexityStr =
    hasTabletopMeta && complexity !== undefined && complexity !== null
      ? String(complexity)
      : undefined;

  return {
    id: entry.sys.id,
    slug,
    title,
    tagline: tagline !== undefined && tagline !== null ? String(tagline) : undefined,
    description: description as string,
    kind,
    thumbnail: thumbnail || undefined,
    bio: bio != null && bio !== "" ? String(bio) : undefined,
    category,
    tags,
    authors,
    artists,
    mainImage,
    gallery: toLinkArray(galleryList)
      .filter((img: any) => img?.sys)
      .map((img: any) => getAssetUrl(img.sys.id, assets)),
    videoUrl:
      videoUrl !== undefined && videoUrl !== null
        ? String(videoUrl)
        : undefined,
    externalLinks,
    createdDate: entry.sys.createdAt,
    updatedDate: entry.sys.updatedAt,
    playTime: playTimeStr,
    players: playersStr,
    complexity: complexityStr,
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
      `content_type=game&fields.slug=${encodeURIComponent(slug)}&include=2`
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
