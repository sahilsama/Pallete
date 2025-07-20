"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Frame {
  id: number
  video: string
  prompt: string
  totalLikes: number
  isLiked: boolean
  author: string
  createdAt: Date
  likeHistory: { timestamp: Date; action: "like" | "unlike" }[]
}

interface LikeExportModalProps {
  isOpen: boolean
  onClose: () => void
  frames: Frame[]
}

export function LikeExportModal({ isOpen, onClose, frames }: LikeExportModalProps) {
  const [exportFormat, setExportFormat] = useState<"json" | "csv">("json")

  const generateStatistics = () => {
    const totalFrames = frames.length
    const totalLikes = frames.reduce((sum, frame) => sum + frame.totalLikes, 0)
    const averageLikes = totalFrames > 0 ? (totalLikes / totalFrames).toFixed(2) : "0"
    const likedByUser = frames.filter((frame) => frame.isLiked).length
    const mostLikedFrame = frames.reduce((max, frame) => (frame.totalLikes > max.totalLikes ? frame : max), frames[0])
    const leastLikedFrame = frames.reduce((min, frame) => (frame.totalLikes < min.totalLikes ? frame : min), frames[0])

    // Author statistics
    const authorStats = frames.reduce(
      (acc, frame) => {
        if (!acc[frame.author]) {
          acc[frame.author] = { frames: 0, totalLikes: 0 }
        }
        acc[frame.author].frames++
        acc[frame.author].totalLikes += frame.totalLikes
        return acc
      },
      {} as Record<string, { frames: number; totalLikes: number }>,
    )

    const topAuthor = Object.entries(authorStats).reduce(
      (max, [author, stats]) => (stats.totalLikes > max.totalLikes ? { author, ...stats } : max),
      { author: "", frames: 0, totalLikes: 0 },
    )

    return {
      totalFrames,
      totalLikes,
      averageLikes,
      likedByUser,
      mostLikedFrame: mostLikedFrame
        ? {
            id: mostLikedFrame.id,
            author: mostLikedFrame.author,
            likes: mostLikedFrame.totalLikes,
            prompt: mostLikedFrame.prompt.substring(0, 100) + "...",
          }
        : null,
      leastLikedFrame: leastLikedFrame
        ? {
            id: leastLikedFrame.id,
            author: leastLikedFrame.author,
            likes: leastLikedFrame.totalLikes,
            prompt: leastLikedFrame.prompt.substring(0, 100) + "...",
          }
        : null,
      topAuthor,
      authorStats,
    }
  }

  const exportData = () => {
    const stats = generateStatistics()
    const exportData = {
      exportDate: new Date().toISOString(),
      statistics: stats,
      frames: frames.map((frame) => ({
        id: frame.id,
        author: frame.author,
        totalLikes: frame.totalLikes,
        isLikedByUser: frame.isLiked,
        createdAt: frame.createdAt.toISOString(),
        prompt: frame.prompt,
        likeHistory: frame.likeHistory.map((entry) => ({
          timestamp: entry.timestamp.toISOString(),
          action: entry.action,
        })),
      })),
    }

    if (exportFormat === "json") {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `prompt-library-data-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // CSV Export
      const csvHeaders = ["ID", "Author", "Total Likes", "Liked by User", "Created Date", "Prompt Preview"]
      const csvRows = frames.map((frame) => [
        frame.id,
        frame.author,
        frame.totalLikes,
        frame.isLiked ? "Yes" : "No",
        frame.createdAt.toLocaleDateString(),
        `"${frame.prompt.substring(0, 100).replace(/"/g, '""')}..."`,
      ])

      const csvContent = [csvHeaders, ...csvRows].map((row) => row.join(",")).join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `prompt-library-data-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const copyToClipboard = () => {
    const stats = generateStatistics()
    const text = `Prompt Library Statistics

📊 Overview:
• Total Frames: ${stats.totalFrames}
• Total Likes: ${stats.totalLikes}
• Average Likes per Frame: ${stats.averageLikes}
• Frames Liked by You: ${stats.likedByUser}

🏆 Top Performing:
• Most Liked: Frame ${stats.mostLikedFrame?.id} by ${stats.mostLikedFrame?.author} (${stats.mostLikedFrame?.likes} likes)
• Top Author: ${stats.topAuthor.author} (${stats.topAuthor.totalLikes} total likes across ${stats.topAuthor.frames} frames)

📈 Author Breakdown:
${Object.entries(stats.authorStats)
  .sort(([, a], [, b]) => b.totalLikes - a.totalLikes)
  .map(([author, stats]) => `• ${author}: ${stats.frames} frames, ${stats.totalLikes} likes`)
  .join("\n")}

Generated on: ${new Date().toLocaleString()}`

    navigator.clipboard.writeText(text).then(() => {
      alert("Statistics copied to clipboard!")
    })
  }

  if (!isOpen) return null

  const stats = generateStatistics()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="border border-white/20 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Export Like Data & Statistics</h2>

        {/* Statistics Overview */}
        <div className="mb-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-400">{stats.totalFrames}</div>
              <div className="text-white/70 text-sm">Total Frames</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-red-400">{stats.totalLikes}</div>
              <div className="text-white/70 text-sm">Total Likes</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-400">{stats.averageLikes}</div>
              <div className="text-white/70 text-sm">Avg Likes</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-400">{stats.likedByUser}</div>
              <div className="text-white/70 text-sm">Your Likes</div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">🏆 Top Performers</h3>
            {stats.mostLikedFrame && (
              <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="text-white font-medium">Most Liked Frame</div>
                <div className="text-white/70 text-sm">
                  Frame {stats.mostLikedFrame.id} by {stats.mostLikedFrame.author} • {stats.mostLikedFrame.likes} likes
                </div>
                <div className="text-white/50 text-xs mt-1">{stats.mostLikedFrame.prompt}</div>
              </div>
            )}
            <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-white font-medium">Top Author</div>
              <div className="text-white/70 text-sm">
                {stats.topAuthor.author} • {stats.topAuthor.totalLikes} total likes across {stats.topAuthor.frames}{" "}
                frames
              </div>
            </div>
          </div>

          {/* Author Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">👥 Author Breakdown</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(stats.authorStats)
                .sort(([, a], [, b]) => b.totalLikes - a.totalLikes)
                .map(([author, authorStats]) => (
                  <div
                    key={author}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg backdrop-blur-sm"
                  >
                    <span className="text-white font-medium">{author}</span>
                    <div className="text-right">
                      <div className="text-white/70 text-sm">{authorStats.totalLikes} likes</div>
                      <div className="text-white/50 text-xs">{authorStats.frames} frames</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-white">📤 Export Options</h3>

          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="json"
                checked={exportFormat === "json"}
                onChange={(e) => setExportFormat(e.target.value as "json")}
                className="text-blue-500"
              />
              <span className="text-white/80">JSON (Detailed)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={exportFormat === "csv"}
                onChange={(e) => setExportFormat(e.target.value as "csv")}
                className="text-blue-500"
              />
              <span className="text-white/80">CSV (Spreadsheet)</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={copyToClipboard}
            className="flex-1 bg-purple-600/80 hover:bg-purple-600 text-white backdrop-blur-sm"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            📋 Copy Stats
          </Button>
          <Button
            onClick={exportData}
            className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-sm"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
            }}
          >
            💾 Export {exportFormat.toUpperCase()}
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
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
