
import type { Metadata } from "next"
import About from "~/components/about"
import Hero from "~/components/Hero"
import Navbar from "~/components/Navbar"
import TechStack from "~/components/tech-stack"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Professional portfolio of vamsidhar - Software Developer",
}

export default function Home() {
  return (
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <TechStack />
      </main>
  )
}