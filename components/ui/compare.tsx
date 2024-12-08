"use client"

import * as React from "react"
import { useMotionValue, motion, useTransform } from "framer-motion"

export const Compare = ({
    before,
    after,
    className,
}: {
    before: React.ReactNode
    after: React.ReactNode
    className?: string
}) => {
    const [sliderWidth, setSliderWidth] = React.useState(0)
    const [sliderHeight, setSliderHeight] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)

    const containerRef = React.useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)

    React.useEffect(() => {
        if (containerRef.current) {
            setSliderWidth(containerRef.current.offsetWidth)
            setSliderHeight(containerRef.current.offsetHeight)
        }
    }, [])

    const sliderX = useTransform(x, (newX) => {
        const percentage = newX / sliderWidth
        const value = Math.min(Math.max(percentage, 0), 1)
        return `${value * 100}%`
    })

    const handleDragStart = () => setIsDragging(true)
    const handleDragEnd = () => setIsDragging(false)

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 z-10">{after}</div>
            <motion.div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${sliderX} 0 0)` }}
            >
                {before}
            </motion.div>
            <motion.div
                className="absolute inset-y-0 z-20 w-1 bg-white cursor-ew-resize"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: sliderWidth }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />
            <motion.div
                className="absolute z-30 flex items-center justify-center w-10 h-10 -ml-5 bg-white rounded-full cursor-ew-resize"
                style={{ x, y: sliderHeight / 2 - 20 }}
                drag="x"
                dragConstraints={{ left: 0, right: sliderWidth }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                </svg>
            </motion.div>
        </div>
    )
}

