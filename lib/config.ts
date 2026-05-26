export const SITE = {
  name: "PrintN'Play",
  tagline: "Paper & Pixels",
  url: process.env.SITE_URL || "http://localhost:3000",
  /** Brand mark in /public */
  logo: "/logo.svg" as const,
};

/** Home hero: featured Contentful game cover + Steam CTA (swap URLs when ready) */
export const HOME_HERO = {
  featuredGameSlug: "unwelcome-guests",
  steamWishlistUrl:
    process.env.NEXT_PUBLIC_STEAM_WISHLIST_URL ??
    "https://store.steampowered.com/app/4391580/Unwelcome_Guests/",
  /** Hero embed: youtube.com/watch?v=… ID only */
  youtubeHeroVideoId: "Ffz3ACr-CKo",
} as const;

export const LINKS = {
  discord: "https://discord.gg/nuGpQgSn4f",
  linktree: "https://linktr.ee/PrintNplay",
  patreon: "https://www.patreon.com/profile/creators?u=88434971",
  drivethru: "https://www.drivethrurpg.com/en/publisher/25790/printnplay",
  itch: "https://printnplay.itch.io/",
  instagram: "https://www.instagram.com/print_n_play_games",
  threads: "https://www.threads.com/@print_n_play_games",
  youtube: "https://www.youtube.com/@Print_Nplay",
};

/** Manually ordered slugs for the home “Most Popular” section. */
export const MOST_POPULAR_GAME_SLUGS = [
  "swoa",
  "birthplace-of-evil",
  "dumb-squad",
] as const;

export const FAQ_ENTRIES = [
  {
    question: "What are PrintN'Play games?",
    answer:
      "PrintN'Play games are tabletop games that you can download, print at home, and play immediately. They typically require minimal components and setup, making them perfect for quick gaming sessions.",
  },
  {
    question: "Do I need special equipment to play?",
    answer:
      "Most of our games only require a printer, some paper (cardstock recommended), scissors, and basic gaming supplies like dice or tokens. Specific requirements are listed on each game's page.",
  },
  {
    question: "How long do games typically take to play?",
    answer:
      'Our games are designed to be "small, fast, and fun" - most can be completed in 15-60 minutes, making them perfect for lunch breaks, family time, or quick gaming sessions with friends.',
  },
  {
    question: "Can I modify or share the games?",
    answer:
      "Our games are released under Creative Commons licenses that allow personal modification and sharing. Commercial use requires permission. Check each game's specific license for details.",
  },
  {
    question: "Are the games suitable for beginners?",
    answer:
      "Our games are designed to be accessible to players of all experience levels. Each game includes clear rules and often tutorial content to help new players get started.",
  },
  {
    question: "How do I get support if I have questions?",
    answer:
      "You can reach out through our contact form, join our Discord community for real-time help, or check our FAQ section. We're always happy to help!",
  },
];
