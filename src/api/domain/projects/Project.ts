import {string, z} from "zod";

export interface Project {
    id: number;

    title: string,
    description: string,

    archived: boolean
}

export const CreateProjectForm = z.object({
    name: string().min(1, "Project name is required."),
    description: string().min(1, "Description is required."),
})

export type CreateProject = z.infer<typeof CreateProjectForm>;

