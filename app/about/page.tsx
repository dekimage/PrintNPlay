import type { Metadata } from "next"
import Image from "next/image"
import { SectionHeader } from "@/components/SectionHeader"

export const metadata: Metadata = {
  title: "About | Print & Play",
  description: "Learn about Print & Play Games and the team behind small, fast, and fun TTRPG experiences",
}

const teamMembers = [
  {
    name: "Andreja Popovikj",
    role: "Game Designer & Founder · Artist & Creative Director",
    bio: "Passionate about creating accessible TTRPG experiences that can be enjoyed in under an hour, and about bringing them to life with strong artwork and intuitive visual design.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <SectionHeader
          title="About Print & Play"
          subtitle="Creating small, fast, and fun TTRPG experiences for everyone"
        />

        <div className="prose prose-invert prose-lg max-w-none mb-16">
          <p>
            Print & Play Games was founded with a simple mission: to create tabletop RPG experiences that are
            accessible, engaging, and can be enjoyed without weeks of preparation or hours of commitment. We believe
            that great stories and memorable adventures can happen in any amount of time, whether you have 15 minutes or
            2 hours.
          </p>

          <p>
            Our games are designed to be printed at home, require minimal setup, and focus on creative storytelling over
            complex mechanics. We're passionate about lowering the barriers to entry for TTRPG gaming while maintaining
            the depth and creativity that makes these experiences special.
          </p>

          <h2>Our Philosophy</h2>
          <ul>
            <li>
              <strong>Small:</strong> Compact games that don't overwhelm new players
            </li>
            <li>
              <strong>Fast:</strong> Quick setup and play sessions that respect your time
            </li>
            <li>
              <strong>Fun:</strong> Engaging mechanics that prioritize enjoyment over complexity
            </li>
          </ul>

          <p>
            Every game we create is playtested extensively with groups of varying experience levels to ensure they
            deliver on our promise of being small, fast, and fun. We're committed to supporting the indie TTRPG
            community and making our hobby more inclusive and accessible.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-white/80 font-medium mb-3">{member.role}</p>
                <p className="text-white/70">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 bg-white/5 rounded-lg border border-white/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Get in Touch?</h2>
          <p className="text-white/80 mb-6">
            We'd love to hear from you! Whether you have questions about our games, feedback, or just want to say hello,
            don't hesitate to reach out.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
