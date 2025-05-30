import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

interface Props {
    text: string
    link: string
    href?: string | undefined
    onClick?: () => {}
}

export const TextLink = ({text, link, href, onClick}: Props) => {

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            containerRef.current.style.visibility = "visible"

            const p = containerRef.current.querySelector("p")
            const a = containerRef.current.querySelector("a")
            if (!p || !a) return

            const { words: pWords } = splitText(p)
            const { words: aWords } = splitText(a)

            animate(
                [...pWords, ...aWords],
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
            <p className="text-white font-light text-[12px]">
                {text}
            </p>
            <a
                href={href}
                onClick={onClick}
                className="text-skycustom font-light text-[12px] ml-[4px]"
            >
                {link}
            </a>
        </div>
    )
}
