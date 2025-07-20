"use client"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { Artwork } from "@/data/artworks"

interface ArtworkModalProps {
  artwork: Artwork | null
  isOpen: boolean
  onClose: () => void
}

export function ArtworkModal({ artwork, isOpen, onClose }: ArtworkModalProps) {
  if (!artwork) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold text-white">Artwork Details</h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Media Section */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-auto bg-muted">
                  <Image
                    src={artwork.image || "/placeholder.jpg"}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Details Section */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {artwork.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        ~{artwork.artist}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-white/80 mb-2">Prompt</h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {artwork.description || "A stunning piece of contemporary artwork that showcases the artist's unique vision and creative expression."}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-white font-semibold text-lg">
                          {artwork.artist}
                        </span>
                        <p className="text-xs text-white/50 mt-1">
                          {artwork.medium || "Mixed Media"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 