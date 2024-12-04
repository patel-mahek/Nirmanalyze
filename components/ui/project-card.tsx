import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface ProjectCardProps {
    imageUrl: string
    projectName: string
    location: string
    constructionType: string
    startDate: string
    completionPercentage: number
}

export default function ProjectCard({
    imageUrl,
    projectName,
    location,
    constructionType,
    startDate,
    completionPercentage,
}: ProjectCardProps) {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image
                        src={imageUrl}
                        alt={projectName}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{projectName}</h3>
                <p className="text-sm text-muted-foreground">{location}</p>
                <div className="mt-2 flex items-center justify-between">
                    <Badge variant="secondary">{constructionType}</Badge>
                    <span className="text-sm text-muted-foreground">{startDate}</span>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Completion</span>
                        <span className="text-sm font-medium">{completionPercentage}%</span>
                    </div>
                    <Progress value={completionPercentage} className="mt-2" />
                </div>
                <Link href={`/projects/${encodeURIComponent(projectName)}`}>
                    <Button className="w-full mt-4"> View Project</Button>
                </Link>

            </CardContent>
            {/* <CardFooter>
                
            </CardFooter> */}
        </Card>
    )
}

