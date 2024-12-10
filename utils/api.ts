import { Project } from "../interfaces/project";
import { Tender } from "../interfaces/project";

export async function fetchAllProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.
    NEXT_PUBLIC_FAST_API_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data: Project[] = await response.json();
  return data;
}

export async function fetchAllTenders(): Promise<Tender[]> {
  const response = await fetch(`${process.env.
    NEXT_PUBLIC_FAST_API_URL}/tenders`);
  if (!response.ok) {
    throw new Error("Failed to fetch tenders");
  }
  const data: Tender[] = await response.json();
  return data;
}