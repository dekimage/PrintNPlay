export const SITE = {
  name: "Print & Play",
  tagline: "Small, Fast and Fun TTRPG Games",
  url: process.env.SITE_URL || "http://localhost:3000",
  /** Brand mark in /public (swap to `/logo.png` if you prefer the other asset) */
  logo: "/logo1.png" as const,
};

export const LINKS = {
  discord: "https://discord.gg/printandplay",
  linktree: "https://linktr.ee/PrintNplay",
  patreon: "https://www.patreon.com/profile/creators?u=88434971",
  drivethru: "https://www.drivethrurpg.com/en/publisher/25790/printnplay",
  itch: "https://printnplay.itch.io/",
  instagram: "https://www.instagram.com/print_n_play_games",
  threads: "https://www.threads.com/@print_n_play_games",
  youtube: "https://youtube.com/@printandplaygames",
};

export const FAQ_ENTRIES = [
  {
    question: "What are Print & Play games?",
    answer:
      "Print & Play games are tabletop games that you can download, print at home, and play immediately. They typically require minimal components and setup, making them perfect for quick gaming sessions.",
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
