
import type { Metadata } from "next"
import Hero from "~/components/Hero"
import Navbar from "~/components/Navbar"

export const metadata: Metadata = {
  title: "MemoryLeaked | Portfolio",
  description: "Professional portfolio of MemoryLeaked - Software Developer",
}

export default function Home() {
  return (
      <main className="min-h-screen">
        <Navbar />
        <Hero />
      </main>
  )
}