"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

interface VideoEmbedProps {
  videoUrl: string
  title: string
}

export function VideoEmbed({ videoUrl, title }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeId(videoUrl)
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "/placeholder.svg?height=400&width=600"

  if (isPlaying && videoId) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    )
  }

  return (
    <div
      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => setIsPlaying(true)}
    >
      <Image
        src={thumbnailUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
          <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  )
}
