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
    subactivity_description_reasoning: string;
    activity_comments_reasoning: string;
    activity_status_impact: number;
    additional_comments: string[];
    phase_comments_reasoning: number;
    phase_status_impact: number;
    predicted_activity_name: string;
    predicted_phase_name: string;
    progress_status_impact: number;
    subactivity_status_impact: number;
    warningDescription_conflicts: string;
    isValid_userDescription: boolean;
    isValid_userDescription_reasoning: string;
    date: string;
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
    images: string[];
    userDescription: string;
    last_image_url: string;
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

export interface Tender {
    title: string;
    description: string;
    dueDate: string;
    currentBid: string;
    bidStartDate: string;
    bidEndDate: string;
    tenderID: string;
    imageUrl: string;
    basicDetails: BasicDetails;
    paymentInstruments: PaymentInstrument[];
    tenderDocuments: TenderDocument[];
    WorkItemDetails: WorkItemDetails;
    TenderFeeDetails: TenderFeeDetails;
    EMDFeeDetails: EMDFeeDetails;
    CriticalDates: CriticalDates;
    coversInformation: CoverInformation[];
    tenderInvitingAuthority: TenderInvitingAuthority;
}

export interface BasicDetails {
    tenderType: string;
    tenderID: string;
    tenderReferenceNumber: string;
    organizationChain: string;
    tenderCategory: string;
    withdrawalAllowed: string;
    formOfContract: string;
    cover_no: number;
    general_technical_evaluation_allowed: string;
    itemwise_technical_evaluation_allowed: string;
    paymentMode: string;
    is_Multicurrency_BOQ: string;
    is_Multicurrecy_fee: string;
    allow_two_stage_bidding: string;
}

export interface PaymentInstrument {
    paymentMode: string;
    instrumentType: string;
}

export interface TenderDocument {
    documentName: string;
    documentSize: string;
}

export interface WorkItemDetails {
    Title: string;
    WorkDescription: string;
    TenderValue: number;
    ProductCategory: string;
    NDA_PreQualification: string;
    ContractType: string;
    BidValidity: number;
    IndependentExternalMonitorRemarks: string;
    SubCategory: string;
    PeriodOfWorkDays: number;
    Location: string;
    Pincode: number;
    PreBidMeetingPlace: string;
    PreBidMeetingAddress: string;
    PreBidMeetingDate: string;
    BidOpeningPlace: string;
    ShouldAllowNDATender: string;
    AllowPreferentialBidder: string;
}

export interface TenderFeeDetails {
    TenderFee: number;
    FeePayableTo: string;
    TenderFeeExemptionAllowed: string;
}

export interface EMDFeeDetails {
    EMDAmount: number;
    EMDFeeType: string;
    EMDPercentage: number;
    EMDExemptionAllowed: string;
    EMDPayableTo: string;
    EMDPayableAt: string;
}

export interface CriticalDates {
    PublishedDate: string;
    DocumentDownloadSaleStartDate: string;
    DocumentDownloadSaleEndDate: string;
    BidSubmissionStartDate: string;
    BidSubmissionEndDate: string;
    BidOpeningDate: string;
    ClarificationStartDate: string;
    ClarificationEndDate: string;
}

export interface CoverInformation {
    coverName: string;
    coverType: string;
}

export interface TenderInvitingAuthority {
    name: string;
    address: string;
}
