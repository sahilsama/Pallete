"use client"
import { Slider } from "@/components/ui/slider"
import type React from "react"

import { useEffect, useRef, useState } from "react"

interface FrameComponentProps {
  video: string
  width: number | string
  height: number | string
  className?: string
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  onMediaSizeChange: (value: number) => void
  onBorderThicknessChange: (value: number) => void
  onBorderSizeChange: (value: number) => void
  showControls: boolean
  label: string
  autoplayMode: "all" | "hover"
  isHovered: boolean
  prompt: string
  likes: number
  isLiked: boolean
  onLike: () => void
  onDelete: () => void
  isEditMode: boolean
  author: string
  onClick?: () => void
}

export function FrameComponent({
  video,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  onMediaSizeChange,
  onBorderThicknessChange,
  onBorderSizeChange,
  showControls,
  label,
  autoplayMode,
  isHovered,
  prompt,
  likes,
  isLiked,
  onLike,
  onDelete,
  isEditMode,
  author,
  onClick,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [likeAnimation, setLikeAnimation] = useState(false)

  useEffect(() => {
    if (autoplayMode === "all") {
      videoRef.current?.play()
    } else if (autoplayMode === "hover") {
      if (isHovered) {
        videoRef.current?.play()
      } else {
        videoRef.current?.pause()
      }
    }
  }, [isHovered, autoplayMode])

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isEditMode) {
      setIsFlipped(!isFlipped)
    }
  }

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only flip if clicking on the background, not on content
    if (e.target === e.currentTarget && !isEditMode) {
      setIsFlipped(false)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete()
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isEditMode) {
      setLikeAnimation(true)
      onLike()
      // Reset animation after it completes
      setTimeout(() => setLikeAnimation(false), 600)
    }
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side - Video */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Delete Button - Edit Mode Only */}
            {isEditMode && (
              <div className="absolute top-3 right-3 z-30">
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-full bg-red-500/80 backdrop-blur-sm hover:bg-red-600/90 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Likes Heart - Upper Left Corner */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 transition-all duration-300">
              <button
                onClick={handleLike}
                className={`transition-all duration-300 relative ${
                  isEditMode ? "cursor-not-allowed opacity-50" : "hover:scale-110"
                } ${isLiked ? "text-red-500 hover:text-red-400" : "text-white/60 hover:text-red-400"}`}
                disabled={isEditMode}
              >
                {isLiked ? (
                  // Filled heart when liked
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`transition-all duration-300 ${likeAnimation ? "animate-bounce scale-125" : ""}`}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  // Outline heart when not liked
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-all duration-300 ${likeAnimation ? "animate-bounce scale-125" : ""}`}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )}

                {/* Floating animation for like/unlike */}
                {likeAnimation && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    <span
                      className={`font-bold text-sm animate-ping opacity-75 ${
                        isLiked ? "text-red-400" : "text-white/60"
                      }`}
                    >
                      {isLiked ? "+1" : "-1"}
                    </span>
                  </div>
                )}
              </button>

              <span
                className={`text-white/80 text-sm font-medium transition-all duration-300 ${
                  likeAnimation ? "scale-110 text-white" : ""
                }`}
              >
                {likes}
              </span>
            </div>

            {/* Liquid Glass Prompt Button - Bottom Center */}
            {!isEditMode && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <button
                  onClick={handleFlip}
                  className="group relative px-8 py-3 rounded-full border border-white/30 backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/50"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <span className="text-white font-medium text-sm tracking-wide">Prompt</span>
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                    }}
                  />
                </button>
              </div>
            )}

            {/* Video with Border */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              style={{
                zIndex: 1,
                transition: "all 0.3s ease-in-out",
              }}
              onClick={onClick}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  transform: `scale(${mediaSize})`,
                  transformOrigin: "center",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <video
                  className="w-full h-full object-cover"
                  src={video}
                  loop
                  muted
                  playsInline
                  autoPlay={autoplayMode === "all" || (autoplayMode === "hover" && isHovered)}
                  ref={videoRef}
                  onError={(e) => {
                    console.error("Video failed to load:", video, e)
                    // Show a fallback message or placeholder
                    const videoElement = e.currentTarget
                    videoElement.style.display = "none"
                    // Show fallback content
                    const container = videoElement.parentElement
                    if (container) {
                      container.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gray-800 text-white text-center p-4">
                          <div>
                            <svg class="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                            <p class="text-sm text-gray-300">Video failed to load</p>
                            <p class="text-xs text-gray-500 mt-1">Check the URL or file format</p>
                          </div>
                        </div>
                      `
                    }
                  }}
                  onLoadStart={() => {
                    console.log("Video loading started:", video)
                  }}
                  onCanPlay={() => {
                    console.log("Video can play:", video)
                  }}
                  onMouseEnter={(e) => {
                    if (autoplayMode === "hover") {
                      e.currentTarget.play().catch(err => console.error("Failed to play video:", err))
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (autoplayMode === "hover") {
                      e.currentTarget.pause()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Back Side - Prompt */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          onClick={handleBackgroundClick}
        >
          <div className="p-6 h-full flex flex-col justify-center items-center text-center relative">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
              <div className="w-12 h-px bg-white/30 mx-auto"></div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-white/80 text-sm leading-relaxed max-w-full overflow-y-auto">{prompt}</p>
            </div>

            {/* Author Attribution - Bottom Right */}
            <div className="absolute bottom-4 right-4">
              <span className="text-white/50 text-xs font-medium italic">~{author}</span>
            </div>

            <div className="mt-4 text-xs text-white/40">Click here to go back</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 z-10">
          <div className="text-white font-bold mb-2">{label}</div>
          <div className="space-y-2">
            <div>
              <label htmlFor={`media-size-${label}`} className="block text-sm font-medium text-white">
                Media Size: {mediaSize.toFixed(2)}
              </label>
              <Slider
                id={`media-size-${label}`}
                min={0.5}
                max={3}
                step={0.01}
                value={[mediaSize]}
                onValueChange={(value) => onMediaSizeChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-thickness-${label}`} className="block text-sm font-medium text-white">
                Border Thickness: {borderThickness}px
              </label>
              <Slider
                id={`border-thickness-${label}`}
                min={0}
                max={20}
                step={1}
                value={[borderThickness]}
                onValueChange={(value) => onBorderThicknessChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-size-${label}`} className="block text-sm font-medium text-white">
                Border Size: {borderSize}%
              </label>
              <Slider
                id={`border-size-${label}`}
                min={50}
                max={100}
                step={1}
                value={[borderSize]}
                onValueChange={(value) => onBorderSizeChange(value[0])}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
