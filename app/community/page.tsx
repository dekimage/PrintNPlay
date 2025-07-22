import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { CommunityCard } from "@/components/CommunityCard";
import { LINKS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Community | Print & Play",
  description: "Join the Print & Play community on Discord, Patreon, and more",
};

const communityLinks = [
  {
    title: "Discord Server",
    description: "Join our community for discussions, playtesting, and updates",
    image: "/discord.webp",
    href: LINKS.discord,
  },
  {
    title: "Patreon",
    description: "Support us and get exclusive content and early access",
    image: "/patreon.png",
    href: LINKS.patreon,
  },
  {
    title: "YouTube",
    description: "Watch tutorials, playthroughs, and behind-the-scenes content",
    iconName: "youtube",
    href: LINKS.youtube,
  },
  {
    title: "Instagram",
    description: "Follow us for visual updates and community highlights",
    iconName: "instagram",
    href: LINKS.instagram,
  },
  {
    title: "DriveThruRPG",
    description: "Purchase our games and support independent creators",
    image: "/drive.png",
    href: LINKS.drivethru,
  },
  {
    title: "Itch.io",
    description: "Download free games and pay-what-you-want titles",
    image: "/itch.jpg",
    href: LINKS.itch,
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <SectionHeader
          title="Join Our Community"
          subtitle="Connect with fellow TTRPG enthusiasts and stay updated with our latest releases"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityLinks.map((link) => (
            <CommunityCard key={link.title} {...link} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Join Our Community?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Early Access</h3>
              <p className="text-white/70">
                Get first access to new games and beta versions
              </p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Exclusive Content</h3>
              <p className="text-white/70">
                Access to patron-only games and bonus materials
              </p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Direct Feedback</h3>
              <p className="text-white/70">
                Shape the future of our games with your input
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
