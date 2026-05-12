import Link from "next/link";
import { LINKS } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  DiscordIcon,
  PatreonIcon,
  YoutubeIcon,
  InstagramIcon,
  ItchIoIcon,
  DriveThruRPGIcon,
} from "@/components/SocialBrandIcons";
import type { ComponentType } from "react";

interface SocialIconsProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ICONS: Record<
  "sm" | "md" | "lg",
  { icon: string; pad: string }
> = {
  sm: { icon: "w-[18px] h-[18px]", pad: "w-8 h-8" },
  md: { icon: "w-5 h-5", pad: "w-10 h-10" },
  lg: { icon: "w-6 h-6", pad: "w-12 h-12" },
};

export function SocialIcons({ size = "md", className }: SocialIconsProps) {
  const { icon: iconCls, pad: padCls } = ICONS[size];

  const socialLinks: {
    name: string;
    href: string;
    Icon: ComponentType<{ className?: string }>;
    color: string;
  }[] = [
    {
      name: "Discord",
      href: LINKS.discord,
      Icon: DiscordIcon,
      color: "hover:text-[#5865F2]",
    },
    {
      name: "Patreon",
      href: LINKS.patreon,
      Icon: PatreonIcon,
      color: "hover:text-[#FF424D]",
    },
    {
      name: "YouTube",
      href: LINKS.youtube,
      Icon: YoutubeIcon,
      color: "hover:text-[#FF0000]",
    },
    {
      name: "Instagram",
      href: LINKS.instagram,
      Icon: InstagramIcon,
      color: "hover:text-[#E4405F]",
    },
    {
      name: "DriveThruRPG",
      href: LINKS.drivethru,
      Icon: DriveThruRPGIcon,
      color: "hover:text-[#7AB942]",
    },
    {
      name: "Itch.io",
      href: LINKS.itch,
      Icon: ItchIoIcon,
      color: "hover:text-[#FA5C5C]",
    },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((social) => {
        const Icon = social.Icon;
        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20",
              padCls,
              social.color
            )}
            aria-label={social.name}
          >
            <Icon className={iconCls} />
          </Link>
        );
      })}
    </div>
  );
}
