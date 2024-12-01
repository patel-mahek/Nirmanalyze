import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { FileText } from 'lucide-react'

const reportsData = [
    { id: 1, name: 'Monthly Progress Report', description: 'Overview of project progress for the month', generatedBy: 'John Doe', link: '#', date: '2023-11-01' },
    { id: 2, name: 'Budget Analysis', description: 'Detailed breakdown of project expenses', generatedBy: 'Jane Smith', link: '#', date: '2023-10-15' },
    { id: 3, name: 'Risk Assessment', description: 'Evaluation of potential project risks', generatedBy: 'Mike Johnson', link: '#', date: '2023-10-01' },
    { id: 4, name: 'Stakeholder Update', description: 'Summary for project stakeholders', generatedBy: 'Sarah Brown', link: '#', date: '2023-09-15' },
    { id: 5, name: 'Quality Assurance Report', description: 'Results of recent quality checks', generatedBy: 'Tom Wilson', link: '#', date: '2023-09-01' },
    // Add more report data as needed
]

export default function ProjectReports() {
    const [currentPage, setCurrentPage] = useState(1)
    const reportsPerPage = 5
    const totalPages = Math.ceil(reportsData.length / reportsPerPage)

    const indexOfLastReport = currentPage * reportsPerPage
    const indexOfFirstReport = indexOfLastReport - reportsPerPage
    const currentReports = reportsData.slice(indexOfFirstReport, indexOfLastReport)

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name of Report</TableHead>
                        <TableHead>Short Description</TableHead>
                        <TableHead>Generated by</TableHead>
                        <TableHead>View PDF</TableHead>
                        <TableHead>Date Generated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentReports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>{report.name}</TableCell>
                            <TableCell>{report.description}</TableCell>
                            <TableCell>{report.generatedBy}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <a href={report.link} target="_blank" rel="noopener noreferrer">
                                        <FileText className="h-4 w-4" />
                                    </a>
                                </Button>
                            </TableCell>
                            <TableCell>{report.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                onClick={() => setCurrentPage(index + 1)}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

