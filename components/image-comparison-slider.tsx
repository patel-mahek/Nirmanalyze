'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageComparisonSliderProps {
    data: any
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [sliderPosition, setSliderPosition] = useState(50)

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < data.images.length - 1 ? prevIndex + 1 : prevIndex))
    }

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderPosition(Number(e.target.value))
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={data.last_image_url}
                    alt="Last image"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={data.images[currentIndex]}
                        alt={`Comparison image ${currentIndex + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-0 cursor-col-resize"
                />
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white"
                    style={{ left: `${sliderPosition}%` }}
                />
            </div>
            <div className="flex justify-between mt-4">
                <Button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0 || data.images.length <= 1}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={currentIndex === data.images.length - 1 || data.images.length <= 1}
                >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default ImageComparisonSlider

