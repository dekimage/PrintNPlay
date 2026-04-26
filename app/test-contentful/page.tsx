"use client";

import {
  useGames,
  useCategories,
  useTags,
  usePosts,
} from "@/context/DataContext";

export default function TestContentfulPage() {
  const games = useGames();
  const categories = useCategories();
  const tags = useTags();
  const posts = usePosts();

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Contentful Connection Test</h1>

      <div className="grid gap-8">
        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Categories ({categories.length})
          </h2>
          {categories.length === 0 ? (
            <p className="text-gray-400">
              No categories found. Make sure you have created the 'category'
              content type in Contentful.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 border rounded-lg"
                  style={{ borderColor: category.color }}
                >
                  <h3 className="font-bold">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.slug}</p>
                  {category.description && (
                    <p className="text-sm mt-2">{category.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tags */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Tags ({tags.length})</h2>
          {tags.length === 0 ? (
            <p className="text-gray-400">
              No tags found. Make sure you have created the 'tag' content type
              in Contentful.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Games */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Games ({games.length})</h2>
          {games.length === 0 ? (
            <p className="text-gray-400">
              No games found. Make sure you have created the 'game' content type
              in Contentful and added some games.
            </p>
          ) : (
            <div className="grid gap-4">
              {games.map((game) => (
                <div key={game.id} className="p-4 border rounded-lg">
                  <h3 className="text-xl font-bold">{game.title}</h3>
                  <p className="text-gray-400">{game.tagline}</p>
                  {game.category && (
                    <div className="mt-2">
                      <span
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: game.category.color,
                          color: "#000",
                        }}
                      >
                        {game.category.name}
                      </span>
                    </div>
                  )}
                  {game.tags && game.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {game.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 bg-gray-700 text-xs rounded"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {game.externalLinks && game.externalLinks.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">External Links:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {game.externalLinks.map((link) => (
                          <span
                            key={link.id}
                            className="px-2 py-1 bg-blue-900 text-xs rounded"
                          >
                            {link.platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Posts ({posts.length})</h2>
          {posts.length === 0 ? (
            <p className="text-gray-400">
              No posts found. Make sure you have created the 'post' content type
              in Contentful and added some posts.
            </p>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-400">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 bg-gray-700 text-xs rounded"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
