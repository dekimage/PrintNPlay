import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/models";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block bg-white/5 rounded-lg border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
    >
      {post.coverImage && (
        <div className="relative aspect-video">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 group-hover:text-white/90 line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-white/80 mb-4 line-clamp-3">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedDate}>
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          {post.authorName && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.authorName}</span>
            </div>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
