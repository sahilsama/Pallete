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
  video: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  autoplayMode: "all" | "hover"
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
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 127,
    isLiked: false,
    author: "Design Studio",
    createdAt: new Date("2024-01-15"),
    likeHistory: [],
    prompt:
      "Create a modern, minimalist company presentation video with smooth transitions and professional typography. Focus on clean design elements and subtle animations that convey innovation and reliability.",
  },
  {
    id: 2,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 89,
    isLiked: false,
    author: "WebGL Master",
    createdAt: new Date("2024-01-18"),
    likeHistory: [],
    prompt:
      "Design an interactive WebGL experience with fluid 3D animations and particle effects. Emphasize dynamic lighting, smooth camera movements, and responsive user interactions for an immersive digital experience.",
  },
  {
    id: 3,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 203,
    isLiked: false,
    author: "Motion Designer",
    createdAt: new Date("2024-01-20"),
    likeHistory: [],
    prompt:
      "Create an eye-catching animated poster using Jitter with vibrant colors and dynamic motion graphics. Include playful typography animations and geometric shapes that create visual rhythm and energy.",
  },
  {
    id: 4,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 156,
    isLiked: false,
    author: "Video Producer",
    createdAt: new Date("2024-01-22"),
    likeHistory: [],
    prompt:
      "Produce a web-optimized video with fast loading times and crisp quality. Focus on storytelling through visual narrative, incorporating smooth transitions and engaging content that works across all devices and browsers.",
  },
  {
    id: 5,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_verti_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 94,
    isLiked: false,
    author: "Brand Designer",
    createdAt: new Date("2024-01-25"),
    likeHistory: [],
    prompt:
      "Design an animated logo reveal with sophisticated motion design. Create a memorable brand moment using elegant transitions, perfect timing, and visual elements that reinforce brand identity and values.",
  },
  {
    id: 6,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner-1.png",
    edgeVertical: "https://static.cdn-luma.com/files/1199340587e8da1d/6_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 178,
    isLiked: false,
    author: "Animator",
    createdAt: new Date("2024-01-28"),
    likeHistory: [],
    prompt:
      "Create a complex character animation with fluid movements and expressive gestures. Focus on personality-driven motion, natural timing, and detailed character interactions that bring life to digital personas.",
  },
  {
    id: 7,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 142,
    isLiked: false,
    author: "Illustrator",
    createdAt: new Date("2024-02-01"),
    likeHistory: [],
    prompt:
      "Develop animated illustrations with artistic flair and creative storytelling. Combine hand-drawn aesthetics with digital animation techniques to create unique visual narratives that captivate and inspire.",
  },
  {
    id: 8,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/8_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/8_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/8_verticle.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 231,
    isLiked: false,
    author: "Art Director",
    createdAt: new Date("2024-02-05"),
    likeHistory: [],
    prompt:
      "Execute comprehensive art direction with cohesive visual language and strategic design decisions. Create unified brand experiences through careful attention to color, typography, composition, and visual hierarchy.",
  },
  {
    id: 9,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/9_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/9_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/9_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    totalLikes: 167,
    isLiked: false,
    author: "Product Designer",
    createdAt: new Date("2024-02-08"),
    likeHistory: [],
    prompt:
      "PA dreamlike landscape that blends abstract elements with recognizable natural forms. Moreno's signature use of vibrant colors creates an emotional response that transcends traditional landscape painting.",
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
    video: string
    prompt: string
    author: string
  }) => {
    const newId = Math.max(...frames.map((f) => f.id), 0) + 1
    const position = getAvailablePosition()

    const newFrame: Frame = {
      id: newId,
      video: frameData.video,
      prompt: frameData.prompt,
      author: frameData.author,
      corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
      edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
      edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
      defaultPos: position,
      mediaSize: 1,
      borderThickness: 0,
      borderSize: 80,
      autoplayMode: "all",
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
    <div className="space-y-4 w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="autoplay-toggle"
              checked={autoplayMode === "all"}
              onCheckedChange={(checked) => setAutoplayMode(checked ? "all" : "hover")}
            />
            <label htmlFor="autoplay-toggle" className="text-sm text-white/70">
              {autoplayMode === "all" ? "Autoplay All" : "Hover Autoplay"}
            </label>
          </div>
        </div>

      </div>

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
                video={frame.video}
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
