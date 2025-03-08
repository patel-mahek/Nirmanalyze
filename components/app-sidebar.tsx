"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    MessageSquare,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./ModeToggle"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Settings2,
            // items: [
            //     {
            //         title: "General",
            //         url: "#",
            //     },
            //     {
            //         title: "Team",
            //         url: "#",
            //     },
            //     {
            //         title: "Billing",
            //         url: "#",
            //     },
            //     {
            //         title: "Limits",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Projects",
            url: "/projects",
            icon: SquareTerminal,
            isActive: true,
            // items: [
            //     {
            //         title: "History",
            //         url: "#",
            //     },
            //     {
            //         title: "Starred",
            //         url: "#",
            //     },
            //     {
            //         title: "Settings",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Tender Marketplace",
            url: "/tender-marketplace",
            icon: MessageSquare,
            // items: [
            //     {
            //         title: "Genesis",
            //         url: "#",
            //     },
            //     {
            //         title: "Explorer",
            //         url: "#",
            //     },
            //     {
            //         title: "Quantum",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Chatbot",
            url: "/chatbot",
            icon: BookOpen,
            // items: [
            //     {
            //         title: "Introduction",
            //         url: "#",
            //     },
            //     {
            //         title: "Get Started",
            //         url: "#",
            //     },
            //     {
            //         title: "Tutorials",
            //         url: "#",
            //     },
            //     {
            //         title: "Changelog",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Community",
            url: "/community",
            icon: Settings2,
            // items: [
            //     {
            //         title: "General",
            //         url: "#",
            //     },
            //     {
            //         title: "Team",
            //         url: "#",
            //     },
            //     {
            //         title: "Billing",
            //         url: "#",
            //     },
            //     {
            //         title: "Limits",
            //         url: "#",
            //     },
            // ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
                <ModeToggle />
                <UserButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
