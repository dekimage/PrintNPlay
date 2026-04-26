import type React from "react";
import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/config";
import { getEmptySiteData, getSiteData } from "@/lib/site-data";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialData = getEmptySiteData();
  try {
    initialData = await getSiteData();
  } catch (error) {
    console.error("Failed to load Contentful data for layout:", error);
  }

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jua.className} bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <DataProvider initialData={initialData}>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="relative z-0 flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </DataProvider>
      </body>
    </html>
  );
}
