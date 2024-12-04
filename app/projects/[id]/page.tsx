"use client";

import { useState, useEffect } from 'react'
// import { useRouter } from "next/router";
import { ArrowLeft } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProjectDetails from "@/components/project-details"
import ProjectPhases from "@/components/project-phases"
import ProjectInsights from "@/components/project-insights.jsx"
import ProjectReports from "@/components/project-reports"
import ProjectTeam from "@/components/project-team"
import EditDetailsModal from "@/components/edit-details-modal"
import AddImageModal from "@/components/add-image-modal"
import GenerateReportModal from "@/components/generate-report-modal"
import Link from 'next/link';
import { notFound } from "next/navigation";
import { Project } from "../../../interfaces/project";

const ProjectPage = () => {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    // const router = useRouter();
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [addImageModalOpen, setAddImageModalOpen] = useState(false)
    const [generateReportModalOpen, setGenerateReportModalOpen] = useState(false)

    // const { id } = router.query; // Get the project name (id) from the URL
    useEffect(() => {
        // Extract the project name from the URL
        const pathParts = window.location.pathname.split("/");
        const projectName = decodeURIComponent(pathParts[pathParts.length - 1]);

        async function fetchProjectByName(name: string) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/project?project_name=${name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch project");
                }
                const data: Project = await response.json();
                console.log(data)
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
                setProject(null);
            } finally {
                setLoading(false);
            }
        }

        if (projectName) {
            fetchProjectByName(projectName);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!project) return <p>Project not found.</p>;


    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Link href="/projects"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <h1 className="text-2xl font-bold">{project.details.nameOfProject}</h1>
                        <Badge>Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.details.location}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">More Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => setEditModalOpen(true)}>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setAddImageModalOpen(true)}>Add Image</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setGenerateReportModalOpen(true)}>Generate Report</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Navigation Tabs */}
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="phases">Phases</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <ProjectDetails details={project.details} />
                </TabsContent>
                <TabsContent value="phases">
                    <ProjectPhases progress={project.progress} />
                </TabsContent>
                <TabsContent value="insights">
                    <ProjectInsights />
                </TabsContent>
                <TabsContent value="reports">
                    <ProjectReports />
                </TabsContent>
                <TabsContent value="team">
                    <ProjectTeam teamMembers={project.team} />
                </TabsContent>
            </Tabs>

            <EditDetailsModal open={editModalOpen} onOpenChange={setEditModalOpen} />
            <AddImageModal open={addImageModalOpen} onOpenChange={setAddImageModalOpen} />
            <GenerateReportModal open={generateReportModalOpen} onOpenChange={setGenerateReportModalOpen} />
        </div>
    )
}

export default ProjectPage;