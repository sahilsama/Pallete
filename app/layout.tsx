import "./globals.css"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import { Navbar } from "@/components/Navbar"
// import { Footer } from "@/components/Footer"
import { ConditionalFooter } from "@/components/ConditionalFooter"
import type React from "react"
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Pallete",
  description: "Pallete - A dynamic platform for contemporary art exploration and inspiration",
  generator: 'vscode'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/pallete studio.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <div>
          <main className="min-h-screen">
            {children}
          </main>
        </div>
        <ConditionalFooter />
        <Analytics />
      </body>
    </html>
  )
}
