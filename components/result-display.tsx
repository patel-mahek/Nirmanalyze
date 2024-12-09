'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Compare } from '@/components/ui/compare'
import ImageComparisonSlider from './image-comparison-slider'

interface ResultDisplayProps {
    result: any
    onRetry: () => void
    onSave: () => void
    formData: any
}

export function ResultDisplay({ result, onRetry, onSave, formData }: ResultDisplayProps) {
    // const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // const handleNextImage = () => {
    //     setCurrentImageIndex((prevIndex) =>
    //         prevIndex === result.images.length - 1 ? 0 : prevIndex + 1
    //     )
    // }

    // const handlePrevImage = () => {
    //     setCurrentImageIndex((prevIndex) =>
    //         prevIndex === 0 ? result.images.length - 1 : prevIndex - 1
    //     )
    // }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Image Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <Compare
                        className="h-[40vh] rounded-lg"
                        before={
                            <img
                                src={result.images[currentImageIndex]}
                                alt={`Current image ${currentImageIndex + 1}`}
                                className="h-full w-full object-cover"
                            />
                        }
                        after={
                            <img
                                src={result.last_image_url}
                                alt="Last image"
                                className="h-full w-full object-cover"
                            />
                        }
                    />
                    <div className="mt-4 flex justify-between">
                        <Button onClick={handlePrevImage}>Previous</Button>
                        <Button onClick={handleNextImage}>Next</Button>
                    </div> */}
                    <ImageComparisonSlider data={result} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {result.isValid_userDescription == false ? (<></>) :
                        (<><div>
                            <h3 className="text-lg font-semibold">Predicted Phase Name</h3>
                            <p>{result.predicted_phase_name}</p>
                        </div>
                            <div>
                                <h3 className="text-lg font-semibold">Predicted Activity Name</h3>
                                <p>{result.predicted_activity_name}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">SubActivity Description</h3>
                                <p>{result.subactivity_description_reasoning}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Status Changes</h3>
                                <ul className="list-disc pl-5">
                                    <li>SubActivity Status: {result.subactivity_status_impact}%</li>
                                    <li>Activity Status Change: {result.activity_status_impact}%</li>
                                    <li>Phase Status Change: {result.phase_status_impact}%</li>
                                    <li>Progress Status Change: {result.progress_status_impact}%</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Model Reasoning</h3>
                                {/* <h4 className="font-medium mt-2">Comments on the phase:</h4>
                                <p>{result.phase_comments_reasoning}</p> */}
                                <h4 className="font-medium mt-2">Comments on the activity:</h4>
                                <p>{result.activity_comments_reasoning}</p>
                            </div>
                            {result.warningDescription_conflicts && (
                                <div className="bg-yellow-100 p-4 rounded">
                                    <h3 className="text-lg font-semibold text-yellow-700">Warning</h3>
                                    <p>{result.warningDescription_conflicts}</p>
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-semibold">Additional Comments</h3>
                                <ul className="list-disc pl-5">
                                    {result.additional_comments.map((comment: string, index: number) => (
                                        <li key={index}>{comment}</li>
                                    ))}
                                </ul>
                            </div> </>
                        )}
                    <div className={`p-4 rounded ${result.isValid_userDescription ? 'bg-green-100' : 'bg-red-100'}`}>
                        <h3 className="text-lg font-semibold">User Description Validity</h3>
                        <p>
                            {result.isValid_userDescription
                                ? 'The user description is accurate.'
                                : 'The user description is not accurate.'}
                        </p>
                        {!result.isValid_userDescription && (
                            // <ul className="list-disc pl-5 mt-2">
                            //     {result.isValid_userDescription_Reasoning.map((reason: string, index: number) => (
                            //         <li key={index}>{reason}</li>
                            //     ))}
                            // </ul>
                            <p>{result.isValid_userDescription_Reasoning}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-between">
                {(result.warningDescription_conflicts || !result.isValid_userDescription) && (
                    <Button onClick={onRetry} variant="outline">Retry</Button>
                )}
                {result.isValid_userDescription == false ? <></> : <Button onClick={onSave}>Save Progress</Button>}
            </div>
        </div>
    )
}

