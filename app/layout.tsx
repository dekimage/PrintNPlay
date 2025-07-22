import type React from "react";
import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/config";

const jua = Jua({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jua",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.tagline,
  keywords: "TTRPG, tabletop games, print and play, RPG, board games",
  authors: [{ name: SITE.name }],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.tagline,
  },
};

async function getBootstrapData() {
  try {
    const response = await fetch(`${SITE.url}/api/bootstrap`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch bootstrap data:", error);
    // Return empty arrays if Contentful is not available
    return {
      games: [],
      posts: [],
      categories: [],
      tags: [],
      authors: [],
      artists: [],
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await getBootstrapData();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jua.className} bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <DataProvider initialData={initialData}>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </DataProvider>
      </body>
    </html>
  );
}
