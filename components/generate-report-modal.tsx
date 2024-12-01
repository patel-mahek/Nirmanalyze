import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function GenerateReportModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [reportType, setReportType] = useState('')

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        // Here you would typically send a request to generate the report
        console.log('Generating report:', reportType)
        // Simulating report generation
        setTimeout(() => {
            const pdfUrl = 'https://example.com/generated-report.pdf'
            window.open(pdfUrl, '_blank')
            onOpenChange(false)
        }, 2000)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Generate Report</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reportType" className="text-right">
                                Report Type
                            </Label>
                            <Select
                                value={reportType}
                                onValueChange={setReportType}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="progress">Progress Report</SelectItem>
                                    <SelectItem value="financial">Financial Report</SelectItem>
                                    <SelectItem value="quality">Quality Assurance Report</SelectItem>
                                    <SelectItem value="safety">Safety Report</SelectItem>
                                    <SelectItem value="environmental">Environmental Impact Report</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Generate Report</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

