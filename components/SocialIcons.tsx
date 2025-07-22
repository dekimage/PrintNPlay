import Link from "next/link"
import { MessageCircle, Heart, Youtube, Instagram, ShoppingBag, Download } from "lucide-react"
import { LINKS } from "@/lib/config"
import { cn } from "@/lib/utils"

interface SocialIconsProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SocialIcons({ size = "md", className }: SocialIconsProps) {
  const iconSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size]

  const containerSize = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }[size]

  const socialLinks = [
    {
      name: "Discord",
      href: LINKS.discord,
      icon: MessageCircle,
      color: "hover:text-indigo-400",
    },
    {
      name: "Patreon",
      href: LINKS.patreon,
      icon: Heart,
      color: "hover:text-orange-400",
    },
    {
      name: "YouTube",
      href: LINKS.youtube,
      icon: Youtube,
      color: "hover:text-red-400",
    },
    {
      name: "Instagram",
      href: LINKS.instagram,
      icon: Instagram,
      color: "hover:text-pink-400",
    },
    {
      name: "DriveThruRPG",
      href: LINKS.drivethru,
      icon: ShoppingBag,
      color: "hover:text-green-400",
    },
    {
      name: "Itch.io",
      href: LINKS.itch,
      icon: Download,
      color: "hover:text-red-300",
    },
  ]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-300 hover:bg-white/20 hover:scale-110",
              containerSize,
              social.color,
            )}
            aria-label={social.name}
          >
            <Icon className={iconSize} />
          </Link>
        )
      })}
    </div>
  )
}
