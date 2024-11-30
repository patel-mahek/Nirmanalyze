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

interface Project {
    id: number
    imageUrl: string
    projectName: string
    location: string
    constructionType: string
    startDate: string
    completionPercentage: number
}

const data = [
    {
        "id": 1,
        "imageUrl": "/placeholder.svg?height=200&width=300",
        "projectName": "Skyline Tower",
        "location": "New York City, NY",
        "constructionType": "Commercial",
        "startDate": "2023-06-15",
        "completionPercentage": 75
    },
    {
        "id": 2,
        "imageUrl": "/placeholder.svg?height=200&width=300",
        "projectName": "Green Valley Residences",
        "location": "Austin, TX",
        "constructionType": "Residential",
        "startDate": "2023-04-01",
        "completionPercentage": 40
    },
    {
        "id": 3,
        "imageUrl": "/placeholder.svg?height=200&width=300",
        "projectName": "Riverside Mall",
        "location": "Chicago, IL",
        "constructionType": "Commercial",
        "startDate": "2023-07-30",
        "completionPercentage": 20
    },
    {
        "id": 4,
        "imageUrl": "/placeholder.svg?height=200&width=300",
        "projectName": "Harbor Bridge",
        "location": "Seattle, WA",
        "constructionType": "Infrastructure",
        "startDate": "2023-03-10",
        "completionPercentage": 60
    },
    {
        "id": 5,
        "imageUrl": "/placeholder.svg?height=200&width=300",
        "projectName": "Skyline Tower",
        "location": "New York City, NY",
        "constructionType": "Commercial",
        "startDate": "2023-06-15",
        "completionPercentage": 75
    },
    {
        "id": 6,
        "imageUrl": "/placeholder.svg?height=200&width=300",
        "projectName": "Green Valley Residences",
        "location": "Austin, TX",
        "constructionType": "Residential",
        "startDate": "2023-04-01",
        "completionPercentage": 40
    },
]

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(data)
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
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-8">Our Projects</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    imageUrl={project.imageUrl}
                                    projectName={project.projectName}
                                    location={project.location}
                                    constructionType={project.constructionType}
                                    startDate={project.startDate}
                                    completionPercentage={project.completionPercentage}
                                />
                            ))}
                        </div>
                    </div>
                    {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
