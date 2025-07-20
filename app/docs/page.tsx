import { ppEditorialNewUltralightItalic, inter } from "@/app/fonts"
import { Navbar } from "@/components/Navbar" // Import Navbar

export const metadata = {
  title: "Prompt Library Docs",
  description: "Detailed documentation for the Prompt Library Collection",
}

export default function DocsPage() {
  return (
    <div
      className={`min-h-screen bg-[#141414] flex flex-col items-center p-8 pt-20 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <Navbar /> {/* Include Navbar here for consistency, though it's also in layout.tsx */}
      <main className="w-full max-w-3xl text-white/80 space-y-8">
        <h1
          className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-5xl font-light italic text-white/90 tracking-tighter leading-[130%] mb-8 text-center`}
        >
          Prompt Library <br /> Documentation
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white/90">Purpose</h2>
          <p className="text-white/70">
            The Prompt Library Collection is an interactive platform designed to inspire creativity in design and
            animation. It provides a curated set of prompts, each accompanied by a visual example (image or video), to
            help artists, designers, and animators kickstart their projects or explore new ideas.
          </p>
          <p className="text-white/70">
            Our goal is to offer a dynamic and engaging way to discover creative challenges, learn from examples, and
            contribute to a growing community of visual creators.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white/90">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="font-medium text-white/90">Dynamic Grid Layout:</span> A responsive grid that rearranges
              and scales frames based on hover interactions.
            </li>
            <li>
              <span className="font-medium text-white/90">Interactive Cards:</span> Each card features a video or image
              on the front and a detailed prompt on the back, revealed with a smooth flip animation.
            </li>
            <li>
              <span className="font-medium text-white/90">Real-time Likes:</span> A heart icon on each card displays
              real-time like counts, with a toggle to like/unlike and subtle animations.
            </li>
            <li>
              <span className="font-medium text-white/90">Frame Details Modal:</span> Click on any card to open a modal
              displaying the media, full prompt, author, and like count in a detailed view.
            </li>
            <li>
              <span className="font-medium text-white/90">Add/Delete Frames (Edit Mode):</span> Users can enter an "Edit
              Mode" to add new frames (with video URL/file upload, prompt, and author) or delete existing ones.
            </li>
            <li>
              <span className="font-medium text-white/90">Like Data Export:</span> Export comprehensive statistics about
              likes, including total likes, average likes, top performers, and author breakdowns, in JSON or CSV
              formats.
            </li>
            <li>
              <span className="font-medium text-white/90">Autoplay Options:</span> Toggle between autoplaying all videos
              or only playing videos on hover.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white/90">Usage Instructions</h2>
          <h3 className="text-xl font-medium text-white/90">Browsing the Library:</h3>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="font-medium text-white/90">Hover Interaction:</span> Move your mouse over any card to
              enlarge it and pause/play the video (depending on autoplay settings).
            </li>
            <li>
              <span className="font-medium text-white/90">Reveal Prompt:</span> Click the "Prompt" button at the bottom
              of a card to flip it and reveal the creative prompt on the back. Click anywhere on the back of the card to
              flip it back.
            </li>
            <li>
              <span className="font-medium text-white/90">View Details:</span> Click anywhere on the front of a card
              (excluding the like or prompt buttons) to open a detailed modal view of the frame.
            </li>
            <li>
              <span className="font-medium text-white/90">Like/Unlike:</span> Click the heart icon in the top-left
              corner of a card to toggle your like status. The total like count will update in real-time.
            </li>
            <li>
              <span className="font-medium text-white/90">Autoplay Toggle:</span> Use the "Autoplay All" / "Hover
              Autoplay" switch at the top to control video playback behavior.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-white/90">Managing Frames (Edit Mode):</h3>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="font-medium text-white/90">Enter Edit Mode:</span> Click the "Edit Mode" button in the
              top-right corner. The button will turn red, indicating you are in edit mode.
            </li>
            <li>
              <span className="font-medium text-white/90">Add New Frame:</span> While in Edit Mode, click the "Add
              Frame" button. A modal will appear where you can upload a video/image file or provide a URL, enter a
              prompt, and specify an author.
            </li>
            <li>
              <span className="font-medium text-white/90">Delete Frame:</span> In Edit Mode, a delete icon will appear
              on each card. Click it to remove the frame from the collection.
            </li>
            <li>
              <span className="font-medium text-white/90">Exit Edit Mode:</span> Click the "Exit Edit" button to return
              to normal browsing mode.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-white/90">Exporting Data:</h3>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="font-medium text-white/90">Open Export Modal:</span> Click the "Export Data" button in
              the top-right corner.
            </li>
            <li>
              <span className="font-medium text-white/90">Select Format:</span> Choose between JSON (for detailed,
              structured data) or CSV (for spreadsheet-friendly data).
            </li>
            <li>
              <span className="font-medium text-white/90">Copy Statistics:</span> Use the "Copy Stats" button to quickly
              copy a summary of the library's like statistics to your clipboard.
            </li>
            <li>
              <span className="font-medium text-white/90">Download Data:</span> Click the "Export [Format]" button to
              download the selected data to your device.
            </li>
          </ul>
        </section>

        <footer className="text-center text-white/50 text-sm pt-8 border-t border-white/10 mt-12">
          <p>&copy; {new Date().getFullYear()} Prompt Library Collection. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
} 