"use client"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Artwork } from "@/data/artworks"

interface ArtworkPopupProps {
  artwork: Artwork | null
  isVisible: boolean
  position: { x: number; y: number }
}

export function ArtworkPopup({ artwork, isVisible, position }: ArtworkPopupProps) {
  if (!artwork) return null

  // Calculate position to avoid going off-screen
  const getAdjustedPosition = () => {
    const popupWidth = 320 // w-80 = 320px
    const popupHeight = 200 // approximate height
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800

    let x = position.x + 20
    let y = position.y - 20

    // Adjust horizontal position if popup would go off-screen
    if (x + popupWidth > windowWidth - 20) {
      x = position.x - popupWidth - 20
    }

    // Adjust vertical position if popup would go off-screen
    if (y + popupHeight > windowHeight - 20) {
      y = position.y - popupHeight - 20
    }

    // Ensure popup doesn't go above or to the left of the screen
    x = Math.max(20, x)
    y = Math.max(20, y)

    return { x, y }
  }

  const adjustedPosition = getAdjustedPosition()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: adjustedPosition.x,
            top: adjustedPosition.y,
          }}
        >
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden w-80 max-w-[90vw]">
            <div className="flex flex-col md:flex-row">
              {/* Media Section */}
              <div className="relative w-full md:w-1/2 h-48 md:h-auto">
                <Image
                  src={artwork.image || "/placeholder.jpg"}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Details Section */}
              <div className="p-4 md:p-5 flex-1">
                <h3 className="font-semibold text-white text-lg mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {artwork.title}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  by {artwork.artist}
                </p>
                <p className="text-white/60 text-sm mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {artwork.description || "A stunning piece of contemporary artwork that showcases the artist's unique vision and creative expression."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-lg">
                    {artwork.price}
                  </span>
                  <div className="text-xs text-white/50">
                    {artwork.medium || "Mixed Media"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 