"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { VenetianMask, Disc, MessageCircle, Twitter } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

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
          <span className="text-white text-lg font-semibold tracking-tight">
            Pallete
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-7 text-lg">
          <Link
            href="/"
            className={cn(
              "text-white/70 hover:text-white transition-colors text-lg",
              pathname === "/" &&
                "text-white font-semibold border-b-2 border-white"
            )}
          >
            Overview
          </Link>
          <Link
            href="/docs"
            className={cn(
              "text-white/70 hover:text-white transition-colors text-base",
              pathname === "/docs" &&
                "text-white font-semibold border-b-2 border-white"
            )}
          >
            Docs
          </Link>

          <Link
            href="https://www.reddit.com"
            target="_blank"
            className="text-white/70 hover:text-white transition-colors"
          >
            <MessageCircle size={20} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-white/70 hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </Link>
        </div>

        {/* Gallery Button (make entire control a Link) */}
        <div className="group inline-block">
          <Link
            href="/gallery"
            className="relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-black text-white border-2 border-transparent px-3 pr-5 py-2"
          >
            {/* Purple fill starts from left and expands right on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl bg-[#6b50ff] transform-gpu origin-left scale-x-[0.30] transition-transform duration-1000 ease-out group-hover:scale-x-100 z-0"
            />
            <span className="relative z-10 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg  transition-colors duration-300 group-hover:bg-transparent">
                <img src="/next.png" alt="icon" className="w-8 h-8" />
              </span>
              <span className="font-mono tracking-[0.2em] text-sm md:text-base">Gallery</span>
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition-all duration-300 group-hover:ring-2 group-hover:ring-black"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
