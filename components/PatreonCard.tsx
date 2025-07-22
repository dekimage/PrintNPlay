import Link from "next/link";
import { Heart, Star, Gift } from "lucide-react";
import { LINKS } from "@/lib/config";

export function PatreonCard() {
  return (
    <Link
      href={LINKS.patreon}
      target="_blank"
      className="group block p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold group-hover:text-white/90">
            Patreon
          </h3>
          <p className="text-white/60">Support our work</p>
        </div>
      </div>

      <p className="text-white/80 mb-6">
        Support Print & Play Games and get exclusive access to patron-only
        games, early releases, behind-the-scenes content, and special rewards.
      </p>

      <div className="flex items-center gap-6 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          <span>Exclusive Content</span>
        </div>
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4" />
          <span>Early Access</span>
        </div>
      </div>
    </Link>
  );
}
