"use client";

import Link from "next/link";
import { Youtube, Instagram } from "lucide-react";

interface CommunityCardProps {
  title: string;
  description: string;
  iconName?: string;
  image?: string;
  href: string;
}

export function CommunityCard({
  title,
  description,
  iconName,
  image,
  href,
}: CommunityCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "youtube":
        return <Youtube className="w-6 h-6 text-white" />;
      case "instagram":
        return <Instagram className="w-6 h-6 text-white" />;
      default:
        return <div className="w-6 h-6 bg-white/20 rounded" />;
    }
  };

  return (
    <Link
      href={href}
      target="_blank"
      className="group block p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-8 h-8 h-auto object-contain"
            />
          ) : iconName ? (
            getIcon(iconName)
          ) : (
            <div className="w-6 h-6 bg-white/20 rounded" />
          )}
        </div>
        <h3 className="text-xl font-bold group-hover:text-white/90">{title}</h3>
      </div>
      <p className="text-white/80 group-hover:text-white/90">{description}</p>
    </Link>
  );
}
