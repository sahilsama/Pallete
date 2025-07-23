"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent"
import { AddFrameModal } from "./AddFrameModal"
import { LikeExportModal } from "./LikeExportModal"
import { FrameDetailModal } from "./FrameDetailModal"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const GRID_SIZE = 12
const CELL_SIZE = 60 // pixels per grid cell

interface Frame {
  id: number
  image: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  isHovered: boolean
  prompt: string
  totalLikes: number
  isLiked: boolean
  author: string
  createdAt: Date
  likeHistory: { timestamp: Date; action: "like" | "unlike" }[]
}

const initialFrames: Frame[] = [
  {
    id: 1,
    image: "/images/dragon.jpg",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 127,
    isLiked: false,
    author: "Design Studio",
    createdAt: new Date("2024-01-15"),
    likeHistory: [],
    prompt: "A dragon in a rooftop garden.",
  },
  {
    id: 2,
    image: "/images/flower.png",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 89,
    isLiked: false,
    author: "WebGL Master",
    createdAt: new Date("2024-01-18"),
    likeHistory: [],
    prompt: "Three hibiscus flowers in a painting style.",
  },
  {
    id: 3,
    image: "/images/god.png",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 203,
    isLiked: false,
    author: "Motion Designer",
    createdAt: new Date("2024-01-20"),
    likeHistory: [],
    prompt: "Stained glass geometric style of a female African angel.",
  },
  {
    id: 4,
    image: "/images/iranian.png",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 156,
    isLiked: false,
    author: "Video Producer",
    createdAt: new Date("2024-01-22"),
    likeHistory: [],
    prompt: "Iranian art inspired image.",
  },
  {
    id: 5,
    image: "/images/goldengirl.png",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 111,
    isLiked: false,
    author: "Artist 5",
    createdAt: new Date("2024-01-25"),
    likeHistory: [],
    prompt: "A woman with gold and amber paintwork.",
  },
  {
    id: 6,
    image: "/images/flux1.png",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 99,
    isLiked: false,
    author: "Artist 6",
    createdAt: new Date("2024-01-28"),
    likeHistory: [],
    prompt: "Close-up portrait with a yellow handbag.",
  },
  {
    id: 7,
    image: "/images/floral suit.png",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 77,
    isLiked: false,
    author: "Artist 7",
    createdAt: new Date("2024-02-01"),
    likeHistory: [],
    prompt: "Luxury fashion floral suit.",
  },
  {
    id: 8,
    image: "/images/model.jpg",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 88,
    isLiked: false,
    author: "Artist 8",
    createdAt: new Date("2024-02-04"),
    likeHistory: [],
    prompt: "Woman in a black satin dress.",
  },
  {
    id: 9,
    image: "/images/anime.jpg",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    totalLikes: 66,
    isLiked: false,
    author: "Artist 9",
    createdAt: new Date("2024-02-07"),
    likeHistory: [],
    prompt: "Anime style ephemeral moment.",
  },
]

