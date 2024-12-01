"use client";

import { useState } from 'react'
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
import ProjectInsights from "@/components/project-insights"
import ProjectReports from "@/components/project-reports"
import ProjectTeam from "@/components/project-team"
import EditDetailsModal from "@/components/edit-details-modal"
import AddImageModal from "@/components/add-image-modal"
import GenerateReportModal from "@/components/generate-report-modal"
import Link from 'next/link';

export default function ProjectPage() {
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [addImageModalOpen, setAddImageModalOpen] = useState(false)
    const [generateReportModalOpen, setGenerateReportModalOpen] = useState(false)

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Link href="/projects"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <h1 className="text-2xl font-bold">NorthConnex Motorway</h1>
                        <Badge>Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Ghatkopar</p>
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
                    <ProjectDetails />
                </TabsContent>
                <TabsContent value="phases">
                    <ProjectPhases />
                </TabsContent>
                <TabsContent value="insights">
                    <ProjectInsights />
                </TabsContent>
                <TabsContent value="reports">
                    <ProjectReports />
                </TabsContent>
                <TabsContent value="team">
                    <ProjectTeam />
                </TabsContent>
            </Tabs>

            <EditDetailsModal open={editModalOpen} onOpenChange={setEditModalOpen} />
            <AddImageModal open={addImageModalOpen} onOpenChange={setAddImageModalOpen} />
            <GenerateReportModal open={generateReportModalOpen} onOpenChange={setGenerateReportModalOpen} />
        </div>
    )
}

