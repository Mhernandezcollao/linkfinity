import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

interface Props {
    title: string
}

export const MyTitle = ({title}: Props) => {
    
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Hide the container until the fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector("h2")!
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
            className="flex justify-start items-center w-full invisible" 
            ref={containerRef}
        >
            <h2 className="leading-tight font-bold text-[26px] text-skycustom tracking-wider scale-y-90">
                {title}
            </h2>
        </div>
    )
}