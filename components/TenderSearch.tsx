'use client'

import { useState } from "react"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface TenderSearchProps {
    onSearch: (filters: any) => void
}

export function TenderSearch({ onSearch }: TenderSearchProps) {
    const [filters, setFilters] = useState({
        tenderType: "",
        tenderID: "",
        tenderReferenceNo: "",
        workTitle: "",
        tenderCategory: "",
        productCategory: "",
        organization: "",
        department: "",
        division: "",
        subDivision: "",
        formOfContract: "",
        pincode: "",
        paymentMode: "",
        valueCriteria: "",
        dateCriteria: "",
        twoStageBidding: false,
        ndaTenders: false,
        preferentialBidding: false,
        gte: false,
        tenderFeeException: false,
        iteips: false,
        emdExemption: false,
    })

    const handleSearch = () => {
        onSearch(filters)
    }

    const handleClear = () => {
        setFilters({
            tenderType: "",
            tenderID: "",
            tenderReferenceNo: "",
            workTitle: "",
            tenderCategory: "",
            productCategory: "",
            organization: "",
            department: "",
            division: "",
            subDivision: "",
            formOfContract: "",
            pincode: "",
            paymentMode: "",
            valueCriteria: "",
            dateCriteria: "",
            twoStageBidding: false,
            ndaTenders: false,
            preferentialBidding: false,
            gte: false,
            tenderFeeException: false,
            iteips: false,
            emdExemption: false,
        })
    }

    return (
        <Card className="mb-6">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="tenderType">Tender Type</Label>
                        <Select
                            value={filters.tenderType}
                            onValueChange={(value) => setFilters({ ...filters, tenderType: value })}
                        >
                            <SelectTrigger id="tenderType">
                                <SelectValue placeholder="Select a tender type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="open">Open Tender</SelectItem>
                                <SelectItem value="limited">Limited Tender</SelectItem>
                                <SelectItem value="special">Special Limited Tender</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">Required</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tenderID">Tender ID</Label>
                        <Input
                            id="tenderID"
                            placeholder="Enter an ID"
                            value={filters.tenderID}
                            onChange={(e) => setFilters({ ...filters, tenderID: e.target.value })}
                        />
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tenderReferenceNo">Tender Reference Number</Label>
                        <Input
                            id="tenderReferenceNo"
                            placeholder="Enter a reference number"
                            value={filters.tenderReferenceNo}
                            onChange={(e) => setFilters({ ...filters, tenderReferenceNo: e.target.value })}
                        />
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="workTitle">Work Title</Label>
                        <Input
                            id="workTitle"
                            placeholder="Enter a work title"
                            value={filters.workTitle}
                            onChange={(e) => setFilters({ ...filters, workTitle: e.target.value })}
                        />
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tenderCategory">Tender Category</Label>
                        <Select
                            value={filters.tenderCategory}
                            onValueChange={(value) => setFilters({ ...filters, tenderCategory: value })}
                        >
                            <SelectTrigger id="tenderCategory">
                                <SelectValue placeholder="Select a tender category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="services">Services</SelectItem>
                                <SelectItem value="works">Works</SelectItem>
                                <SelectItem value="goods">Goods</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="productCategory">Product Category</Label>
                        <Select
                            value={filters.productCategory}
                            onValueChange={(value) => setFilters({ ...filters, productCategory: value })}
                        >
                            <SelectTrigger id="productCategory">
                                <SelectValue placeholder="Select a product category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="civil">Civil Works</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                                <SelectItem value="mechanical">Mechanical</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Select
                            value={filters.organization}
                            onValueChange={(value) => setFilters({ ...filters, organization: value })}
                        >
                            <SelectTrigger id="organization">
                                <SelectValue placeholder="Select an organization" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bsf">BSF</SelectItem>
                                <SelectItem value="dgbsf">DG BSF</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                            value={filters.department}
                            onValueChange={(value) => setFilters({ ...filters, department: value })}
                        >
                            <SelectTrigger id="department">
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="works">Works</SelectItem>
                                <SelectItem value="procurement">Procurement</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="division">Division</Label>
                        <Select
                            value={filters.division}
                            onValueChange={(value) => setFilters({ ...filters, division: value })}
                        >
                            <SelectTrigger id="division">
                                <SelectValue placeholder="Select a division" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="north">North</SelectItem>
                                <SelectItem value="south">South</SelectItem>
                                <SelectItem value="east">East</SelectItem>
                                <SelectItem value="west">West</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                            id="pincode"
                            placeholder="Enter a pincode"
                            value={filters.pincode}
                            onChange={(e) => setFilters({ ...filters, pincode: e.target.value })}
                        />
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="paymentMode">Payment Mode</Label>
                        <Select
                            value={filters.paymentMode}
                            onValueChange={(value) => setFilters({ ...filters, paymentMode: value })}
                        >
                            <SelectTrigger id="paymentMode">
                                <SelectValue placeholder="Select a payment mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="offline">Offline</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dateCriteria">Date Criteria</Label>
                        <Input
                            id="dateCriteria"
                            type="date"
                            value={filters.dateCriteria}
                            onChange={(e) => setFilters({ ...filters, dateCriteria: e.target.value })}
                        />
                        <span className="text-xs text-muted-foreground">Optional</span>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Selection Criteria</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="twoStageBidding"
                                checked={filters.twoStageBidding}
                                onCheckedChange={(checked) =>
                                    setFilters({ ...filters, twoStageBidding: checked as boolean })
                                }
                            />
                            <Label htmlFor="twoStageBidding">Two stage Bidding</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="ndaTenders"
                                checked={filters.ndaTenders}
                                onCheckedChange={(checked) =>
                                    setFilters({ ...filters, ndaTenders: checked as boolean })
                                }
                            />
                            <Label htmlFor="ndaTenders">NDA Tenders</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="preferentialBidding"
                                checked={filters.preferentialBidding}
                                onCheckedChange={(checked) =>
                                    setFilters({ ...filters, preferentialBidding: checked as boolean })
                                }
                            />
                            <Label htmlFor="preferentialBidding">Preferential Bidding</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="gte"
                                checked={filters.gte}
                                onCheckedChange={(checked) => setFilters({ ...filters, gte: checked as boolean })}
                            />
                            <Label htmlFor="gte">GTE</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="tenderFeeException"
                                checked={filters.tenderFeeException}
                                onCheckedChange={(checked) =>
                                    setFilters({ ...filters, tenderFeeException: checked as boolean })
                                }
                            />
                            <Label htmlFor="tenderFeeException">Tender Fee Exception</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="iteips"
                                checked={filters.iteips}
                                onCheckedChange={(checked) =>
                                    setFilters({ ...filters, iteips: checked as boolean })
                                }
                            />
                            <Label htmlFor="iteips">ITE/IPS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="emdExemption"
                                checked={filters.emdExemption}
                                onCheckedChange={(checked) =>
                                    setFilters({ ...filters, emdExemption: checked as boolean })
                                }
                            />
                            <Label htmlFor="emdExemption">EMD Exemption</Label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="outline" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button onClick={handleSearch}>
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

