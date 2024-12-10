"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FileText, Calendar, IndianRupee, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import TenderCard from "@/components/tender-card"
import { Tender } from "@/interfaces/project"

export default function TenderDetailsPage({ params }: { params: { id: string } }) {
    // const tender = {
    //     "title": "Urban Road Widening",
    //     "description": "Mauris felis Rural Roadworks Dictum viverra.",
    //     "dueDate": "2021-12-31",
    //     "currentBid": "7,92,300",
    //     "bidStartDate": "2021-12-01",
    //     "bidEndDate": "2021-12-15",
    //     "tenderID": "2024_BSF_828382_1",
    //     "imageUrl": "https://res.cloudinary.com/dgccztjql/image/upload/v1733764377/images_1_kqm7cl.jpg",
    //     "basicDetails": {
    //         "tenderType": "Open Tender",
    //         "tenderID": "2024_BSF_828382_1",
    //         "tenderReferenceNumber": "03/NIT/SHQ-SHG/2024-25",
    //         "organizationChain": "DG,BSF,MHA||ANO FTR(Bangalore),BSF,MHA",
    //         "tenderCategory": "Services",
    //         "withdrawalAllowed": "Yes",
    //         "formOfContract": "Works",
    //         "cover_no": 2,
    //         "general_technical_evaluation_allowed": "No",
    //         "itemwise_technical_evaluation_allowed": "No",
    //         "paymentMode": "Offline",
    //         "is_Multicurrency_BOQ": "No",
    //         "is_Multicurrecy_fee": "No",
    //         "allow_two_stage_bidding": "No"
    //     },
    //     "paymentInstruments": [
    //         {
    //             "paymentMode": "Offline",
    //             "instrumentType": "Bankers Cheque"
    //         },
    //         {
    //             "paymentMode": "Offline",
    //             "instrumentType": "FDR"
    //         },
    //         {
    //             "paymentMode": "Offline",
    //             "instrumentType": "Bank Guarantee"
    //         },
    //         {
    //             "paymentMode": "Offline",
    //             "instrumentType": "Demand Draft"
    //         }
    //     ],
    //     "tenderDocuments": [
    //         {
    //             "documentName": "TenderNotice_1.pdf",
    //             "documentSize": "1018.72 KB"
    //         },
    //         {
    //             "documentName": "BOQ_870470.xls",
    //             "documentSize": "327.50 KB"
    //         },
    //         {
    //             "documentName": "BOQ_870471.xls",
    //             "documentSize": "9172.50 KB"
    //         },
    //         {
    //             "documentName": "TenderNotice_2.pdf",
    //             "documentSize": "881.00 KB"
    //         }
    //     ],
    //     "WorkItemDetails": {
    //         "Title": "R/M cement concrete road near RCC Type-II, Type-III",
    //         "WorkDescription": "R/M cement concrete road near RCC Type-II, Type-III Quarters at BSF Campus Mawpat, SHQ BSF Shillong",
    //         "TenderValue": 431700,
    //         "ProductCategory": "Civil Works",
    //         "NDA_PreQualification": "As per NIT",
    //         "ContractType": "Tender",
    //         "BidValidity": 75,
    //         "IndependentExternalMonitorRemarks": "NA",
    //         "SubCategory": "NA",
    //         "PeriodOfWorkDays": 30,
    //         "Location": "SHQ BSF Shillong",
    //         "Pincode": 793012,
    //         "PreBidMeetingPlace": "NA",
    //         "PreBidMeetingAddress": "NA",
    //         "PreBidMeetingDate": "NA",
    //         "BidOpeningPlace": "SHQ BSF Shillong",
    //         "ShouldAllowNDATender": "No",
    //         "AllowPreferentialBidder": "No"
    //     },
    //     "TenderFeeDetails": {
    //         "TenderFee": 0.0,
    //         "FeePayableTo": "Nil",
    //         "TenderFeeExemptionAllowed": "No"
    //     },
    //     "EMDFeeDetails": {
    //         "EMDAmount": 8643,
    //         "EMDFeeType": "Percentage",
    //         "EMDPercentage": 2.0,
    //         "EMDExemptionAllowed": "Yes",
    //         "EMDPayableTo": "DIG SHQ BSF Shillong",
    //         "EMDPayableAt": "Shillong"
    //     },
    //     "CriticalDates": {
    //         "PublishedDate": "28-Sep-2024 06:10 PM",
    //         "DocumentDownloadSaleStartDate": "28-Sep-2024 06:10 PM",
    //         "DocumentDownloadSaleEndDate": "08-Oct-2024 12:00 PM",
    //         "BidSubmissionStartDate": "28-Sep-2024 06:10 PM",
    //         "BidSubmissionEndDate": "28-Sep-2024 06:10 PM",
    //         "BidOpeningDate": "09-Oct-2024 12:00 PM",
    //         "ClarificationStartDate": "NA",
    //         "ClarificationEndDate": "08-Oct-2024 12:00 PM"
    //     },
    //     "coversInformation": [
    //         {
    //             "coverName": "Receipt of EMD submitted in Office of the AC(Works)/AE, SHQ BSF Shillong",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "Valid Enlistment/Registration Certificate of appropriate category as per NIT",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "GST Registration Certificate",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "PAN Card duly linked with Aadhaar Card and acknowledgement of up to date IT return",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "Integrity Pact (NIT Page no. 20 to 24) signed by the bidder in the presence of a witness",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "Self-Declaration for not blacklisted on Stamp Paper of Rs. 100.00 duly notarized as per NIT",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "Bidder will upload an undertaking regarding site awareness where the work being executed",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "Completion certificate issued by Officer of the rank of EE or the equivalent as per NIT",
    //             "coverType": "Fee/PreQual/Technical"
    //         },
    //         {
    //             "coverName": "Price Bid",
    //             "coverType": "Finance"
    //         }
    //     ],
    //     "tenderInvitingAuthority": {
    //         "name": "AC(Works)/AE",
    //         "address": "SHQ BSF Shillong"
    //     }
    // }


    const [tender, setTender] = useState<Tender | null>(null);
    const [loading, setLoading] = useState(true);
    const [tender_Name, setTenderName] = useState("")
    // const { id } = router.query; // Get the tender name (id) from the URL
    useEffect(() => {
        // Extract the tender name from the URL
        const pathParts = window.location.pathname.split("/");
        const tenderID = decodeURIComponent(pathParts[pathParts.length - 1]);
        setTenderName(tenderID)
        console.log("tenderID", tender_Name)
        async function fetchtenderByName(tenderId: string) {
            try {
                const response = await fetch(`${process.env.
                    NEXT_PUBLIC_FAST_API_URL}/tender?tenderID=${tenderId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch tender");
                }
                const data: Tender = await response.json();
                console.log(data)
                setTender(data);
            } catch (error) {
                console.error("Error fetching tender:", error);
                setTender(null);
            } finally {
                setLoading(false);
            }
        }

        if (tenderID) {
            fetchtenderByName(tenderID);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!tender) return <p>tender not found.</p>;



    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/tender-marketplace" className="text-blue-600 hover:underline mb-4 inline-block">
                    &larr; Back to Tenders
                </Link>

                <div className="grid gap-8">
                    {/* Work Item Details Card */}
                    <TenderCard
                        title={tender.title}
                        // tenderId="53465714"
                        dueDate={tender.dueDate}
                        // value="₹8,00,000"
                        // category="Rural Roadworks"
                        description={tender.description}
                        // location="Bangalore, Karnataka"
                        currentBidPrice={tender.currentBid}
                        // publishedDate="28/09/2024"
                        bidStartDate={tender.bidStartDate}
                        bidEndDate={tender.bidEndDate}
                        imageUrl={tender.imageUrl}
                    />
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender Type</p>
                                        <p>{tender.basicDetails.tenderType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender ID</p>
                                        <p>{tender.basicDetails.tenderID}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender Reference Number</p>
                                        <p>{tender.basicDetails.tenderReferenceNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Organization Chain</p>
                                        <p>{tender.basicDetails.organizationChain}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender Category</p>
                                        <p>{tender.basicDetails.tenderCategory}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Withdrawal Allowed</p>
                                        <p>{tender.basicDetails.withdrawalAllowed}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Form of Contract</p>
                                        <p>{tender.basicDetails.formOfContract}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">No. of Covers</p>
                                        <p>{tender.basicDetails.cover_no}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">General Technical Evaluation Allowed</p>
                                        <p>{tender.basicDetails.general_technical_evaluation_allowed}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">ItemWise Technical Evaluation Allowed</p>
                                        <p>{tender.basicDetails.itemwise_technical_evaluation_allowed}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Payment Mode</p>
                                        <p>{tender.basicDetails.paymentMode}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Is Multi Currency allowed for BOQ?</p>
                                        <p>{tender.basicDetails.is_Multicurrency_BOQ}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Is Multi Currency allowed for fee?</p>
                                        <p>{tender.basicDetails.is_Multicurrecy_fee}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Allow Two Stage Bidding</p>
                                        <p>{tender.basicDetails.allow_two_stage_bidding}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Instruments Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Instruments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {tender.paymentInstruments.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-5 w-5 text-gray-500" />
                                            <p className="text-sm">{doc.instrumentType}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs uppercase text-gray-500">
                                                {/* {index === 8 ? 'Finance' : 'Fee/PreQual/Technical'} */}
                                                {doc.paymentMode}
                                            </span>
                                            <Button variant="outline" size="sm">View</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tender Document Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tender Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {tender.tenderDocuments.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-5 w-5 text-gray-500" />
                                            <p className="text-sm">{doc.documentName}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs uppercase text-gray-500">
                                                {/* {index === 8 ? 'Finance' : 'Fee/PreQual/Technical'} */}
                                                {doc.documentSize}
                                            </span>
                                            <Button variant="outline" size="sm">View</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Work Item Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Work Item Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Title</h3>
                                    <p>{tender.WorkItemDetails.Title}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Work Description</h3>
                                    <p>{tender.WorkItemDetails.WorkDescription} Quarters at BSF Campus Mawpat, SHQ BSF Shillong</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">NDA/Pre Qualification</p>
                                        <p>{tender.WorkItemDetails.NDA_PreQualification}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Independent External Monitor/Remarks</p>
                                        <p>{tender.WorkItemDetails.IndependentExternalMonitorRemarks}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender Value in ₹</p>
                                        <p>{tender.WorkItemDetails.TenderValue}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Product Category</p>
                                        <p>{tender.WorkItemDetails.ProductCategory}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Sub Category</p>
                                        <p>{tender.WorkItemDetails.SubCategory}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Contract Type</p>
                                        <p>{tender.WorkItemDetails.ContractType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bid Validity(Days)</p>
                                        <p>{tender.WorkItemDetails.BidValidity}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Period Of Work(Days)</p>
                                        <p>{tender.WorkItemDetails.PeriodOfWorkDays}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Location</p>
                                        <p>{tender.WorkItemDetails.Location}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Pincode</p>
                                        <p>{tender.WorkItemDetails.Pincode}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Pre Bid Meeting Place</p>
                                        <p>{tender.WorkItemDetails.PreBidMeetingPlace}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Pre Bid Meeting Address</p>
                                        <p>{tender.WorkItemDetails.PreBidMeetingAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Pre Bid Meeting Date</p>
                                        <p>{tender.WorkItemDetails.PreBidMeetingDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bid Opening Place</p>
                                        <p>{tender.WorkItemDetails.BidOpeningPlace}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Should Allow NDA Tender</p>
                                        <p>{tender.WorkItemDetails.ShouldAllowNDATender}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Allow Preferential Bidder</p>
                                        <p>{tender.WorkItemDetails.AllowPreferentialBidder}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Fee Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Fee Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-4">Tender Fee Details</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender Fee in ₹</p>
                                        <p>{tender.TenderFeeDetails.TenderFee}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Fee Payable To</p>
                                        <p>{tender.TenderFeeDetails.FeePayableTo}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Tender Fee Exemption Allowed</p>
                                        <p>{tender.TenderFeeDetails.TenderFeeExemptionAllowed}</p>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-4">EMD Fee Details</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">EMD Amount in ₹</p>
                                        <p>{tender.EMDFeeDetails.EMDAmount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">EMD Fee Type</p>
                                        <p>{tender.EMDFeeDetails.EMDFeeType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">EMD Payable To</p>
                                        <p>{tender.EMDFeeDetails.EMDPayableTo}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">EMD Percentage</p>
                                        <p>{tender.EMDFeeDetails.EMDPercentage}%</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">EMD Exemption Allowed</p>
                                        <p>{tender.EMDFeeDetails.EMDExemptionAllowed}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">EMD Payable At</p>
                                        <p>{tender.EMDFeeDetails.EMDPayableAt}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Critical Dates Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Critical Dates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Published Date</p>
                                        <p>{tender.CriticalDates.PublishedDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bid Opening Date</p>
                                        <p>{tender.CriticalDates.BidOpeningDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Document Download / Sale Start Date</p>
                                        <p>{tender.CriticalDates.DocumentDownloadSaleStartDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Document Download / Sale End Date</p>
                                        <p>{tender.CriticalDates.DocumentDownloadSaleEndDate}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Clarification Start Date</p>
                                        <p>{tender.CriticalDates.ClarificationStartDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Clarification End Date</p>
                                        <p>{tender.CriticalDates.ClarificationEndDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bid Submission Start Date</p>
                                        <p>{tender.CriticalDates.BidSubmissionStartDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bid Submission End Date</p>
                                        <p>{tender.CriticalDates.BidSubmissionEndDate}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Covers Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Covers Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {tender.coversInformation.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-5 w-5 text-gray-500" />
                                            <p className="text-sm">{doc.coverName}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs uppercase text-gray-500">
                                                {doc.coverType}
                                            </span>
                                            <Button variant="outline" size="sm">View</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tender Inviting Authority Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tender Inviting Authority</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Name</p>
                                    <p>{tender.tenderInvitingAuthority.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Address</p>
                                    <p>{tender.tenderInvitingAuthority.address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

