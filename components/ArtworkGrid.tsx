"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { artworks, Artwork } from "@/data/artworks"
import { ArtworkModal } from "./ArtworkModal"
import { Play } from "lucide-react"

export function ArtworkGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArtwork(null)
  }

  const renderMedia = (artwork: Artwork) => {
    if (artwork.video) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            src={artwork.video}
            className="w-full h-full object-cover"
            muted
            loop
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Play className="w-6 h-6 text-white" fill="white" />
            </div>
          </div>
        </div>
      )
    }

    if (artwork.image) {
      return (
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      )
    }

    // Fallback placeholder
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-muted-foreground text-sm">No media</div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {artworks.map((artwork) => (
          <motion.div 
            key={artwork.id} 
            variants={item}
            onClick={() => handleArtworkClick(artwork)}
            className="cursor-pointer group block overflow-hidden rounded-lg"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              {renderMedia(artwork)}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white">{artwork.title}</h3>
              <p className="text-sm text-white/70">{artwork.artist}</p>
              <p className="mt-2 text-sm font-medium text-white/90">{artwork.price}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
} 