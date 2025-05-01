"use client"

export default function Footer(){
    const currentYear = new Date().getFullYear();

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

    return(
        <footer className="bg-muted py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-lg font-bold text-primary cursor-pointer" onClick={() => scrollToSection("home")}>
                            Vamsidhar
                        </p>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-muted-foreground">© {currentYear} MemoryLeaked. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}