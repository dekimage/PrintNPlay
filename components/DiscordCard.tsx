import Link from "next/link";
import { MessageCircle, Users, Gamepad2 } from "lucide-react";
import { LINKS } from "@/lib/config";

export function DiscordCard() {
  return (
    <Link
      href={LINKS.discord}
      target="_blank"
      className="group block p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold group-hover:text-white/90">
            Discord Server
          </h3>
          <p className="text-white/60">Join our community</p>
        </div>
      </div>

      <p className="text-white/80 mb-6">
        Connect with fellow players, get help with rules, share your
        experiences, and be the first to know about new releases and playtests.
      </p>

      <div className="flex items-center gap-6 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>Active Community</span>
        </div>
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" />
          <span>Game Discussions</span>
        </div>
      </div>
    </Link>
  );
}
