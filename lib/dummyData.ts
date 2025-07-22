import type { Game } from "./models"

export const dummyGames: Game[] = [
  {
    id: '1',
    slug: 'dungeon-delvers',
    title: 'Dungeon Delvers',
    tagline: 'Quick dungeon crawling adventure',
    description: 'A fast-paced dungeon crawler where heroes explore mysterious dungeons, fight monsters, and collect treasure. Perfect for 2-4 players looking for a quick adventure that can be completed in 30 minutes.',
    category: 'Adventure',
    tags: ['Dungeon Crawler', 'Fantasy', 'Cooperative'],
    mainImage: '/placeholder.svg?height=400&width=400',
    gallery: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    externalLinks: {
      driveThru: 'https://drivethrurpg.com/dungeon-delvers',
      itch: 'https://printandplay.itch.io/dungeon-delvers',
      download: 'https://example.com/download/dungeon-delvers.pdf'
    },
    createdDate: '2024-01-15T00:00:00Z',
    playTime: '20-30 min',
    players: '2-4 players',
    complexity: 'Light'
  },
  {
    id: '2',
    slug: 'space-traders',
    title: 'Space Traders',
    tagline: 'Interstellar commerce and adventure',
    description: 'Navigate the galaxy as a space trader, buying and selling goods across different planets while avoiding pirates and managing your ship. A strategic game for 2-6 players.',
    category: 'Strategy',
    tags: ['Space', 'Trading', 'Strategy'],
    mainImage: '/placeholder.svg?height=400&width=400',
    gallery: [
      '/placeholder.svg?height=400&width=400',
      '/placeholder.svg?height=400&width=400'
    ],
    externalLinks: {
      itch: 'https://printandplay.itch.io/space-traders',
      patreon: 'https://patreon.com/printandplay/space-traders'
    },
    createdDate: '2024-01-10T00:00:00Z',
    playTime: '45-60 min',
    players: '2-6 players',
    complexity: 'Medium'
  },
  {
    id: '3',
    slug: 'mystery-mansion',
    title: 'Mystery Mansion',
    tagline: 'Solve the mystery before time runs out',
    description: 'A deductive mystery game where players work together to solve a murder in a spooky mansion. Gather clues, question suspects, and uncover the truth in this thrilling cooperative experience.',
    category: 'Mystery',
    tags: ['Mystery', 'Deduction', 'Cooperative'],
    mainImage: '/placeholder.svg?height=400&width=400',
    createdDate: '2024-01-05T00:00:00Z',
    playTime: '30-45 min',
    players: '3-5 players',
    complexity: 'Medium'
  },
  {
    id: '4',
    slug: 'pirate-cove',
    title: 'Pirate Cove',
    tagline: 'Sail the seven seas for treasure',
    description: 'Ahoy matey! Set sail as a pirate captain seeking treasure and glory. Navigate dangerous waters, battle rival pirates, and build your reputation in this swashbuckling adventure.',
    category: 'Adventure',
    tags: ['Pirates', 'Adventure', 'Competitive'],
    mainImage: '/placeholder.svg?height=400&width=400',
    createdDate: '2023-12-20T00:00:00Z',
    playTime: '25-40 min',
    players: '2-4 players',
    complexity: 'Light'
  },
  {
    id: '5',
    slug: 'robot-factory',
    title: 'Robot Factory',
    tagline: 'Build the most efficient robot assembly line',
    description: 'Manage your robot factory by optimizing production lines, upgrading machinery, and fulfilling orders. A strategic puzzle game that challenges your planning and resource management skills.',
    category: 'Strategy',
    tags: ['Robots', 'Factory', 'Puzzle'],
    mainImage: '/placeholder.svg?height=400&width=400',
    createdDate: '2023-12-15T00:00:00Z',
    playTime: '35-50 min',
    players: '1-4 players',
    complexity: 'Medium'
  },
  {
    id: '6',
    slug: 'forest-spirits',
    title: 'Forest Spirits',
    tagline: 'Restore balance to the enchanted forest',
    description: 'Work together as forest guardians to heal a corrupted woodland. Use the power of nature spirits to cleanse dark magic and restore harmony to the forest in this beautiful cooperative game.',
    category: 'Cooperative',
    tags: ['Nature', 'Spirits', 'Cooperative'],
    mainImage: '/placeholder.svg?height=400&width=400',
    createdDate: '2023-12-10T00:00:00Z',
    playTime: '20-35 min',
    players: '2-4 players',
    \
