"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AddFrameModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (frameData: {
    video: string
    prompt: string
    author: string
  }) => void
}

export function AddFrameModal({ isOpen, onClose, onAdd }: AddFrameModalProps) {
  const [formData, setFormData] = useState({
    videoUrl: "",
    prompt: "",
    author: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate inputs
    if (!formData.prompt.trim()) {
      alert("Please enter a prompt")
      return
    }
    
    if (!formData.author.trim()) {
      alert("Please enter an author name")
      return
    }
    
    if (!formData.videoUrl && !uploadedFile) {
      alert("Please provide either a video file or URL")
      return
    }
    
    // Validate URL if provided
    if (formData.videoUrl && !uploadedFile) {
      try {
        new URL(formData.videoUrl)
      } catch {
        alert("Please enter a valid video URL")
        return
      }
    }
    
    const videoSource = uploadedFile ? URL.createObjectURL(uploadedFile) : formData.videoUrl

    onAdd({
      video: videoSource,
      prompt: formData.prompt.trim(),
      author: formData.author.trim(),
    })
    setFormData({
      videoUrl: "",
      prompt: "",
      author: "",
    })
    setUploadedFile(null)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      setUploadedFile(file)
      setFormData((prev) => ({ ...prev, videoUrl: "" })) // Clear URL when file is uploaded
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="border border-white/20 rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Add New Frame</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Upload Section */}
          <div className="space-y-4">
            <Label className="text-white/90 text-sm font-medium">Video Source *</Label>

            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                dragActive
                  ? "border-blue-400/60 bg-blue-400/10"
                  : uploadedFile
                    ? "border-green-400/60 bg-green-400/10"
                    : "border-white/30 hover:border-white/50 hover:bg-white/5"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: uploadedFile
                  ? "rgba(34, 197, 94, 0.1)"
                  : dragActive
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
                className="hidden"
              />

              {uploadedFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="text-green-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">{uploadedFile.name}</p>
                      <p className="text-white/60 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile()
                    }}
                    className="p-2 hover:bg-red-500/20 rounded-full transition-colors"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-red-400"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-white/70"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-white/90 font-medium mb-1">Drop your file here</p>
                  <p className="text-white/60 text-sm">or click to browse</p>
                  <p className="text-white/40 text-xs mt-2">MP4, MOV, JPG, PNG up to 50MB</p>
                </div>
              )}
            </div>

            {/* OR Divider */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-white/60 text-sm font-medium">OR</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* URL Input */}
            <Input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => handleChange("videoUrl", e.target.value)}
              placeholder="https://example.com/video.mp4"
              disabled={!!uploadedFile}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            />
          </div>

          {/* Prompt */}
          <div>
            <Label htmlFor="prompt" className="text-white/90 text-sm font-medium">
              Prompt *
            </Label>
            <Textarea
              id="prompt"
              value={formData.prompt}
              onChange={(e) => handleChange("prompt", e.target.value)}
              placeholder="Enter your creative prompt here..."
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 min-h-[100px] mt-2"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              required
            />
          </div>

          {/* Author */}
          <div>
            <Label htmlFor="author" className="text-white/90 text-sm font-medium">
              Author Name *
            </Label>
            <Input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
              placeholder="Your name"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 mt-2"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-sm"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
              }}
            >
              Add Frame
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
