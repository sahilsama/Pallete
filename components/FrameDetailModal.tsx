"use client"
import { Button } from "@/components/ui/button"

interface Frame {
  id: number
  image: string
  prompt: string
  author: string
  totalLikes: number
  isLiked: boolean
}

interface FrameDetailModalProps {
  isOpen: boolean
  onClose: () => void
  frame: {
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
  } | null
}

export function FrameDetailModal({ isOpen, onClose, frame }: FrameDetailModalProps) {
  if (!isOpen || !frame) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="border border-white/20 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row gap-8"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Left Side: Media */}
        <div className="flex-1 flex items-center justify-center min-h-[200px] md:min-h-full">
          <img
            src={frame.image || "/placeholder.svg"}
            alt={frame.prompt.substring(0, 50)}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Frame Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-white/90 text-sm font-medium">Prompt:</p>
                <p className="text-white/80 text-base leading-relaxed max-h-40 overflow-y-auto">{frame.prompt}</p>
              </div>
              <div>
                <p className="text-white/90 text-sm font-medium">Author:</p>
                <p className="text-white/80 text-base">~{frame.author}</p>
              </div>
              <div>
                <p className="text-white/90 text-sm font-medium">Likes:</p>
                <p className="text-red-400 text-base">{frame.totalLikes}</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
} 