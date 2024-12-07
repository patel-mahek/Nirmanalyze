import { Project } from '@/interfaces/project'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Area, AreaChart, Scatter, ScatterChart, ZAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ReportContent({ data }: { data: Project }) {
    const phaseProgress = data.progress.phases.map(phase => ({
        name: phase.phaseName,
        progress: phase.status,
        startDate: new Date(phase.startDate).getTime(),
        endDate: new Date(phase.endDate).getTime(),
    }));

    const activityProgress = data.progress.phases.flatMap(phase =>
        phase.activities.map(activity => ({
            name: activity.activityName,
            progress: activity.status,
            phase: phase.phaseName,
            startDate: new Date(activity.startDate).getTime(),
            endDate: new Date(activity.endDate).getTime(),
        }))
    );

    const teamRoles = data.team.reduce((acc, member) => {
        acc[member.role] = (acc[member.role] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const teamRolesData = Object.entries(teamRoles).map(([role, count]) => ({
        name: role,
        value: count
    }));

    const cumulativeProgress = data.progress.phases.reduce((acc, phase) => {
        const lastProgress = acc[acc.length - 1]?.progress || 0;
        acc.push({
            date: new Date(phase.startDate).getTime(),
            progress: lastProgress + phase.status,
        });
        return acc;
    }, [] as { date: number; progress: number }[]);

    const roadLengthByPhase = data.progress.phases.map(phase => ({
        name: phase.phaseName,
        roadLength: phase.activities.reduce((sum, activity) => sum + activity.roadLength, 0),
    }));

    const activityDuration = activityProgress.map(activity => ({
        name: activity.name,
        duration: (activity.endDate - activity.startDate) / (1000 * 60 * 60 * 24), // Duration in days
        progress: activity.progress,
    }));

    console.log(data.main_image)
    // console.log(data.progress.phases[0].activities[0].subActivities[0].images[0].url)
    return (
        <>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Image src={data.main_image} alt={data.projectName} width={500} height={300} className="rounded-lg" />
                            </div>
                            <div>
                                <p><strong>Project Name:</strong> {data.projectName}</p>
                                <p><strong>Project ID:</strong> {data.projectId}</p>
                                <p><strong>Type:</strong> {data.type}</p>
                                <p><strong>Status:</strong> {data.status}</p>
                                <p><strong>Location:</strong> {data.details.location}</p>
                                <p><strong>Start Date:</strong> {data.details.startDate}</p>
                                <p><strong>Estimated End Date:</strong> {data.details.estimatedEndDate}</p>
                                <p><strong>Builder:</strong> {data.details.builderName}</p>
                                <p><strong>Total Length:</strong> {data.details.totalLength} km</p>
                                <p><strong>Road Stretch:</strong> {data.details.roadStretch}</p>
                                <p><strong>Team Strength:</strong> {data.details.teamStrength}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={data.progress.percentage} className="w-full" />
                        <p className="mt-2">{data.progress.percentage}% Complete</p>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Phase Progress</h3>
                            <ChartContainer config={{
                                progress: {
                                    label: "Progress",
                                    color: "hsl(var(--chart-1))",
                                },
                            }} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={phaseProgress}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="progress" fill="var(--color-progress)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cumulative Progress Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{
                            progress: {
                                label: "Cumulative Progress",
                                color: "hsl(var(--chart-2))",
                            },
                        }} className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={cumulativeProgress}>
                                    <XAxis
                                        dataKey="date"
                                        type="number"
                                        domain={['dataMin', 'dataMax']}
                                        tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        content={<ChartTooltipContent />}
                                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                    />
                                    <Area type="monotone" dataKey="progress" stroke="var(--color-progress)" fill="var(--color-progress)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Road Length by Phase</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{
                            roadLength: {
                                label: "Road Length (km)",
                                color: "hsl(var(--chart-3))",
                            },
                        }} className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={roadLengthByPhase}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="roadLength" fill="var(--color-roadLength)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Activity Duration vs Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{
                            duration: {
                                label: "Duration (days)",
                                color: "hsl(var(--chart-4))",
                            },
                            progress: {
                                label: "Progress (%)",
                                color: "hsl(var(--chart-5))",
                            },
                        }} className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart>
                                    <XAxis type="number" dataKey="duration" name="Duration" unit=" days" />
                                    <YAxis type="number" dataKey="progress" name="Progress" unit="%" />
                                    <ZAxis type="category" dataKey="name" name="Activity" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                                    <Scatter name="Activities" data={activityDuration} fill="var(--color-duration)" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {data.progress.phases.map((phase, phaseIndex) => (
                    <Card key={phaseIndex}>
                        <CardHeader>
                            <CardTitle>{phase.phaseName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={phase.status} className="w-full mb-2" />
                            <p><strong>Status:</strong> {phase.status}% Complete</p>
                            <p><strong>Start Date:</strong> {phase.startDate}</p>
                            <p><strong>End Date:</strong> {phase.endDate}</p>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Activity Progress</h3>
                                <ChartContainer config={{
                                    progress: {
                                        label: "Progress",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }} className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={phase.activities}>
                                            <XAxis dataKey="activityName" />
                                            <YAxis />
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="status" fill="var(--color-progress)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>

                            {phase.activities.map((activity, activityIndex) => (
                                <Card key={activityIndex} className="mt-4">
                                    <CardHeader>
                                        <CardTitle>{activity.activityName}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Progress value={activity.status} className="w-full mb-2" />
                                        <p><strong>Status:</strong> {activity.status}% Complete</p>
                                        <p><strong>Start Date:</strong> {activity.startDate}</p>
                                        <p><strong>End Date:</strong> {activity.endDate}</p>
                                        <p><strong>Road Length:</strong> {activity.roadLength} km</p>

                                        {activity.subActivities.map((subActivity, subActivityIndex) => (
                                            <Card key={subActivityIndex} className="mt-4">
                                                <CardHeader>
                                                    <CardTitle>{subActivity.subactivity_description}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p><strong>Status:</strong> {subActivity.subactivity_status}%</p>
                                                    <p><strong>Activity Impact:</strong> {subActivity.activity_status}%</p>
                                                    <p><strong>Phase Impact:</strong> {subActivity.phase_status}%</p>
                                                    <p><strong>Phase Comments:</strong> {subActivity.phase_comments}</p>
                                                    <p><strong>Activity Comments:</strong> {subActivity.activity_comments}</p>
                                                    {subActivity.showWarning && (
                                                        <p className="text-red-500"><strong>Warning:</strong> {subActivity.warningDescription}</p>
                                                    )}
                                                    <p><strong>Date:</strong> {subActivity.date}</p>
                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        {subActivity.images.map((image, imageIndex) => (
                                                            <div key={imageIndex}>
                                                                <Image
                                                                    src={image.url}
                                                                    alt={`Construction progress ${imageIndex + 1}`}
                                                                    width={300}
                                                                    height={200}
                                                                    className="rounded-lg"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                ))}

                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.team.map((member, index) => (
                                <Card key={index}>
                                    <CardContent className="flex items-center space-x-4 p-4">
                                        <Avatar>
                                            <AvatarFallback>{member.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{member.name}</p>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                            <p className="text-sm">{member.contact}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Team Composition</h3>
                            <ChartContainer config={{
                                value: {
                                    label: "Count",
                                    color: "hsl(var(--chart-3))",
                                },
                            }} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={teamRolesData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="var(--color-value)"
                                            label
                                        />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Summary</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.reports.map((report, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                {report.title}
                                            </a>
                                        </TableCell>
                                        <TableCell>{report.date}</TableCell>
                                        <TableCell>{report.author}</TableCell>
                                        <TableCell>{report.summary}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* </continuation_point> */}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Project Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{
                            startDate: {
                                label: "Start Date",
                                color: "hsl(var(--chart-4))",
                            },
                            endDate: {
                                label: "End Date",
                                color: "hsl(var(--chart-5))",
                            },
                        }} className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={phaseProgress}>
                                    <XAxis dataKey="name" />
                                    <YAxis type="number" domain={['dataMin', 'dataMax']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} />
                                    <Tooltip content={<ChartTooltipContent />} labelFormatter={(label) => `Phase: ${label}`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="startDate" stroke="var(--color-startDate)" name="Start Date" />
                                    <Line type="monotone" dataKey="endDate" stroke="var(--color-endDate)" name="End Date" />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </>

    )
}

// <div className="space-y-6">
//     <Card>
//         <CardHeader>
//             <CardTitle>Project Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <Image src={data.main_image} alt={data.projectName} width={500} height={300} className="rounded-lg" />
//                 </div>
//                 <div>
//                     <p><strong>Project Name:</strong> {data.projectName}</p>
//                     <p><strong>Project ID:</strong> {data.projectId}</p>
//                     <p><strong>Type:</strong> {data.type}</p>
//                     <p><strong>Status:</strong> {data.status}</p>
//                     <p><strong>Location:</strong> {data.details.location}</p>
//                     <p><strong>Start Date:</strong> {data.details.startDate}</p>
//                     <p><strong>Estimated End Date:</strong> {data.details.estimatedEndDate}</p>
//                     <p><strong>Builder:</strong> {data.details.builderName}</p>
//                     <p><strong>Total Length:</strong> {data.details.totalLength} km</p>
//                     <p><strong>Road Stretch:</strong> {data.details.roadStretch}</p>
//                     <p><strong>Team Strength:</strong> {data.details.teamStrength}</p>
//                 </div>
//             </div>
//         </CardContent>
//     </Card>

//     <Card>
//         <CardHeader>
//             <CardTitle>Overall Progress</CardTitle>
//         </CardHeader>
//         <CardContent>
//             <Progress value={data.progress.percentage} className="w-full" />
//             <p className="mt-2">{data.progress.percentage}% Complete</p>
//         </CardContent>
//     </Card>

//     {data.progress.phases.map((phase, phaseIndex) => (
//         <Card key={phaseIndex}>
//             <CardHeader>
//                 <CardTitle>{phase.phaseName}</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <Progress value={phase.status} className="w-full mb-2" />
//                 <p><strong>Status:</strong> {phase.status}% Complete</p>
//                 <p><strong>Start Date:</strong> {phase.startDate}</p>
//                 <p><strong>End Date:</strong> {phase.endDate}</p>

//                 {phase.activities.map((activity, activityIndex) => (
//                     <Card key={activityIndex} className="mt-4">
//                         <CardHeader>
//                             <CardTitle>{activity.activityName}</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <Progress value={activity.status} className="w-full mb-2" />
//                             <p><strong>Status:</strong> {activity.status}% Complete</p>
//                             <p><strong>Start Date:</strong> {activity.startDate}</p>
//                             <p><strong>End Date:</strong> {activity.endDate}</p>
//                             <p><strong>Road Length:</strong> {activity.roadLength} km</p>

//                             {activity.subActivities.map((subActivity, subActivityIndex) => (
//                                 <Card key={subActivityIndex} className="mt-4">
//                                     <CardHeader>
//                                         <CardTitle>{subActivity.subactivity_description}</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <p><strong>Status:</strong> {subActivity.subactivity_status}%</p>
//                                         <p><strong>Activity Impact:</strong> {subActivity.activity_status}%</p>
//                                         <p><strong>Phase Impact:</strong> {subActivity.phase_status}%</p>
//                                         <p><strong>Phase Comments:</strong> {subActivity.phase_comments}</p>
//                                         <p><strong>Activity Comments:</strong> {subActivity.activity_comments}</p>
//                                         {subActivity.showWarning && (
//                                             <p className="text-red-500"><strong>Warning:</strong> {subActivity.warningDescription}</p>
//                                         )}
//                                         <p><strong>Date:</strong> {subActivity.date}</p>
//                                         <div className="mt-4 grid grid-cols-2 gap-4">
//                                             {subActivity.images.map((image, imageIndex) => (
//                                                 <div key={imageIndex}>
//                                                     <Image
//                                                         src={image.url}
//                                                         alt={`Construction progress ${imageIndex + 1}`}
//                                                         width={300}
//                                                         height={200}
//                                                         className="rounded-lg"
//                                                     />
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             ))}
//                         </CardContent>
//                     </Card>
//                 ))}
//             </CardContent>
//         </Card>
//     ))}

//     <Card>
//         <CardHeader>
//             <CardTitle>Team Members</CardTitle>
//         </CardHeader>
//         <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {data.team.map((member, index) => (
//                     <Card key={index}>
//                         <CardContent className="flex items-center space-x-4 p-4">
//                             <Avatar>
//                                 <AvatarFallback>{member.initials}</AvatarFallback>
//                             </Avatar>
//                             <div>
//                                 <p className="font-semibold">{member.name}</p>
//                                 <p className="text-sm text-gray-500">{member.role}</p>
//                                 <p className="text-sm">{member.contact}</p>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </CardContent>
//     </Card>

//     <Card>
//         <CardHeader>
//             <CardTitle>Reports</CardTitle>
//         </CardHeader>
//         <CardContent>
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Title</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead>Author</TableHead>
//                         <TableHead>Summary</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {data.reports.map((report, index) => (
//                         <TableRow key={index}>
//                             <TableCell>
//                                 <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                                     {report.title}
//                                 </a>
//                             </TableCell>
//                             <TableCell>{report.date}</TableCell>
//                             <TableCell>{report.author}</TableCell>
//                             <TableCell>{report.summary}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </CardContent>
//     </Card>
// </div>
