import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell } from 'recharts'

const projectProgressData = [
    { date: '2023-01', progress: 0, phase: 'Planning' },
    { date: '2023-02', progress: 10, phase: 'Planning' },
    { date: '2023-03', progress: 20, phase: 'Design' },
    { date: '2023-04', progress: 30, phase: 'Design' },
    { date: '2023-05', progress: 40, phase: 'Construction' },
    { date: '2023-06', progress: 50, phase: 'Construction' },
    { date: '2023-07', progress: 60, phase: 'Construction' },
    { date: '2023-08', progress: 70, phase: 'Testing' },
    { date: '2023-09', progress: 80, phase: 'Testing' },
    { date: '2023-10', progress: 90, phase: 'Handover' },
    { date: '2023-11', progress: 100, phase: 'Handover' },
]

const budgetAllocationData = [
    { name: 'Planning', value: 20 },
    { name: 'Design', value: 30 },
    { name: 'Construction', value: 40 },
    { name: 'Testing', value: 5 },
    { name: 'Handover', value: 5 },
]

const phaseProgressData = {
    Planning: [
        { date: '2023-01', progress: 0 },
        { date: '2023-02', progress: 50 },
        { date: '2023-03', progress: 100 },
    ],
    Design: [
        { date: '2023-03', progress: 0 },
        { date: '2023-04', progress: 50 },
        { date: '2023-05', progress: 100 },
    ],
    Construction: [
        { date: '2023-05', progress: 0 },
        { date: '2023-06', progress: 33 },
        { date: '2023-07', progress: 66 },
        { date: '2023-08', progress: 100 },
    ],
    Testing: [
        { date: '2023-08', progress: 0 },
        { date: '2023-09', progress: 50 },
        { date: '2023-10', progress: 100 },
    ],
    Handover: [
        { date: '2023-10', progress: 0 },
        { date: '2023-11', progress: 100 },
    ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function ProjectInsights() {
    const [selectedPhase, setSelectedPhase] = useState('Planning')

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{
                        progress: {
                            label: "Progress",
                            color: "hsl(var(--chart-1))",
                        },
                    }} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projectProgressData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="progress" stroke="var(--color-progress)" fill="var(--color-progress)" fillOpacity={0.3} />
                                {projectProgressData.map((entry, index) => (
                                    entry.progress % 20 === 0 && (
                                        <Tooltip
                                            key={`phase-${index}`}
                                            content={<div className="bg-background p-2 rounded shadow">{entry.phase}</div>}
                                            position={{ x: index * (100 / (projectProgressData.length - 1)) + '%', y: 0 }}
                                        />
                                    )
                                ))}
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={budgetAllocationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {budgetAllocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Phase Progress</span>
                        <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select phase" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(phaseProgressData).map((phase) => (
                                    <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{
                        progress: {
                            label: "Progress",
                            color: "hsl(var(--chart-1))",
                        },
                    }} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={phaseProgressData[selectedPhase]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

