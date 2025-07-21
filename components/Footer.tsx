"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { ppEditorialNewUltralightItalic } from "@/app/fonts" // Import the custom font

export function Footer() {
  return (
    <footer className="bg-[#141414] text-white py-12 px-8 md:px-16 lg:px-24 bor">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2
            className={`${ppEditorialNewUltralightItalic.className} text-4xl font-light italic text-white/90 tracking-tighter leading-[130%]`}
          >
            Prompt
            <br />
            Library
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            A contemporary art gallery showcasing emerging and established artists from around the world.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Navigation</h3>
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="text-white/70 hover:text-white hover:underline transition-colors text-sm">
              Home
            </Link>
            <Link href="/gallery" className="text-white/70 hover:text-white hover:underline transition-colors text-sm">
              Gallery
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-white hover:underline transition-colors text-sm">
              Contact
            </Link>
          </nav>
        </div>

        {/* Contact Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <address className="not-italic text-white/70 text-sm space-y-1">
            <p>Clement town</p>
            <p>Dehradun, IN 10001</p>
            <p>Email: info@artistrygallery.com</p>
            <p>Phone: +1 (212) 555-1234</p>
          </address>
        </div>

        {/* Social & Subscribe Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
            </Link>
          </div>

          <div className="space-y-2 pt-4">
            <p className="text-lg font-semibold text-white">Subscribe</p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-white/30 focus:border-white/30"
              />
              <Button
                type="submit"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
        <p>© {new Date().getFullYear()} Artistry Gallery. All rights reserved.</p>
      </div>
    </footer>
  )
} 