export default function DynamicFrameLayout() {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  const [autoplayMode, setAutoplayMode] = useState<"all" | "hover">("all")
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null)

  const getAvailablePosition = () => {
    const usedPositions = frames.map((frame) => ({
      x: frame.defaultPos.x,
      y: frame.defaultPos.y,
    }))

    // Find first available position in 3x3 grid
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = col * 4
        const y = row * 4
        const isUsed = usedPositions.some((pos) => pos.x === x && pos.y === y)
        if (!isUsed) {
          return { x, y, w: 4, h: 4 }
        }
      }
    }

    // If all positions are taken, add to end
    return { x: 0, y: 12, w: 4, h: 4 }
  }

  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateFrameProperty = (id: number, property: keyof Frame, value: number) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, [property]: value } : frame)))
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) {
      setShowControls(false)
    }
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  const handleLike = (frameId: number) => {
    setFrames(
      frames.map((frame) => {
        if (frame.id === frameId) {
          const wasLiked = frame.isLiked
          const newIsLiked = !wasLiked
          const timestamp = new Date()

          // Calculate the correct total likes - simple increment/decrement
          let newTotalLikes = frame.totalLikes
          if (newIsLiked && !wasLiked) {
            // User is liking (was not liked before)
            newTotalLikes = frame.totalLikes + 1
          } else if (!newIsLiked && wasLiked) {
            // User is unliking (was liked before)
            newTotalLikes = Math.max(0, frame.totalLikes - 1) // Prevent negative likes
          }

          // Update like history
          const newLikeHistory = [
            ...frame.likeHistory,
            { timestamp, action: newIsLiked ? ("like" as const) : ("unlike" as const) },
          ]

          return {
            ...frame,
            isLiked: newIsLiked,
            totalLikes: newTotalLikes,
            likeHistory: newLikeHistory,
          }
        }
        return frame
      }),
    )
  }

  const handleDelete = (frameId: number) => {
    setFrames(frames.filter((frame) => frame.id !== frameId))
  }

  const handleFrameClick = (frame: Frame) => {
    if (!isEditMode) {
      setSelectedFrame(frame)
      setIsDetailModalOpen(true)
    }
  }

  const handleAddFrame = (frameData: {
    image: string
    prompt: string
    author: string
  }) => {
    const newId = Math.max(...frames.map((f) => f.id), 0) + 1
    const position = getAvailablePosition()

    const newFrame: Frame = {
      id: newId,
      image: frameData.image,
      prompt: frameData.prompt,
      author: frameData.author,
      corner: "",
      edgeHorizontal: "",
      edgeVertical: "",
      defaultPos: position,
      mediaSize: 1,
      borderThickness: 0,
      borderSize: 80,
      isHovered: false,
      totalLikes: 0,
      isLiked: false,
      createdAt: new Date(),
      likeHistory: [],
    }

    setFrames([...frames, newFrame])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update likes on frames to simulate real-time activity
      if (Math.random() > 0.8) {
        // 20% chance every 5 seconds
        const randomFrameId = frames[Math.floor(Math.random() * frames.length)]?.id
        if (randomFrameId) {
          setFrames((prevFrames) =>
            prevFrames.map((frame) => {
              if (frame.id === randomFrameId) {
                return { ...frame, totalLikes: frame.totalLikes + Math.floor(Math.random() * 2) + 1 }
              }
              return frame
            }),
          )
        }
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [frames])

  return (
    <div className="space-y-4 w-full h-full mt-20 md:mt-15">
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Dynamic Frame Layout</h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Hide Controls" : "Show Controls"}</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Show UI" : "Hide UI"}</Button>
          </div>
        </div>
      )}

      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gap-size" className="block text-sm font-medium text-gray-200">
              Gap Size: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}

      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => !isEditMode && setHovered({ row, col })}
              onMouseLeave={() => !isEditMode && setHovered(null)}
            >
              <FrameComponent
                image={frame.image}
                width="100%"
                height="100%"
                className="absolute inset-0"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={(value) => updateFrameProperty(frame.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateFrameProperty(frame.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateFrameProperty(frame.id, "borderSize", value)}
                showControls={showControls && !cleanInterface}
                label={`Frame ${frame.id}`}
                autoplayMode={autoplayMode}
                isHovered={
                  hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
                likes={frame.totalLikes}
                isLiked={frame.isLiked}
                onLike={() => handleLike(frame.id)}
                onDelete={() => handleDelete(frame.id)}
                isEditMode={isEditMode}
                prompt={frame.prompt}
                author={frame.author}
                onClick={() => handleFrameClick(frame)}
              />
            </motion.div>
          )
        })}
      </div>

      <AddFrameModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddFrame} />
      <LikeExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} frames={frames} />
      <FrameDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        frame={selectedFrame}
        onLike={() => selectedFrame && handleLike(selectedFrame.id)}
      />
    </div>
  )
}
