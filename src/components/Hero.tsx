"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import DaySky from './day-sky'
import NightSky from './night-sky'
import { useTheme } from './theme-provider'

export default function Hero() {
    const [text, setText] = useState("")
    const fullText = 'Full Stack Developer | Open Source Contributor | Tech Enthusiast'
    const { theme,setTheme,transitioning } = useTheme();

    console.log("transitioning",transitioning);

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if(index < fullText.length) {
                setText(fullText.substring(0,index + 1))
                index++;
            }else{
                clearInterval(typingInterval)
            }
        },100)

        return () => clearInterval(typingInterval)
    },[])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }

    return (
        <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32">
            <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
            theme === "light" ? "opacity-100" : "opacity-0"
            } ${transitioning ? "pointer-events-none" : ""}`}
        >
        <DaySky />
        </div>

        <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
            } ${transitioning ? "pointer-events-none" : ""}`}
        >
        <NightSky />
      </div>
            <div className="container mx-auto px-4">
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} >
                        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                           {"Hi, I'm"} <span className='text-primary'>
                                Vamsidhar
                            </span>
                        </h1>
                        <h2 className='text-2xl md:text-3xl font-medium text-muted-foreground mb-6'>
                            <span className='text-foreground'>{text}</span>
                            <span className='animate-blink'>|</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                            I build exceptional digital experiences with clean code and modern technologies. Turning complex problems
                            into elegant solutions is what I do best.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="group" onClick={() => scrollToSection("projects")}>
                                View My Work
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                                Contact Me
                            </Button>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative aspect-square max-w-md mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full"></div>
                        {/* <div className="absolute inset-4 bg-muted rounded-full overflow-hidden"> */}
                        <img
                            src="https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775232_1280.png"
                            alt="MemoryLeaked"
                            className="w-full h-full object-cover"
                        />
                        {/* </div> */}
                    </motion.div>
                </div>
            </div>
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
                <button onClick={() => scrollToSection("about")} className="animate-bounce">
                <ArrowRight className="h-6 w-6 transform rotate-90" />
                </button>
            </div>
        </section>
    )
}