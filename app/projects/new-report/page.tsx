'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import { Button } from "@/components/ui/button"
import ReportContent from '@/components/ReportContent'
import { Project } from '@/interfaces/project'
import html2pdf from 'html2pdf.js'
import { useProject } from '@/app/ProjectContext'
// import { ProjectContextData } from '../../layout'

// import generateReport from 
export default function ReportPage() {
    const [reportData, setReportData] = useState<Project | null>(null)
    const reportRef = useRef<HTMLDivElement>(null)
    const { localProject, setLocalProject } = useProject()
    console.log("Data in new report page", localProject)
    // useEffect(() => {
    // const fetchData = async () => {
    // try {
    // const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mongo-gcQscmG3BDzWgDt5EbfwLx0RMuoiVU.json')
    // if (!response.ok) {
    // throw new Error('Failed to fetch data')
    // }
    // const data: ProjectData = await response.json()
    // setReportData(data)
    // } catch (error) {
    // console.error('Error fetching data:', error)
    // }
    // }

    // fetchData()
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            // In a real application, you would fetch this data from an API or database
            // const projectData = await import('@/data/project.json')
            // const projectData = {
            //     "_id": "61f7b1b3b8b3b3b3b3b3b3b3",
            //     "projectName": "NorthConnex Motorway",
            //     "projectId": "NCX2024",
            //     "type": "Highway",
            //     "status": "Completed",
            //     "details": {
            //         "nameOfProject": "NorthConnex Motorway - Section A",
            //         "startDate": "2024-01-01",
            //         "location": "Sydney, Australia",
            //         "estimatedEndDate": "2025-06-30",
            //         "projectId": "NCX2024",
            //         "builderName": "RoadWorks Pty Ltd",
            //         "totalLength": 25,
            //         "roadStretch": "Sydney CBD to Northlink",
            //         "teamStrength": 150,
            //         "startLatitude": -33.8688,
            //         "startLongitude": 151.2093,
            //         "endLatitude": -33.7333,
            //         "endLongitude": 151.2313
            //     },
            //     "progress": {
            //         "percentage": 100,
            //         "phases": [
            //             {
            //                 "phaseName": "Clearing Phase",
            //                 "status": 100,
            //                 "startDate": "2024-01-01",
            //                 "endDate": "2024-02-01",
            //                 "activities": [
            //                     {
            //                         "activityName": "Vegetation Removal",
            //                         "status": 100,
            //                         "startDate": "2024-01-01",
            //                         "endDate": "2024-01-10",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Clearing of trees along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-10",
            //                                 "startLatitude": -33.8688,
            //                                 "startLongitude": 151.2093,
            //                                 "endLatitude": -33.7333,
            //                                 "endLongitude": 151.2313,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316536/AdobeStock_490722778-scaled_20_11zon_lsedl8.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316537/a-yellow-excavator-is-parked-with-a-clear-blue-sky-in-the-background_kxyt25.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Debris Removal",
            //                         "status": 100,
            //                         "startDate": "2024-01-11",
            //                         "endDate": "2024-01-20",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Removal of debris along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-15",
            //                                 "startLatitude": -33.9,
            //                                 "startLongitude": 151.25,
            //                                 "endLatitude": -33.75,
            //                                 "endLongitude": 151.28,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316597/5_30dcdfa6-2ee0-4ca6-a246-92503b7349f3_480x480_gxqoxj.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316597/the-old-excavator-in-workplace-on-construction_ie4bqq.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Topsoil Stripping",
            //                         "status": 100,
            //                         "startDate": "2024-01-21",
            //                         "endDate": "2024-01-30",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Stripping of topsoil along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-20",
            //                                 "startLatitude": -33.85,
            //                                 "startLongitude": 151.2,
            //                                 "endLatitude": -33.7,
            //                                 "endLongitude": 151.22,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316614/1-Siteclearence01_dwl9ov.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316613/11825-1170x650_qrtscz.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Obstruction Removal",
            //                         "status": 100,
            //                         "startDate": "2024-01-31",
            //                         "endDate": "2024-02-01",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Removal of obstructions along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-25",
            //                                 "startLatitude": -33.83,
            //                                 "startLongitude": 151.19,
            //                                 "endLatitude": -33.71,
            //                                 "endLongitude": 151.21,
            //                                 "images": [
            //                                     {
            //                                         "url": ""
            //                                     },
            //                                     {
            //                                         "url": ""
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Excavation Phase",
            //                 "status": 100,
            //                 "startDate": "2024-02-02",
            //                 "endDate": "2024-03-01",
            //                 "activities": [
            //                     {
            //                         "activityName": "Initial Excavation",
            //                         "status": 100,
            //                         "startDate": "2024-02-02",
            //                         "endDate": "2024-02-10",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Initial excavation along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-30",
            //                                 "startLatitude": -33.82,
            //                                 "startLongitude": 151.18,
            //                                 "endLatitude": -33.7,
            //                                 "endLongitude": 151.2,
            //                                 "images": [
            //                                     {
            //                                         "url": ""
            //                                     },
            //                                     {
            //                                         "url": ""
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Bulk Excavation",
            //                         "status": 100,
            //                         "startDate": "2024-02-11",
            //                         "endDate": "2024-02-18",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Bulk excavation along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-02-05",
            //                                 "startLatitude": -33.81,
            //                                 "startLongitude": 151.17,
            //                                 "endLatitude": -33.69,
            //                                 "endLongitude": 151.19,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316633/12_hqcpnn.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316634/539ecab65a58bcfcbc7bc8247f7bbc38_yuqhhd.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Grading",
            //                         "status": 100,
            //                         "startDate": "2024-02-19",
            //                         "endDate": "2024-02-25",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Grading along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-02-10",
            //                                 "startLatitude": -33.8,
            //                                 "startLongitude": 151.16,
            //                                 "endLatitude": -33.68,
            //                                 "endLongitude": 151.18,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733333601/76f433a9-5eae-4d97-aaf8-6e9684850062.png"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733317987/th97_x5oqk0.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Drainage Phase",
            //                 "status": 100,
            //                 "startDate": "2024-03-02",
            //                 "endDate": "2024-04-15",
            //                 "activities": [
            //                     {
            //                         "activityName": "Installation of Pipes or Culverts",
            //                         "status": 100,
            //                         "startDate": "2024-03-02",
            //                         "endDate": "2024-03-20",
            //                         "roadLength": 15,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Installation of pipes or culverts along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-02-15",
            //                                 "startLatitude": -33.79,
            //                                 "startLongitude": 151.15,
            //                                 "endLatitude": -33.67,
            //                                 "endLongitude": 151.17,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316664/black-polypropylene-long-pipes-are-laid-underground-for-communications-construction-of-a-new_xrc4gj.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316662/a-large-long-pit-with-old-pipes-at-the-bottom-during-the-elimination-of-the-accident-and_dqx51b.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Surface Drainage Setup",
            //                         "status": 100,
            //                         "startDate": "2024-03-21",
            //                         "endDate": "2024-04-15",
            //                         "roadLength": 10,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Surface drainage setup along the alignment",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-02-20",
            //                                 "startLatitude": -33.78,
            //                                 "startLongitude": 151.14,
            //                                 "endLatitude": -33.66,
            //                                 "endLongitude": 151.16,
            //                                 "images": [
            //                                     {
            //                                         "url": ""
            //                                     },
            //                                     {
            //                                         "url": ""
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Earthwork Phase",
            //                 "status": 100,
            //                 "startDate": "2024-04-16",
            //                 "endDate": "2024-05-31",
            //                 "activities": [
            //                     {
            //                         "activityName": "Backfilling and Layering",
            //                         "status": 100,
            //                         "startDate": "2024-04-16",
            //                         "endDate": "2024-05-10",
            //                         "roadLength": 20,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Procurement and placement of backfill material across designated road sections.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Backfilling and layering completed without delays.",
            //                                 "activity_comments": "Backfill material placed successfully.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-05-10",
            //                                 "startLatitude": 19.076,
            //                                 "startLongitude": 72.8777,
            //                                 "endLatitude": 19.0144,
            //                                 "endLongitude": 72.8479,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316964/a-yellow-excavator-moving-gravel-in-the-foundation-in-the-house_h6roii.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316964/construction-392-_jpg.rf.871cf6f96b024acb80cdd74d918403a5_lylzpr.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Shaping and Grading",
            //                         "status": 100,
            //                         "startDate": "2024-05-11",
            //                         "endDate": "2024-05-20",
            //                         "roadLength": 20,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Shaping the road surface to meet alignment and grading requirements.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Shaping and grading completed successfully.",
            //                                 "activity_comments": "No issues encountered.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-05-20",
            //                                 "startLatitude": 19.0144,
            //                                 "startLongitude": 72.8479,
            //                                 "endLatitude": 19.045,
            //                                 "endLongitude": 72.865,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316981/aerial-view-of-the-coal-mine_fojpbv.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316981/aerial-drone-view-on-coal-mine-at-immingham-uk_su2dji.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Compaction",
            //                         "status": 100,
            //                         "startDate": "2024-05-21",
            //                         "endDate": "2024-05-31",
            //                         "roadLength": 20,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Compacting soil layers to meet density specifications using vibratory rollers.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Compaction completed as planned.",
            //                                 "activity_comments": "All density and moisture requirements met.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-05-31",
            //                                 "startLatitude": 19.045,
            //                                 "startLongitude": 72.865,
            //                                 "endLatitude": 19.076,
            //                                 "endLongitude": 72.8777,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316994/1-s2.0-S221439122300209X-gr12_phybu5.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316993/1-25_igyqzk.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Subgrade Phase",
            //                 "status": 100,
            //                 "startDate": "2024-06-01",
            //                 "endDate": "2024-06-30",
            //                 "activities": [
            //                     {
            //                         "activityName": "Soil Stabilization",
            //                         "status": 100,
            //                         "startDate": "2024-06-01",
            //                         "endDate": "2024-06-10",
            //                         "roadLength": 10,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Mixing stabilizing agents like lime or cement into the soil to improve its strength.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Soil stabilization completed successfully.",
            //                                 "activity_comments": "Stabilization met all specifications.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-06-10",
            //                                 "startLatitude": 19.076,
            //                                 "startLongitude": 72.8777,
            //                                 "endLatitude": 19.0144,
            //                                 "endLongitude": 72.8479,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733317009/1qnqxRYEFD-LotEBGl4qN0Q_prz2qn.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733317009/1-1_wtwrl2.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Layer Placement",
            //                         "status": 100,
            //                         "startDate": "2024-06-11",
            //                         "endDate": "2024-06-20",
            //                         "roadLength": 10,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Placing and leveling layers of stabilized soil to form the subgrade.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Layer placement completed successfully.",
            //                                 "activity_comments": "All layers placed and leveled as required.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-06-20",
            //                                 "startLatitude": 19.0144,
            //                                 "startLongitude": 72.8479,
            //                                 "endLatitude": 19.045,
            //                                 "endLongitude": 72.865,
            //                                 "images": [
            //                                     {
            //                                         "url": ""
            //                                     },
            //                                     {
            //                                         "url": ""
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Compaction of Subgrade",
            //                         "status": 100,
            //                         "startDate": "2024-06-21",
            //                         "endDate": "2024-06-30",
            //                         "roadLength": 10,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Compacting subgrade layers to achieve uniform density and load-bearing capacity.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Compaction completed on schedule.",
            //                                 "activity_comments": "Compaction achieved desired results.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-06-30",
            //                                 "startLatitude": 19.045,
            //                                 "startLongitude": 72.865,
            //                                 "endLatitude": 19.076,
            //                                 "endLongitude": 72.8777,
            //                                 "images": [
            //                                     {
            //                                         "url": ""
            //                                     },
            //                                     {
            //                                         "url": ""
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Geogrid Phase",
            //                 "status": 100,
            //                 "startDate": "2024-07-01",
            //                 "endDate": "2024-07-20",
            //                 "activities": [
            //                     {
            //                         "activityName": "Geogrid Placement",
            //                         "status": 100,
            //                         "startDate": "2024-07-01",
            //                         "endDate": "2024-07-10",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Laying geogrid material to reinforce the road base.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Geogrid placement completed successfully.",
            //                                 "activity_comments": "No issues reported.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-07-10",
            //                                 "startLatitude": 19.076,
            //                                 "startLongitude": 72.8777,
            //                                 "endLatitude": 19.0144,
            //                                 "endLongitude": 72.8479,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733317025/maxresdefault_bgje5n.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733317025/on-Pavement-Asphalt-Layer-Reinforcement-Geomalla-Geo-Net-Fiberglass-Geogrid_2_11zon_yemx6d.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Securing Geogrid",
            //                         "status": 100,
            //                         "startDate": "2024-07-11",
            //                         "endDate": "2024-07-20",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Securing the geogrid material using anchors to ensure proper stability.",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Geogrid secured successfully.",
            //                                 "activity_comments": "Anchoring completed without delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-07-20",
            //                                 "startLatitude": 19.0144,
            //                                 "startLongitude": 72.8479,
            //                                 "endLatitude": 19.045,
            //                                 "endLongitude": 72.865,
            //                                 "images": [
            //                                     {
            //                                         "url": ""
            //                                     },
            //                                     {
            //                                         "url": ""
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Macadamization Phase",
            //                 "status": 100,
            //                 "startDate": "2024-07-21",
            //                 "endDate": "2024-08-15",
            //                 "activities": [
            //                     {
            //                         "activityName": "Base Material Placement",
            //                         "status": 100,
            //                         "startDate": "2024-07-21",
            //                         "endDate": "2024-07-30",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Pouring aggregate on the road surface",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-10",
            //                                 "startLatitude": -33.8688,
            //                                 "startLongitude": 151.2093,
            //                                 "endLatitude": -33.7333,
            //                                 "endLongitude": 151.2313,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316624/roadbase_gdisho.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316624/granular-sub-base2_58_11zon_zdm0no.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Compaction of Base",
            //                         "status": 100,
            //                         "startDate": "2024-07-31",
            //                         "endDate": "2024-08-10",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Rollers compacting the aggregate layer",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Compaction completed successfully.",
            //                                 "activity_comments": "No delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-18",
            //                                 "startLatitude": -33.85,
            //                                 "startLongitude": 151.21,
            //                                 "endLatitude": -33.74,
            //                                 "endLongitude": 151.23,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316635/gsb_ssdwgv.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316635/GSB-material-testing_ieq3fv.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Leveling and Grading",
            //                         "status": 100,
            //                         "startDate": "2024-08-11",
            //                         "endDate": "2024-08-15",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Heavy machinery leveling and grading the road surface to ensure an even foundation for further layers",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Surface preparation completed successfully.",
            //                                 "activity_comments": "No issues encountered during the process.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-20",
            //                                 "startLatitude": -33.845,
            //                                 "startLongitude": 151.215,
            //                                 "endLatitude": -33.735,
            //                                 "endLongitude": 151.225,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316655/road-base-27194835_jfq8jx.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316655/metal-screed-spreads-hot-asphalt-onto-road-base-preparation-paving-319455727_gtadb1.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Paving Phase",
            //                 "status": 100,
            //                 "startDate": "2024-08-16",
            //                 "endDate": "2024-09-15",
            //                 "activities": [
            //                     {
            //                         "activityName": "Asphalt or Concrete Mixing",
            //                         "status": 100,
            //                         "startDate": "2024-08-16",
            //                         "endDate": "2024-08-25",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "On-site mixing of asphalt and concrete using industrial-grade mixers to prepare materials for paving",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Material mixing completed successfully.",
            //                                 "activity_comments": "All mixing operations were smooth and on schedule.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-22",
            //                                 "startLatitude": -33.84,
            //                                 "startLongitude": 151.22,
            //                                 "endLatitude": -33.73,
            //                                 "endLongitude": 151.23,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316682/asphalt-paving-machine-building_yl94ya.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316682/images7_puhapz.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Paving",
            //                         "status": 100,
            //                         "startDate": "2024-08-26",
            //                         "endDate": "2024-09-05",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Laying freshly mixed asphalt on the prepared surface using a paver machine for an even road layer",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Paving completed smoothly with consistent surface quality.",
            //                                 "activity_comments": "All paving activities were completed on schedule.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-24",
            //                                 "startLatitude": -33.835,
            //                                 "startLongitude": 151.225,
            //                                 "endLatitude": -33.725,
            //                                 "endLongitude": 151.235,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316691/a-team-of-road-workers-repairs-part-of-the-road-using-hand-tools-and-road-equipment_upgqbv.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316691/a-road-worker-in-orange-overalls-shovels-fresh-asphalt-from-a-truck-across-a-section-of-road_x426qq.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Compaction of Paving Material",
            //                         "status": 100,
            //                         "startDate": "2024-09-06",
            //                         "endDate": "2024-09-15",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Using rollers to compact the freshly paved asphalt layer for durability and smoothness",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Compaction of the paved surface completed successfully.",
            //                                 "activity_comments": "Surface compacted to standard specifications with no issues.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-26",
            //                                 "startLatitude": -33.83,
            //                                 "startLongitude": 151.23,
            //                                 "endLatitude": -33.72,
            //                                 "endLongitude": 151.24,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316705/close-road-construction-asphalt-roller-600nw-2462174043_srzn67.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316706/3-23_rajpew.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             },
            //             {
            //                 "phaseName": "Finishing Phase",
            //                 "status": 100,
            //                 "startDate": "2024-09-16",
            //                 "endDate": "2024-10-01",
            //                 "activities": [
            //                     {
            //                         "activityName": "Road Marking",
            //                         "status": 100,
            //                         "startDate": "2024-09-16",
            //                         "endDate": "2024-09-20",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Applying reflective paint to create lane markers, edge lines, and road symbols on the newly paved surface",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Road marking completed with excellent alignment and visibility.",
            //                                 "activity_comments": "Marking process executed on schedule with no issues.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-28",
            //                                 "startLatitude": -33.83,
            //                                 "startLongitude": 151.23,
            //                                 "endLatitude": -33.72,
            //                                 "endLongitude": 151.24,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316725/40532_qubcmw.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316725/aerial-view-of-national-highway-passing-through-kerala-india_cy0ukl.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Signage Installation",
            //                         "status": 100,
            //                         "startDate": "2024-09-21",
            //                         "endDate": "2024-09-25",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Installing road signs, including speed limits and directional markers, to ensure safe and informed travel on the newly completed road",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "All signage successfully installed and verified.",
            //                                 "activity_comments": "Signage installation completed without any delays.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-01-30",
            //                                 "startLatitude": -33.83,
            //                                 "startLongitude": 151.23,
            //                                 "endLatitude": -33.72,
            //                                 "endLongitude": 151.24,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316878/importance-of-traffic-signs-in-road-safety-1_i360uv.png"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316878/expressway-70-mph-speed-limit-road-sign5_aehogl.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Safety Barriers Installation",
            //                         "status": 100,
            //                         "startDate": "2024-09-26",
            //                         "endDate": "2024-09-30",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Installing safety barriers along the edges of the road to enhance driver and pedestrian safety",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Barriers installed and secured as per safety regulations.",
            //                                 "activity_comments": "Installation completed on time with no issues.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-02-01",
            //                                 "startLatitude": -33.83,
            //                                 "startLongitude": 151.23,
            //                                 "endLatitude": -33.72,
            //                                 "endLongitude": 151.24,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316888/safety-steel-barrier-on-freeway-bridge-designed-to-prevent-the-exit-of-the-vehicle-from-the6_irool7.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316889/safety-steel-barrier-on-freeway-bridge-designed-to-prevent-the-exit-of-the-vehicle-from-the4_lm5cws.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         "activityName": "Landscaping",
            //                         "status": 100,
            //                         "startDate": "2024-10-01",
            //                         "endDate": "2024-10-01",
            //                         "roadLength": 25,
            //                         "subActivities": [
            //                             {
            //                                 "subactivity_description": "Planting trees, shrubs, and grass to improve the aesthetics and environmental quality of the road area",
            //                                 "subactivity_status": 100,
            //                                 "activity_status": 100,
            //                                 "phase_status": 100,
            //                                 "phase_comments": "Landscaping completed successfully with all plants installed.",
            //                                 "activity_comments": "Landscaping finished as planned, contributing to the road's visual appeal.",
            //                                 "showWarning": false,
            //                                 "warningDescription": "",
            //                                 "date": "2024-02-03",
            //                                 "startLatitude": -33.83,
            //                                 "startLongitude": 151.23,
            //                                 "endLatitude": -33.72,
            //                                 "endLongitude": 151.24,
            //                                 "images": [
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316898/temporary-covering-of-the-lawn-sowing-with-textiles-to-ensure-a-large-slope-against-erosion_p4na1t.jpg"
            //                                     },
            //                                     {
            //                                         "url": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733316898/two-highway-roads-meeting-each-other_xiihxn.jpg"
            //                                     }
            //                                 ]
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     "team": [
            //         {
            //             "initials": "JK",
            //             "name": "Jaydon Korsgaard",
            //             "role": "Civil Engineer",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "RP",
            //             "name": "Randy Press",
            //             "role": "Equipment Suppliers",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "MS",
            //             "name": "Mark Spencer",
            //             "role": "Transportation Engineer",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "LJ",
            //             "name": "Liana Johnson",
            //             "role": "Contractor",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "HR",
            //             "name": "Hanna Rosser",
            //             "role": "Quality Control Inspector",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "CL",
            //             "name": "Craig Lubin",
            //             "role": "Geotechnical Consultant",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "MC",
            //             "name": "Marilyn Carder",
            //             "role": "RCC",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "GC",
            //             "name": "Gretchen Culhane",
            //             "role": "Material Supplier",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         },
            //         {
            //             "initials": "KL",
            //             "name": "Kianna Lubin",
            //             "role": "Traffic Consultant",
            //             "contact": "987654321",
            //             "avatar": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg",
            //             "email": "random@gmail.com"
            //         }
            //     ],
            //     "reports": [
            //         {
            //             "title": "Monthly Progress Report - March 2023",
            //             "date": "2023-03-31",
            //             "author": "Jaydon Korsgaard",
            //             "fileUrl": "/reports/monthly-progress-march-2023.pdf",
            //             "summary": "Overview of project initiation and site preparation activities"
            //         },
            //         {
            //             "title": "Quarterly Financial Report - Q2 2023",
            //             "date": "2023-06-30",
            //             "author": "Liana Johnson",
            //             "fileUrl": "/reports/quarterly-financial-q2-2023.pdf",
            //             "summary": "Detailed financial analysis and budget tracking for Q2 2023"
            //         },
            //         {
            //             "title": "Environmental Impact Assessment",
            //             "date": "2023-09-15",
            //             "author": "Craig Lubin",
            //             "fileUrl": "/reports/environmental-impact-assessment.pdf",
            //             "summary": "Comprehensive study on the environmental effects of the motorway construction"
            //         },
            //         {
            //             "title": "Safety Audit Report",
            //             "date": "2023-11-30",
            //             "author": "Hanna Rosser",
            //             "fileUrl": "/reports/safety-audit-report-2023.pdf",
            //             "summary": "Detailed safety audit findings and recommendations for ongoing construction"
            //         }
            //     ],
            //     "main_image": "https://res.cloudinary.com/dpo5eucgd/image/upload/v1733322784/building-with-cranes_amtea4.jpg"
            // }


            // const generatedReport = generateReport(projectData)
            setReportData(localProject)
        }

        fetchData()
    }, [])


    const handleDownloadPDF = () => {
        // if (reportRef.current) {
        //     const element = reportRef.current
        //     html2pdf()
        //         .set({ filename: 'project_report.pdf' })
        //         .from(element)
        //         .save()
        // }
        print()
    }

    if (!reportData) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Project Report</h1>
            <Button onClick={handleDownloadPDF} className="mb-4">Download as PDF</Button>
            <div ref={reportRef}>
                <ReportContent data={reportData} />
            </div>
        </div>
    )
}

