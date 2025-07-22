import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-white/80 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-3">Looking for something specific?</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/games" className="text-white/80 hover:text-white underline">
              Browse Games
            </Link>
            <Link href="/news" className="text-white/80 hover:text-white underline">
              Latest News
            </Link>
            <Link href="/community" className="text-white/80 hover:text-white underline">
              Join Community
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
