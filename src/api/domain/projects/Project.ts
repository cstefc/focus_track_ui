import {string, z, boolean} from "zod";

export interface Project {
    id: number;

    title: string,
    description: string,

    archived: boolean
}

export const CreateProjectForm = z.object({
    title: string().min(1, "Project title is required."),
    description: string().min(1, "Description is required."),
    archived: boolean()
})

export type CreateProject = z.infer<typeof CreateProjectForm>;

