'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResultDisplay } from '@/components/result-display'

export function ComplexPageForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const projectName = searchParams.get('projectName')
    const [formData, setFormData] = useState({
        startLatitude: '',
        startLongitude: '',
        endLatitude: '',
        endLongitude: '',
        date: '',
        roadlength: '',
        description: '',
        images: [] as File[],
    })
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({ ...prev, images: Array.from(e.target.files!) }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'images' && Array.isArray(value)) {
                value.forEach((file: File) => {
                    data.append('images', file)
                })
            } else if (typeof value === 'string') {
                data.append(key, value)
            }
        })

        try {
            const response = await fetch(`${process.env.
                NEXT_PUBLIC_FAST_API_URL}/send-model?project_name=${encodeURIComponent(projectName || '')}`, {
                method: 'POST',
                body: data,
            })
            const result = await response.json()
            setResult(result)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleRetry = () => {
        setResult(null)
    }

    const handleSave = async () => {
        try {
            await fetch(`/api/save-progress?project_name=MyProject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
            })
            router.push(`/projects/${encodeURIComponent(projectName || '')}`)
        } catch (error) {
            console.error('Error saving progress:', error)
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>{result ? 'Analysis Results' : 'Project Details'}</CardTitle>
            </CardHeader>
            <CardContent>
                {!result ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="startLatitude">Start Latitude</Label>
                                <Input
                                    id="startLatitude"
                                    name="startLatitude"
                                    value={formData.startLatitude}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="startLongitude">Start Longitude</Label>
                                <Input
                                    id="startLongitude"
                                    name="startLongitude"
                                    value={formData.startLongitude}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="endLatitude">End Latitude</Label>
                                <Input
                                    id="endLatitude"
                                    name="endLatitude"
                                    value={formData.endLatitude}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="endLongitude">End Longitude</Label>
                                <Input
                                    id="endLongitude"
                                    name="endLongitude"
                                    value={formData.endLongitude}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="roadlength">Road Length</Label>
                                <Input
                                    id="roadlength"
                                    name="roadlength"
                                    value={formData.roadlength}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        {/* <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                className="mt-1"
                            />
                        </div> */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="images">Images</Label>
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                required
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Processing...' : 'Send to Model'}
                        </Button>
                    </form>
                ) : (
                    <ResultDisplay
                        result={result}
                        onRetry={handleRetry}
                        onSave={handleSave}
                        formData={formData}
                    />
                )}
            </CardContent>
        </Card>
    )
}

