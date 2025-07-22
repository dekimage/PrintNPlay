import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { getPostBySlug, getAllPosts } from "@/lib/contentful";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Print & Play`,
    description: post.excerpt || post.body.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.body.substring(0, 160),
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen py-16">
      <div className="container max-w-4xl">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {post.excerpt && (
            <p className="text-xl text-white/80 mb-6">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedDate}>
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {post.authorName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.authorName}</span>
              </div>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <Tag className="w-4 h-4 text-white/60" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <RichTextRenderer content={post.body} />
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage,
            datePublished: post.publishedDate,
            author: {
              "@type": "Person",
              name: post.authorName || "Print & Play Games",
            },
            publisher: {
              "@type": "Organization",
              name: "Print & Play Games",
            },
          }),
        }}
      />
    </article>
  );
}
