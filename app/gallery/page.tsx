import { ppEditorialNewUltralightItalic, inter } from "@/app/fonts"
import { ArtworkGrid } from "@/components/ArtworkGrid"

export const metadata = {
  title: "Gallery Collection",
  description: "Browse our complete collection of contemporary artwork",
}

export default function GalleryPage() {
  return (
    <div
      className={`min-h-screen bg-[#141414] flex flex-col items-center p-8 pt-20 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <main className="w-full max-w-7xl text-white/80 space-y-8">
        <div className="mb-12 text-center md:text-left">
          <h1
            className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-5xl font-light italic text-white/90 tracking-tighter leading-[130%] mb-4`}
          >
            Gallery Collection
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto md:mx-0">
            Browse our complete collection of contemporary artwork
          </p>
        </div>
        <ArtworkGrid />
      </main>

      <a
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors mt-8"
      >
        Go back
      </a>

      <footer className="text-center text-white/50 text-sm pt-8 border-t border-white/10 mt-12">
          <p>&copy; {new Date().getFullYear()} Pallete Studio. All rights reserved.</p>
        </footer>
        
    </div>
  )
} 