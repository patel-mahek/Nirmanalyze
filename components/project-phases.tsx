import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ProjectProgress, Phase, Activity, SubActivity, Image } from '@/interfaces/project'

function RadialProgressCard({ phase, onClick }: { phase: Phase; onClick: () => void }) {
    return (
        <Card className="cursor-pointer hover:bg-accent" onClick={onClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {phase.phaseName}
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
                            strokeDashoffset={251.2 - (251.2 * phase.status) / 100}
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
                            {phase.status}%
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
                            {activity.activityName}
                        </CardTitle>
                        <div className="text-sm font-medium">{activity.status}%</div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <img src={activity.subActivities[0].images[0]?.url} alt={activity.activityName} className="w-full h-48 rounded-md object-cover" />
                            <Progress value={activity.status} className="w-full" />
                            <p className="text-xs text-muted-foreground">{activity.subActivities.at(-1)?.date}</p>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{activity.activityName}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh] pr-4">
                    <div className="space-y-8">
                        {activity.subActivities.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="text-lg font-semibold">Dated - {section.date}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {section.images.map((image, imgIndex) => (
                                        <img key={imgIndex} src={image.url} alt={`${section.date} - Image ${imgIndex + 1}`} className="w-full h-48 rounded-md object-cover" />
                                    ))}
                                </div>
                                <p className="text-sm">{section.subactivity_description}</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    {/* <div>
                                        <span className="font-medium">Subactivity Status:</span> {section.subActivityStatus}% Complete
                                    </div> */}
                                    <div>
                                        <span className="font-medium">Start Location:</span> {section.startLatitude}, {section.startLongitude}
                                    </div>
                                    <div>
                                        <span className="font-medium">End Location:</span> {section.endLatitude}, {section.endLongitude}
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
                        <BreadcrumbPage>{phase.phaseName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{phase.phaseName}</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">{phase.status}% Complete</span>
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
                            strokeDashoffset={251.2 - (251.2 * phase.status) / 100}
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
                        <ActivityCard key={activity.activityName} activity={activity} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default function ProjectPhases({ progress }: { progress: ProjectProgress }) {
    const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null)
    const phases = progress.phases
    const progressPercentage = progress.percentage

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
                                key={phase.phaseName}
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

