"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { VenetianMask, Disc, MessageCircle, Twitter } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 py-4 px-4 md:px-8 flex items-center justify-between border-b border-white/10"
      style={{
        background: "rgba(20, 20, 20, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center space-x-2">
          <VenetianMask className="h-6 w-6 text-white" />
          <span className="text-white text-lg font-semibold tracking-tight">Pallete</span>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-7 text-lg">
          <Link
            href="/"
            className={cn(
              "text-white/70 hover:text-white transition-colors text-lg",
              pathname === "/" && "text-white font-semibold border-b-2 border-white",
            )}
          >
            Overview
          </Link>
          <Link
            href="/docs"
            className={cn(
              "text-white/70 hover:text-white transition-colors text-base",
              pathname === "/docs" && "text-white font-semibold border-b-2 border-white",
            )}
          >
            Docs
          </Link>
          
          <Link href="https://www.reddit.com" target="_blank" className="text-white/70 hover:text-white transition-colors">
            <MessageCircle size={20} />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="text-white/70 hover:text-white transition-colors">
            <Twitter size={20} />
          </Link>
        </div>
        <Link
          href="/gallery"
          className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Gallery
        </Link>
      </div>
    </nav>
  )
}
