"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useProject } from '@/app/ProjectContext'
export default function EditDetails() {
    const router = useRouter()
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const projectName = searchParams.get('projectName')
    const pathParts = window.location.pathname.split("/");
    // console.log(pathParts)
    // const projectName = decodeURIComponent(pathParts[pathParts.length - 1]);
    const { localProject, setLocalProject } = useProject()
    const oldDetails = localProject.details
    const [details, setDetails] = useState(localProject.details)

    //   useEffect(() => {
    //     // Fetch project details here
    //     // For now, we'll use dummy data
    //     setDetails(localProject.details)
    //   }, [projectName])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDetails(prev => ({ ...prev, [name]: value }))
    }

    const handleReset = () => {
        setDetails(oldDetails)
    }

    const handleSave = async () => {
        try {
            // Send details to FastAPI server
            const response = await fetch(`${process.env.
                NEXT_PUBLIC_FAST_API_URL}/project/details?project_name=${encodeURIComponent(projectName || '')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            })

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Project details updated successfully",
                })
                router.push(`/projects/${projectName}`)
            } else {
                throw new Error('Failed to update project details')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update project details",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        {Object.entries(details).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={key} className="text-right">
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                </Label>
                                <Input
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="secondary" onClick={() => router.push(`/projects/${projectName}`)}>Cancel</Button>
                            <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                            <Button type="button" onClick={handleSave}>Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

