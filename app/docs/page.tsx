import { ppEditorialNewUltralightItalic, inter } from "@/app/fonts"
import { Navbar } from "@/components/Navbar" // Import Navbar

export const metadata = {
  title: "Pallete Docs",
  description: "Detailed documentation for the Pallete Collection",
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
          Pallete <br /> Documentation
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white/90">Purpose</h2>
          <p className="text-white/70">
            The Pallete is a Creative Art Gallery that holds one of the creative patterns,photos designed to inspire creativity in design and
            animation. It provides a curated set of Canvas, each accompanied by a prompts example, to
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
              Fun Fact - Right now the author are fake profiles created by developer.
            </li>
            <li>
              <span className="font-medium text-white/90">Artistic Medium:</span> Each artwork includes details about the creative medium used, such as flux model, 
              Lucid Realism for digital illustration, or Krea for mixed media, providing insight into the artist's technique and process.
            </li>
            {/* Feature remove */}
            {/* <li>
              <span className="font-medium text-white/90">Like Data Export:</span> Export comprehensive statistics about
              likes, including total likes, average likes, top performers, and author breakdowns, in JSON or CSV
              formats.
            </li> */}

            {/* <li>
              <span className="font-medium text-white/90">Autoplay Options:</span> Toggle between autoplaying all videos
              or only playing videos on hover.
            </li> */}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white/90">Privacy Policy & Terms</h2>

          <h3 className="text-xl font-medium text-white/90">Artist Rights & Content Usage</h3>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="font-medium text-white/90">Artist Ownership:</span> All artworks displayed on Pallete remain the intellectual property of their respective creators. We do not claim ownership over any submitted content.
            </li>
            <li>
              <span className="font-medium text-white/90">Content Removal:</span> If you are an artist and wish to have your work removed from our platform, please contact us at support@pallete.com. We will process your request within 7 business days.
            </li>
            <li>
              <span className="font-medium text-white/90">Attribution:</span> We make every effort to properly credit artists for their work. If you notice any attribution errors, please notify us immediately.
            </li>
            <li>
              <span className="font-medium text-white/90">Content Moderation:</span> We reserve the right to remove any content that violates our community guidelines or contains inappropriate material.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-white/90">User Data & Privacy</h3>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="font-medium text-white/90">Data Collection:</span> We collect minimal user data necessary for platform functionality, including like interactions and browsing preferences.
            </li>
            <li>
              <span className="font-medium text-white/90">Data Security:</span> We implement industry-standard security measures to protect user data, but cannot guarantee absolute security.
            </li>
            <li>
              <span className="font-medium text-white/90">Third-Party Sharing:</span> We do not sell or share user data with third parties except as required by law or necessary for platform operation.
            </li>
            <li>
              <span className="font-medium text-white/90">Cookies:</span> We use cookies to enhance user experience and analyze platform usage. You can manage cookie preferences in your browser settings.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-white/90">Terms of Use</h3>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="font-medium text-white/90">Content License:</span> By submitting content to Pallete, you grant us a non-exclusive, worldwide license to display and distribute your work on our platform.
            </li>
            <li>
              <span className="font-medium text-white/90">Prohibited Use:</span> Users may not use the platform for any illegal activities, harassment, or distribution of harmful content.
            </li>
            <li>
              <span className="font-medium text-white/90">Liability:</span> Pallete is not responsible for any damages resulting from platform use or content interactions.
            </li>
            <li>
              <span className="font-medium text-white/90">Changes to Terms:</span> We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of any changes.
            </li>
          </ul>

          <p className="text-white/70">
            For any questions or concerns regarding our policies, please contact us at support@pallete.com. We are committed to supporting artists and maintaining a safe, creative community.
          </p>
        </section>

        <footer className="text-center text-white/50 text-sm pt-8 border-t border-white/10 mt-12">
          <p>&copy; {new Date().getFullYear()} Pallete Studio. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
} 