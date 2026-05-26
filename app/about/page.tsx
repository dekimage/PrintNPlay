import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArticleHeader,
  ArticleSection,
  articleBodyClassName,
} from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "About | PrintN'Play",
  description:
    "Learn about PrintN'Play Games and the team behind small, fast, and fun TTRPG experiences",
};

const teamMembers = [
  {
    name: "Andreja Popovikj",
    role: "Founder & Game Designer",
    bio: "Passionate about printable and digital games and curious about the worlds that live in-between them.",
    image: "/andreja.jpg",
  },
  {
    name: "Andrej Popovski",
    role: "3D Artist",
    bio: "A passionate gamer and 3D modeler with a special taste for low-poly stylized models. Interested in game-ready modeling optimized for indie games.",
    image: "/andrej.jpg",
  },
];

export default function AboutPage() {
  return (
    <article className="min-h-screen py-16">
      <div className="container max-w-3xl">
        <ArticleHeader
          title="About PrintN'Play"
          subtitle="The bridge between printable TTRPGs and digital games."
        />

        <div className={`${articleBodyClassName} mb-16`}>
          <p>
            PrintN&apos;Play Games was founded with a simple mission: to create
            tabletop RPG experiences that are accessible, engaging, and can be
            enjoyed without weeks of preparation or hours of commitment. We
            believe that great stories and memorable adventures can happen in
            any amount of time, whether you have 15 minutes or 2 hours.
          </p>

          <p>
            Our games are designed to be printed at home, require minimal setup,
            and focus on creative storytelling over complex mechanics. We&apos;re
            passionate about lowering the barriers to entry for TTRPG gaming
            while maintaining the depth and creativity that makes these
            experiences special.
          </p>

          <ArticleSection title="Our Philosophy">
            <ul>
              <li>
                <strong>Small:</strong> Compact games that don&apos;t overwhelm
                new players
              </li>
              <li>
                <strong>Fast:</strong> Quick setup and play sessions that
                respect your time
              </li>
              <li>
                <strong>Fun:</strong> Engaging mechanics that prioritize
                enjoyment over complexity
              </li>
            </ul>
          </ArticleSection>

          <p>
            Every game we create is playtested extensively with groups of
            varying experience levels to ensure they deliver on our promise of
            being small, fast, and fun. We&apos;re committed to supporting the
            indie TTRPG community and making our hobby more inclusive and
            accessible.
          </p>
        </div>

        <div className="border-t border-white/10 pt-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Meet the Team</h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{member.name}</h3>
                <p className="mb-3 font-medium text-white/80">{member.role}</p>
                <p className="leading-relaxed text-white/70">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Want to Get in Touch?</h2>
          <p className="mb-6 leading-relaxed text-white/80">
            We&apos;d love to hear from you! Whether you have questions about
            our games, feedback, or just want to say hello, don&apos;t hesitate
            to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </article>
  );
}
