"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { fetchAllTenders } from "@/utils/api"
import { Tender } from "@/interfaces/project"
import { TenderSearch } from "./TenderSearch"

export default function TenderPage() {
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [loading, setLoading] = useState(true)
    const [filteredTenders, setFilteredTenders] = useState<Tender[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllTenders();
                setTenders(data);
                setFilteredTenders(data);
            } catch (error) {
                console.error("Error fetching tenders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleSearch = (filters: any) => {
        let filtered = [...tenders]

        // Apply filters
        if (filters.tenderType) {
            filtered = filtered.filter(tender =>
                tender.basicDetails.tenderType.toLowerCase() === filters.tenderType.toLowerCase()
            )
        }

        if (filters.tenderID) {
            filtered = filtered.filter(tender =>
                tender.tenderID.toLowerCase().includes(filters.tenderID.toLowerCase())
            )
        }

        if (filters.tenderReferenceNo) {
            filtered = filtered.filter(tender =>
                tender.basicDetails.tenderReferenceNumber.toLowerCase().includes(filters.tenderReferenceNo.toLowerCase())
            )
        }

        if (filters.workTitle) {
            filtered = filtered.filter(tender =>
                tender.WorkItemDetails.Title.toLowerCase().includes(filters.workTitle.toLowerCase())
            )
        }

        if (filters.tenderCategory) {
            filtered = filtered.filter(tender =>
                tender.basicDetails.tenderCategory.toLowerCase() === filters.tenderCategory.toLowerCase()
            )
        }

        if (filters.productCategory) {
            filtered = filtered.filter(tender =>
                tender.WorkItemDetails.ProductCategory.toLowerCase() === filters.productCategory.toLowerCase()
            )
        }

        if (filters.organization) {
            filtered = filtered.filter(tender =>
                tender.basicDetails.organizationChain.toLowerCase().includes(filters.organization.toLowerCase())
            )
        }

        if (filters.pincode) {
            filtered = filtered.filter(tender =>
                tender.WorkItemDetails.Pincode.toString() === filters.pincode
            )
        }

        if (filters.paymentMode) {
            filtered = filtered.filter(tender =>
                tender.basicDetails.paymentMode.toLowerCase() === filters.paymentMode.toLowerCase()
            )
        }

        if (filters.dateCriteria) {
            const searchDate = new Date(filters.dateCriteria)
            filtered = filtered.filter(tender => {
                const tenderDate = new Date(tender.dueDate)
                return tenderDate >= searchDate
            })
        }

        // Apply checkbox filters
        if (filters.twoStageBidding) {
            filtered = filtered.filter(tender =>
                tender.basicDetails.allow_two_stage_bidding === "Yes"
            )
        }

        if (filters.ndaTenders) {
            filtered = filtered.filter(tender =>
                tender.WorkItemDetails.ShouldAllowNDATender === "Yes"
            )
        }

        if (filters.preferentialBidding) {
            filtered = filtered.filter(tender =>
                tender.WorkItemDetails.AllowPreferentialBidder === "Yes"
            )
        }

        setFilteredTenders(filtered)
    }




    if (loading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b bg-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <h1 className="text-xl font-semibold">Tender Marketplace</h1>
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
                {/* <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Tenders Under Review</h2>
                    <div className="flex gap-2">
                        <Button variant="outline">Filter</Button>
                        <Button variant="outline">Sort</Button>
                    </div> 
                </div> */}
                <TenderSearch onSearch={handleSearch} />
                <div className="grid gap-4">
                    {filteredTenders.map((tender) => (
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

