// interfaces/project.ts
export interface Project {
    _id: string;
    projectName: string;
    projectId: string;
    type: string;
    status: string;
    main_image: string;
    details: ProjectDetailsType;
    progress: ProjectProgress;
    team: TeamMember[];
    reports: Report[];
}

export interface ProjectDetailsType {
    nameOfProject: string;
    startDate: string;
    location: string;
    estimatedEndDate: string;
    projectId: string;
    builderName: string;
    totalLength: number;
    roadStretch: string;
    teamStrength: number;
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
}

export interface ProjectProgress {
    percentage: number;
    phases: Phase[];
}

export interface Phase {
    phaseName: string;
    status: number;
    startDate: string;
    endDate: string;
    activities: Activity[];
}

export interface Activity {
    activityName: string;
    status: number;
    startDate: string;
    endDate: string;
    roadLength: number;
    subActivities: SubActivity[];
}

export interface SubActivity {
    subactivity_description: string;
    subactivity_status: number;
    activity_status: number;
    phase_status: number;
    phase_comments: string;
    activity_comments: string;
    showWarning: boolean;
    warningDescription: string;
    date: string;
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
    images: Image[];
}

export interface Image {
    url: string;
}

export interface TeamMember {
    initials: string;
    name: string;
    role: string;
    contact: string;
    avatar: string;
    email: string;
}

export interface Report {
    title: string;
    date: string;
    author: string;
    fileUrl: string;
    summary: string;
}
