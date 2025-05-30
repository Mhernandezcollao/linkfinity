import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

interface Props {
    text: string
    href?: string | undefined
    onClick?: () => void
}

export const MyLink = ({text, href, onClick}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Hide the container until the fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector("a",)!
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
            className="flex justify-end items-center w-full invisible" 
            ref={containerRef}
        >
            <a href={href} onClick={onClick} className="text-skycustom text-end font-light text-[11px] mb-[12px] cursor-pointer">
                {text}
            </a>
        </div>
    )
}
