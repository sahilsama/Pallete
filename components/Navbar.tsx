"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" // Assuming cn utility is available

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 p-4 md:px-8 flex items-center justify-between border-b border-white/10"
      style={{
        background: "rgba(20, 20, 20, 0.8)", // Slightly transparent dark background
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-white text-lg font-semibold tracking-tight">
          Prompt Library
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/"
            className={cn(
              "text-white/60 hover:text-white transition-colors text-sm font-medium",
              pathname === "/" && "text-white font-semibold",
            )}
          >
            Home
          </Link>
                      <Link
              href="/docs"
              className={cn(
                "text-white/60 hover:text-white transition-colors text-sm font-medium",
                pathname === "/docs" && "text-white font-semibold",
              )}
            >
              Docs
            </Link>
            <Link
              href="/gallery"
              className={cn(
                "text-white/60 hover:text-white transition-colors text-sm font-medium",
                pathname === "/gallery" && "text-white font-semibold",
              )}
            >
              Gallery
            </Link>
        </div>
      </div>
    </nav>
  )
}
