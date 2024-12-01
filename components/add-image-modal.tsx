import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddImageModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [imageDetails, setImageDetails] = useState({
        phase: '',
        activity: '',
        date: '',
        roadLength: '',
        startLatitude: '',
        startLongitude: '',
        endLatitude: '',
        endLongitude: '',
    })

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setImageDetails(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setImageDetails(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        // Here you would typically send the image details to your backend
        console.log('Image details:', imageDetails)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Image</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phase" className="text-right">
                                Phase
                            </Label>
                            <Select
                                value={imageDetails.phase}
                                onValueChange={(value) => handleSelectChange('phase', value)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select phase" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="planning">Planning</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="construction">Construction</SelectItem>
                                    <SelectItem value="testing">Testing</SelectItem>
                                    <SelectItem value="handover">Handover</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="activity" className="text-right">
                                Activity
                            </Label>
                            <Select
                                value={imageDetails.activity}
                                onValueChange={(value) => handleSelectChange('activity', value)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select activity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="survey">Survey</SelectItem>
                                    <SelectItem value="excavation">Excavation</SelectItem>
                                    <SelectItem value="foundation">Foundation</SelectItem>
                                    <SelectItem value="construction">Construction</SelectItem>
                                    <SelectItem value="finishing">Finishing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="images" className="text-right">
                                Images
                            </Label>
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={imageDetails.date}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="roadLength" className="text-right">
                                Road Length (km)
                            </Label>
                            <Input
                                id="roadLength"
                                name="roadLength"
                                type="number"
                                value={imageDetails.roadLength}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startLatitude" className="text-right">
                                Start Latitude
                            </Label>
                            <Input
                                id="startLatitude"
                                name="startLatitude"
                                type="number"
                                value={imageDetails.startLatitude}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startLongitude" className="text-right">
                                Start Longitude
                            </Label>
                            <Input
                                id="startLongitude"
                                name="startLongitude"
                                type="number"
                                value={imageDetails.startLongitude}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endLatitude" className="text-right">
                                End Latitude
                            </Label>
                            <Input
                                id="endLatitude"
                                name="endLatitude"
                                type="number"
                                value={imageDetails.endLatitude}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endLongitude" className="text-right">
                                End Longitude
                            </Label>
                            <Input
                                id="endLongitude"
                                name="endLongitude"
                                type="number"
                                value={imageDetails.endLongitude}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Image</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

