import { Project } from "../interfaces/project";

export async function fetchAllProjects(): Promise<Project[]> {
  const response = await fetch("http://127.0.0.1:8000/projects");
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data: Project[] = await response.json();
  return data;
}