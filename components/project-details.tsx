import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/router'
import { ProjectDetailsType } from "@/interfaces/project"
import { Button } from "./ui/button"
import Link from "next/link"
export default function ProjectDetails({ details, name }: { details: ProjectDetailsType, name: string }) {
    // const details = {
    //     "Name of Project": "NorthConnex Motorway",
    //     Location: "Western express highway",
    //     "Expressway...": "Flyover",
    //     "Builder Name": "Neelkanth Group of Builders",
    //     "Road Stretch": "Ghatkopar-Dadar",
    //     "Start Date": "07/03/2023",
    //     "Estimated End Date": "09/08/2025",
    //     "Tender ID No.": "123456",
    //     "Total Length": "100 km",
    //     Landmark: "Near Laxman Yadapav",
    // }
    // const router = useRouter()
    // const handleEditDetails = () => {
    //     router.push(`/edit-details?projectName=${encodeURIComponent(name)}`)
    // }

    return (
        // <Card>
        //     <CardHeader>
        //         <CardTitle>Project Details</CardTitle>
        //         <CardDescription>
        //             View and manage project information and specifications
        //         </CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             {Object.entries(details).map(([key, value]) => (
        //                 <div key={key} className="space-y-1">
        //                     <p className="text-sm font-medium text-muted-foreground">{key}</p>
        //                     <p className="text-sm">{value}</p>
        //                 </div>
        //             ))}
        //         </div>
        //     </CardContent>
        // </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>
                        View and manage project information and specifications
                    </CardDescription>
                </div>
                <Link href={`/projects/edit-details?projectName=${name}`}>
                    <Button>Edit Details</Button>
                </Link>

            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(details).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">{key}</p>
                            <p className="text-sm">{value}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

