"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

import { Project } from "@/interfaces/project";
// type Project = {
//   // Define your Project type here
//   name?: string;
//   description?: string;
// };

type ProjectContextType = {
    localProject: Project;
    setLocalProject: React.Dispatch<React.SetStateAction<Project>>;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [localProject, setLocalProject] = useState<Project>({} as Project);

    return (
        <ProjectContext.Provider value={{ localProject, setLocalProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
