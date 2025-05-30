import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Props {
    text_button: string;
    border: boolean
    onClick: () => void
}

export const GlowButton = ({text_button, border, onClick}: Props) => {

    const ref = useRef<HTMLButtonElement>(null)
    const [{ width, height, top, left }, measure] = useElementDimensions(ref)

    const pointerX = useMotionValue(0.5)
    const pointerY = useMotionValue(0.5)

    const glow = useTransform(() => {
        const x = pointerX.get() * 100
        const y = pointerY.get() * 100

        return `radial-gradient(circle at ${x}% ${y}%, #65D3F1, transparent 60%)`
    })

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "42px",
                width: "100%",
                margin: "16px 0"
            }}
            onPointerMove={(e) => {
                pointerX.set((e.clientX - left) / width)
                pointerY.set((e.clientY - top) / height)
            }}
        >
            <motion.button
                whileTap={{ scale: 0.9 }}
                ref={ref}
                onPointerEnter={measure}
                className="w-full h-[42px] rounded-md text-[12px] my-[16px]"
                style={{
                    background: glow,
                    backgroundColor: "#65D3F1",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    border: border ? "1px solid #65D3F1" : "none",
                    zIndex: 0,
                }}
                onClick={onClick}
            >
                {text_button}
            </motion.button>
        </div>
    )
}

function useElementDimensions(
    ref: React.RefObject<HTMLElement | null>
): [
    { width: number; height: number; top: number; left: number },
    VoidFunction
] {
    const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 })

    function measure() {
        if (!ref.current) return
        setSize(ref.current.getBoundingClientRect())
    }

    useEffect(() => {
        measure()
    }, [])

    return [size, measure]
}
