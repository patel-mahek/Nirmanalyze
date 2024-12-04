"use client";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState } from 'react'
import ProjectCard from '@/components/ui/project-card'
import { fetchAllProjects } from "@/utils/api";
import { Project } from "@/interfaces/project";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// const data = [
//     {
//         "id": 1,
//         "imageUrl": "/placeholder.svg?height=200&width=300",
//         "projectName": "Skyline Tower",
//         "location": "New York City, NY",
//         "constructionType": "Commercial",
//         "startDate": "2023-06-15",
//         "completionPercentage": 75
//     },
//     {
//         "id": 2,
//         "imageUrl": "/placeholder.svg?height=200&width=300",
//         "projectName": "Green Valley Residences",
//         "location": "Austin, TX",
//         "constructionType": "Residential",
//         "startDate": "2023-04-01",
//         "completionPercentage": 40
//     },
//     {
//         "id": 3,
//         "imageUrl": "/placeholder.svg?height=200&width=300",
//         "projectName": "Riverside Mall",
//         "location": "Chicago, IL",
//         "constructionType": "Commercial",
//         "startDate": "2023-07-30",
//         "completionPercentage": 20
//     },
//     {
//         "id": 4,
//         "imageUrl": "/placeholder.svg?height=200&width=300",
//         "projectName": "Harbor Bridge",
//         "location": "Seattle, WA",
//         "constructionType": "Infrastructure",
//         "startDate": "2023-03-10",
//         "completionPercentage": 60
//     },
//     {
//         "id": 5,
//         "imageUrl": "/placeholder.svg?height=200&width=300",
//         "projectName": "Skyline Tower",
//         "location": "New York City, NY",
//         "constructionType": "Commercial",
//         "startDate": "2023-06-15",
//         "completionPercentage": 75
//     },
//     {
//         "id": 6,
//         "imageUrl": "/placeholder.svg?height=200&width=300",
//         "projectName": "Green Valley Residences",
//         "location": "Austin, TX",
//         "constructionType": "Residential",
//         "startDate": "2023-04-01",
//         "completionPercentage": 40
//     },
// ]

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    if (loading) return <p>Loading...</p>;
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Projects
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-8">Our Projects</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.projectId}
                                    imageUrl={project.main_image}
                                    projectName={project.projectName}
                                    location={project.details.location}
                                    constructionType={project.type}
                                    startDate={project.details.startDate}
                                    completionPercentage={project.progress.percentage}
                                />
                            ))}
                        </div>
                    </div> */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Our Projects</h1>
                        <Link href="/projects/add-project">
                            <Button>Add Project</Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.projectId}
                                imageUrl={project.main_image}
                                projectName={project.projectName}
                                location={project.details.location}
                                constructionType={project.type}
                                startDate={project.details.startDate}
                                completionPercentage={project.progress.percentage}
                            />
                        ))}
                    </div>
                </div>
                {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                {/* </div> */}
            </SidebarInset>
        </SidebarProvider >
    )
}

export default Projects;