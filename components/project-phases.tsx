import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

type ActivitySection = {
    title: string
    images: string[]
    description: string
    date: string
    location: string
}

type Activity = {
    name: string
    completion: number
    sections: ActivitySection[]
}

type Phase = {
    name: string
    startDate: string
    endDate: string
    progress: number
    activities: Activity[]
}

const phases: Phase[] = [
    {
        name: "Planning",
        startDate: "01/01/2023",
        endDate: "28/02/2023",
        progress: 100,
        activities: [
            {
                name: "Site Survey",
                completion: 100,
                sections: [
                    {
                        title: "Initial Survey",
                        images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
                        description: "Conducted initial site survey to assess terrain and existing structures.",
                        date: "05/01/2023",
                        location: "Project Site - North Section"
                    },
                    {
                        title: "Detailed Mapping",
                        images: ["/placeholder.svg?height=300&width=400"],
                        description: "Created detailed topographical maps of the entire project area.",
                        date: "10/01/2023",
                        location: "Project Site - Full Area"
                    }
                ]
            },
            {
                name: "Environmental Assessment",
                completion: 100,
                sections: [
                    {
                        title: "Flora and Fauna Study",
                        images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
                        description: "Catalogued local plant and animal species in the project area.",
                        date: "20/01/2023",
                        location: "Project Site and Surrounding Areas"
                    },
                    {
                        title: "Environmental Impact Report",
                        images: ["/placeholder.svg?height=300&width=400"],
                        description: "Compiled comprehensive environmental impact report based on studies.",
                        date: "30/01/2023",
                        location: "Environmental Assessment Office"
                    }
                ]
            }
        ]
    },
    // Add more phases as needed
]

function RadialProgressCard({ phase, onClick }: { phase: Phase; onClick: () => void }) {
    return (
        <Card className="cursor-pointer hover:bg-accent" onClick={onClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {phase.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center">
                    <svg className="h-24 w-24" viewBox="0 0 100 100">
                        <circle
                            className="text-muted-foreground/20"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                        <circle
                            className="text-primary"
                            strokeWidth="10"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * phase.progress) / 100}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                        <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-2xl font-bold"
                            fill="currentColor"
                        >
                            {phase.progress}%
                        </text>
                    </svg>
                    <div className="mt-2 text-xs text-muted-foreground">
                        {phase.startDate} - {phase.endDate}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function ActivityCard({ activity }: { activity: Activity }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="cursor-pointer hover:bg-accent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {activity.name}
                        </CardTitle>
                        <div className="text-sm font-medium">{activity.completion}%</div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <img src={activity.sections[0].images[0]} alt={activity.name} className="w-full h-48 rounded-md object-cover" />
                            <Progress value={activity.completion} className="w-full" />
                            <p className="text-xs text-muted-foreground">{activity.sections[0].date}</p>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{activity.name}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh] pr-4">
                    <div className="space-y-8">
                        {activity.sections.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="text-lg font-semibold">{section.title}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {section.images.map((image, imgIndex) => (
                                        <img key={imgIndex} src={image} alt={`${section.title} - Image ${imgIndex + 1}`} className="w-full h-48 rounded-md object-cover" />
                                    ))}
                                </div>
                                <p className="text-sm">{section.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Date:</span> {section.date}
                                    </div>
                                    <div>
                                        <span className="font-medium">Location:</span> {section.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

function PhaseDetails({ phase, onBack }: { phase: Phase; onBack: () => void }) {
    return (
        <div className="space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={onBack}>Phases</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{phase.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{phase.name}</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">{phase.progress}% Complete</span>
                    <svg className="h-12 w-12" viewBox="0 0 100 100">
                        <circle
                            className="text-muted-foreground/20"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                        <circle
                            className="text-primary"
                            strokeWidth="10"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * phase.progress) / 100}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                        />
                    </svg>
                </div>
            </div>
            <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {phase.activities.map((activity) => (
                        <ActivityCard key={activity.name} activity={activity} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default function ProjectPhases() {
    const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null)

    return (
        <div className="space-y-4">
            {selectedPhase ? (
                <PhaseDetails phase={selectedPhase} onBack={() => setSelectedPhase(null)} />
            ) : (
                <>
                    <h2 className="text-2xl font-bold">Project Phases</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {phases.map((phase) => (
                            <RadialProgressCard
                                key={phase.name}
                                phase={phase}
                                onClick={() => setSelectedPhase(phase)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

