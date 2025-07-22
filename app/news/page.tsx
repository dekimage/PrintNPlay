import type { Metadata } from "next"
import { PostCard } from "@/components/PostCard"
import { SectionHeader } from "@/components/SectionHeader"
import { getAllPosts } from "@/lib/contentful"

export const metadata: Metadata = {
  title: "News & Updates | Print & Play",
  description: "Latest news, updates, and insights from Print & Play Games",
}

export default async function NewsPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <SectionHeader title="News & Updates" subtitle="Stay up to date with the latest from Print & Play Games" />

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No posts available at the moment.</p>
            <p className="text-white/40 mt-2">Check back soon for updates!</p>
          </div>
        )}
      </div>
    </div>
  )
}
