import { motion } from "framer-motion"
import type { JSX } from "react"

interface Props {
    children: JSX.Element | JSX.Element[]
}
export const MyDiv = ({children}: Props) => {
    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.6,
                opacity: { duration: 0.4 },
                scale: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                },
                y: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                },
            }}
        >
            {children}
        </motion.div>
    )
}
