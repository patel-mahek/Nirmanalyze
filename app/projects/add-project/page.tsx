'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ProjectData {
    nameOfProject: string
    startDate: string
    location: string
    estimatedEndDate: string
    projectId: string
    builderName: string
    totalLength: number
    roadStretch: string
    teamStrength: number
    startLatitude: number
    startLongitude: number
    endLatitude: number
    endLongitude: number
    type: string
    coverImage: File | null
}

export default function AddProjectPage() {
    const [projectData, setProjectData] = useState<ProjectData>({
        nameOfProject: '',
        startDate: '',
        location: '',
        estimatedEndDate: '',
        projectId: '',
        builderName: '',
        totalLength: 0,
        roadStretch: '',
        teamStrength: 0,
        startLatitude: 0,
        startLongitude: 0,
        endLatitude: 0,
        endLongitude: 0,
        type: '',
        coverImage: null
    })
    const { toast } = useToast()
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setProjectData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            console.log("Selected File:", file); // Log the file object
            setProjectData(prev => ({
                ...prev,
                coverImage: file,
            }));
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        Object.entries(projectData).forEach(([key, value]) => {
            if (key === 'coverImage' && value instanceof File) {
                formData.append('image', value)
                console.log(value)
            } else {
                formData.append(key, String(value))
            }
        })

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/projects/add-project', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Project added successfully!",
                })
                router.push('/projects') // Redirect to the projects list page
            } else {
                throw new Error('Failed to add project')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add project. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="nameOfProject">Project Name</Label>
                        <Input
                            id="nameOfProject"
                            name="nameOfProject"
                            value={projectData.nameOfProject}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={projectData.startDate}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            value={projectData.location}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="estimatedEndDate">Estimated End Date</Label>
                        <Input
                            id="estimatedEndDate"
                            name="estimatedEndDate"
                            type="date"
                            value={projectData.estimatedEndDate}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="projectId">Project ID</Label>
                        <Input
                            id="projectId"
                            name="projectId"
                            value={projectData.projectId}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="builderName">Builder Name</Label>
                        <Input
                            id="builderName"
                            name="builderName"
                            value={projectData.builderName}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="totalLength">Total Length</Label>
                        <Input
                            id="totalLength"
                            name="totalLength"
                            type="number"
                            value={projectData.totalLength}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="roadStretch">Road Stretch</Label>
                        <Input
                            id="roadStretch"
                            name="roadStretch"
                            value={projectData.roadStretch}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="teamStrength">Team Strength</Label>
                        <Input
                            id="teamStrength"
                            name="teamStrength"
                            type="number"
                            value={projectData.teamStrength}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="startLatitude">Start Latitude</Label>
                        <Input
                            id="startLatitude"
                            name="startLatitude"
                            type="number"
                            value={projectData.startLatitude}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="startLongitude">Start Longitude</Label>
                        <Input
                            id="startLongitude"
                            name="startLongitude"
                            type="number"
                            value={projectData.startLongitude}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="endLatitude">End Latitude</Label>
                        <Input
                            id="endLatitude"
                            name="endLatitude"
                            type="number"
                            value={projectData.endLatitude}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="endLongitude">End Longitude</Label>
                        <Input
                            id="endLongitude"
                            name="endLongitude"
                            type="number"
                            value={projectData.endLongitude}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            name="type"
                            value={projectData.type}
                            onChange={handleInputChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="coverImage">Cover Image</Label>
                        <Input
                            id="coverImage"
                            name="coverImage"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => router.push('/')}>Cancel</Button>
                    <Button type="submit">Save Project</Button>
                </div>
            </form>
        </div>
    )
}

