import "./globals.css"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ConditionalFooter } from "@/components/ConditionalFooter"
import type React from "react"

export const metadata = {
  title: "Dynamic Frame Layout",
  description: "A dynamic frame layout with custom fonts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  )
}
