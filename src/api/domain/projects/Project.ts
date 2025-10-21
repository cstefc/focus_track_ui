import {Plan} from "./Plan";
import {string, z} from "zod";
import {Log} from "../logging/Log";

export interface Project {
    id: number;
    ownerUuid: string,
    name: string,
    description: string,
    plans?: Plan[]
    log?: Log
}

export const CreateProjectForm = z.object({
    name: string().min(1, "Project name is required."),
    description: string().min(1, "Description is required."),
})

export type CreateProject = z.infer<typeof CreateProjectForm>;

// TODO: implement this option
export const UpdateProjectForm = z.object({
    name: string().min(1, "Project name is required."),
    description: string().min(1, "Description is required."),
})

export type UpdateProject = z.infer<typeof UpdateProjectForm>;
