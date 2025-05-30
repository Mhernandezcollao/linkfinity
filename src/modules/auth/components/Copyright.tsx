import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

interface Props{
    text: string
}

export const Copyright = ({text}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Hide the container until the fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector("p")!
            )

            // Animate the words in the h1
            animate(
                words,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 2,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })
    }, [])
    return (
        <div 
            className="flex justify-center items-center w-full invisible" 
            ref={containerRef}
        >
            <p className="text-center tracking-wider scale-y-90 text-[9px] text-white opacity-80 font-extralight">
                {text}
            </p>
        </div>
    )
}
