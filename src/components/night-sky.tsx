"use client"

import { useEffect, useRef } from "react"

export default function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width: number
    let height: number

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height

      // Reinitialize stars and shooting stars when resizing
      initializeEntities()
    }

    // Star class
    class Star {
      x: number
      y: number
      size: number
      speed: number

      constructor(options: { x: number; y: number }) {
        this.size = Math.random() * 2
        this.speed = Math.random() * 0.05
        this.x = options.x
        this.y = options.y
      }

      reset() {
        this.size = Math.random() * 2
        this.speed = Math.random() * 0.07
        this.x = width
        this.y = Math.random() * height
      }

      update() {
        this.x -= this.speed
        if (this.x < 0) {
          this.reset()
        } else {
          ctx?.fillRect(this.x, this.y, this.size, this.size)
        }
      }
    }

    // ShootingStar class
    class ShootingStar {
      x: number
      y: number
      len: number
      speed: number
      size: number
      waitTime: number
      active: boolean
      opacity: number

      constructor() {
        this.x = Math.random() * width
        this.y = 0
        this.len = Math.random() * 80 + 10
        this.speed = Math.random() * 10 + 2
        this.size = Math.random() * 1 + 0.1
        this.waitTime = new Date().getTime() + Math.random() * 3000 + 900
        this.active = false
        this.opacity = 1
      }

      reset() {
        this.x = Math.random() * width
        this.y = 0
        this.len = Math.random() * 80 + 10
        this.speed = Math.random() * 10 + 2
        this.size = Math.random() * 1 + 0.1
        this.waitTime = new Date().getTime() + Math.random() * 3000 + 900
        this.active = false
        this.opacity = 1
      }

      update() {
        if (this.active) {
          this.x -= this.speed
          this.y += this.speed
          this.opacity -= 0.01 // Gradually fade out

          if (this.x < -this.len || this.y >= height || this.opacity <= 0) {
            this.reset()
          } else if (ctx) {
            const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.len, this.y - this.len)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = this.size
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x + this.len, this.y - this.len)
            ctx.stroke()
          }
        } else {
          if (this.waitTime < new Date().getTime()) {
            this.active = true
          }
        }
      }
    }

    let entities: (Star | ShootingStar)[] = []

    // Initialize stars and shooting stars
    function initializeEntities() {
      entities = []

      // Create stars based on screen size
      const numStars = Math.min(Math.floor(height / 2), 1000)

      for (let i = 0; i < numStars; i++) {
        entities.push(
          new Star({
            x: Math.random() * width,
            y: Math.random() * height,
          }),
        )
      }

      // Add shooting stars
      for (let i = 0; i < 5; i++) {
        entities.push(new ShootingStar())
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      // Clear canvas with dark background
      ctx.fillStyle = "#0d0d0d"
      ctx.fillRect(0, 0, width, height)

      // Set default color for stars
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#ffffff"

      // Update and draw all entities
      for (let i = 0; i < entities.length; i++) {
        entities[i]!.update()
      }

      requestAnimationFrame(animate)
    }

    // Initialize
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Start animation
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
