"use client"

import { useState, useEffect } from "react"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { fetchAllTenders } from "@/utils/api"
import { Tender } from "@/interfaces/project"

const searchOptions = [
    "Tender Type",
    "Tender ID",
    "Tender Reference No",
    "Work Title",
    "Tender Category",
    "Product Category",
    "Organization",
    "Department",
    "Division",
    "Sub Division",
    "Form of Contract",
    "Pincode",
    "Payment Mode",
    "Value Criteria",
    "Date Criteria"
]

export default function TenderPage() {
    const [searchOption, setSearchOption] = useState("Tender ID")
    const [searchQuery, setSearchQuery] = useState("")
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllTenders();
                setTenders(data);
            } catch (error) {
                console.error("Error fetching tenders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    if (loading) return <p>Loading...</p>;
    // const filteredTenders = tenders.filter(tender => {
    //     const searchValue = tender[searchOption.toLowerCase().replace(/\s/g, '')] || ''
    //     return searchValue.toString().toLowerCase().includes(searchQuery.toLowerCase())
    // })

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b bg-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <h1 className="text-xl font-semibold">Tender Management System</h1>
                    {/* <div className="flex w-2/3 items-center gap-2">
                        <Link href="/search" className="w-full">
                            <Button className="w-full flex justify-between px-4">
                                <span>Search tenders...</span>
                                <Search className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div> */}
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Tenders Under Review</h2>
                    <div className="flex gap-2">
                        <Button variant="outline">Filter</Button>
                        <Button variant="outline">Sort</Button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {tenders.map((tender) => (
                        <Card key={tender.tenderID}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">
                                    {tender.title}
                                </CardTitle>
                                <Link href={`/tender-marketplace/${tender.tenderID}`} passHref>
                                    <Button variant="outline">View Details</Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender ID</p>
                                        <p>{tender.tenderID}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Due Date</p>
                                        <p>{tender.dueDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Value</p>
                                        <p>{tender.currentBid}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Category</p>
                                        <p>{tender.basicDetails.tenderCategory}</p>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-600">{tender.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}

const tenders = [
    {
        id: "53465714",
        name: "Urban Road Widening",
        dueDate: "05/09/2024",
        value: "₹8,00,000",
        category: "Rural Roadworks",
        description: "Mauris felis Rural Roadworks Dictum viverra",
        tendertype: "Open Tender",
        tenderreferenceno: "05/NIT/SHQ/SHQ/2024-25",
        worktitle: "Urban Road Widening Project",
        productcategory: "Construction",
        organization: "DG,BSF,MHA|JANO FTR(Bangalore),BSF,MHA",
        department: "Ministry of Road Transport and Highways",
        division: "Urban Development",
        subdivision: "Road Infrastructure",
        formofcontract: "Works",
        pincode: "560001",
        paymentmode: "Offline",
        valuecriteria: "Fixed Price",
        datecriteria: "Single Date",
        details: {
            tenderType: "Open Tender",
            tenderId: "2024_BSF_828382_1",
            referenceNumber: "05/NIT/SHQ/SHQ/2024-25",
            organization: "DG,BSF,MHA|JANO FTR(Bangalore),BSF,MHA",
            formOfContract: "Works",
            covers: "2",
            paymentMode: "Offline",
            withdrawalAllowed: "Yes",
            generalTechnicalEvaluationAllowed: "No",
            itemWiseTechnicalEvaluationAllowed: "No",
            isMultiCurrencyAllowedForBOQ: "No",
            isMultiCurrencyAllowedForFee: "No",
            allowTwoStagesBidding: "No",
            documents: [
                { name: "TenderNotice_1.pdf", size: "1018.72 KB" },
                { name: "BOQ_870470.xls", size: "327.50 KB" },
            ]
        }
    },
    {
        id: "98747310",
        name: "Bridge Approach",
        dueDate: "25/12/2024",
        value: "₹2,75,00,000",
        category: "Road Rehabilitation",
        description: "Mollis tincidunt Quam id Road Rehabilitation Pulvinar vulputate",
        tendertype: "Open Tender",
        tenderreferenceno: "06/NIT/SHQ/SHQ/2024-25",
        worktitle: "Bridge Approach Construction",
        productcategory: "Construction",
        organization: "DG,BSF,MHA|JANO FTR(Bangalore),BSF,MHA",
        department: "Ministry of Road Transport and Highways",
        division: "Rural Development",
        subdivision: "Bridge Construction",
        formofcontract: "Works",
        pincode: "560002",
        paymentmode: "Offline",
        valuecriteria: "Fixed Price",
        datecriteria: "Single Date",
        details: {
            tenderType: "Open Tender",
            tenderId: "2024_BSF_828383_1",
            referenceNumber: "06/NIT/SHQ/SHQ/2024-25",
            organization: "DG,BSF,MHA|JANO FTR(Bangalore),BSF,MHA",
            formOfContract: "Works",
            covers: "2",
            paymentMode: "Offline",
            withdrawalAllowed: "Yes",
            generalTechnicalEvaluationAllowed: "No",
            itemWiseTechnicalEvaluationAllowed: "No",
            isMultiCurrencyAllowedForBOQ: "No",
            isMultiCurrencyAllowedForFee: "No",
            allowTwoStagesBidding: "No",
            documents: [
                { name: "TenderNotice_2.pdf", size: "981.00 KB" },
                { name: "BOQ_870471.xls", size: "327.50 KB" },
            ]
        }
    },
    {
        id: "57576908",
        name: "City Road Rehabilitation",
        dueDate: "01/11/2024",
        value: "₹3,00,00,000",
        category: "Expressway projects",
        description: "Purus nunc Laoreet pellentesque At nec",
        tendertype: "Open Tender",
        tenderreferenceno: "07/NIT/SHQ/SHQ/2024-25",
        worktitle: "City Road Rehabilitation Project",
        productcategory: "Construction",
        organization: "DG,BSF,MHA|JANO FTR(Bangalore),BSF,MHA",
        department: "Ministry of Road Transport and Highways",
        division: "Urban Development",
        subdivision: "Road Infrastructure",
        formofcontract: "Works",
        pincode: "560003",
        paymentmode: "Offline",
        valuecriteria: "Fixed Price",
        datecriteria: "Single Date",
        details: {
            tenderType: "Open Tender",
            tenderId: "2024_BSF_828384_1",
            referenceNumber: "07/NIT/SHQ/SHQ/2024-25",
            organization: "DG,BSF,MHA|JANO FTR(Bangalore),BSF,MHA",
            formOfContract: "Works",
            covers: "2",
            paymentMode: "Offline",
            withdrawalAllowed: "Yes",
            generalTechnicalEvaluationAllowed: "No",
            itemWiseTechnicalEvaluationAllowed: "No",
            isMultiCurrencyAllowedForBOQ: "No",
            isMultiCurrencyAllowedForFee: "No",
            allowTwoStagesBidding: "No",
            documents: [
                { name: "TenderNotice_3.pdf", size: "1022.50 KB" },
                { name: "BOQ_870472.xls", size: "328.50 KB" },
            ]
        }
    }
]

