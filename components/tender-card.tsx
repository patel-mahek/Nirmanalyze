'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TenderCardProps {
    title: string
    // tenderId: string
    dueDate: string
    // value: string
    // category: string
    description: string
    // location: string
    currentBidPrice: string
    // publishedDate: string
    bidStartDate: string
    bidEndDate: string
    imageUrl?: string
    className?: string
}

const TenderCard = ({
    title,
    // tenderId,
    dueDate,
    // value,
    // category,
    description,
    // location,
    currentBidPrice,
    // publishedDate,
    bidStartDate,
    bidEndDate,
    imageUrl,
    className
}: TenderCardProps) => {
    return (
        <Card className={cn("sticky top-0 z-50 bg-background", className)}>
            <div className="flex gap-6 p-6">
                <div className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">{title}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                        </div>
                        <div className="flex gap-2">
                            {/* <Button variant="outline" onClick={() => window.location.href = `/tenders/${tenderId}`}>
                                View Details
                            </Button> */}
                            <Button>
                                Bid Now
                            </Button>
                        </div>
                    </div>

                    {/* <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Tender ID</p>
                            <p className="font-medium">{tenderId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Due Date</p>
                            <p className="font-medium">{dueDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Value</p>
                            <p className="font-medium">{value}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Category</p>
                            <p className="font-medium">{category}</p>
                        </div>
                    </div> */}

                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Due Date</p>
                            <p className="font-medium">{dueDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Current Bid</p>
                            <p className="font-medium">{currentBidPrice}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Bid Start</p>
                            <p className="font-medium">{bidStartDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Bid End</p>
                            <p className="font-medium">{bidEndDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default TenderCard;

