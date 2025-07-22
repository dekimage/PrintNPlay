import type { Metadata } from "next"
import { SectionHeader } from "@/components/SectionHeader"
import { MessageCircle, Mail, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Support | Print & Play",
  description: "Get help and support for Print & Play Games",
}

const supportOptions = [
  {
    title: "Contact Us",
    description: "Send us a message directly for personalized support",
    icon: Mail,
    href: "/contact",
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "FAQ",
    description: "Find answers to frequently asked questions",
    icon: HelpCircle,
    href: "/faq",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Discord Community",
    description: "Get help from our community and team members",
    icon: MessageCircle,
    href: "https://discord.gg/placeholder",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Game Rules",
    description: "Download rulebooks and reference materials",
    icon: FileText,
    href: "/games",
    color: "from-orange-500 to-red-600",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <SectionHeader
          title="Support Center"
          subtitle="We're here to help you get the most out of your Print & Play experience"
        />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {supportOptions.map((option) => {
            const Icon = option.icon
            return (
              <Link
                key={option.title}
                href={option.href}
                className="group p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-white/90">{option.title}</h3>
                <p className="text-white/70 group-hover:text-white/80">{option.description}</p>
              </Link>
            )
          })}
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-white/5 rounded-lg border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Common Issues</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Printing Problems</h3>
                <p className="text-white/80">
                  Make sure to print at 100% scale (no scaling) and use cardstock for best results. If text appears
                  blurry, check your printer settings and ensure you're using high-quality mode.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Rule Clarifications</h3>
                <p className="text-white/80">
                  Each game includes a comprehensive rulebook. For additional clarifications, check our Discord
                  community where experienced players and designers can help.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Download Issues</h3>
                <p className="text-white/80">
                  If you're having trouble downloading files, try clearing your browser cache or using a different
                  browser. Contact us if the problem persists.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/5 rounded-lg border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Response Times</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">Less than 1 hour</div>
                <p className="text-white/80">Discord Community</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">Less than 24 hours</div>
                <p className="text-white/80">Email Support</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">Instant</div>
                <p className="text-white/80">FAQ & Resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
