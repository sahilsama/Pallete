"use client"
import { usePathname } from "next/navigation"
import { Footer } from "./Footer"

export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Don't render footer on docs and gallery pages
  if (pathname === "/docs" || pathname === "/gallery") {
    return null
  }
  
  return <Footer />
} 