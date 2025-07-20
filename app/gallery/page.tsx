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
    </div>
  )
} 