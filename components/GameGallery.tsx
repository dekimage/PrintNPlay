"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface GameGalleryProps {
  images: string[]
  title: string
}

export function GameGallery({ images, title }: GameGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={`${title} - Image ${selectedImage + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Close Button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 border-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
