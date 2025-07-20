"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { artworks, Artwork } from "@/data/artworks"
import { ArtworkModal } from "./ArtworkModal"

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
              <Image
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
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