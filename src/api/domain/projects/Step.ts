import {Status} from "../predefined/Status";
import {number, string, z} from "zod";

export interface Step {
    id: number,
    sequence: number,

    objective: string,
    description: string,
    requirements: string,

    status: Status
}


export const UpdateStepForm = z.object({
    id: number(),
    sequence: number().min(1, "Sequence is required."),

    objective: string().min(1, "Objective is required."),
    description: string(),
    requirements: string(),

    status: number()
})

export type UpdateStep = z.infer<typeof UpdateStepForm>;

export const CreateStepForm = z.object({
    goalId: number(),

    objective: string().min(1, "Objective is required."),
    description: string(),
    requirements: string(),

    status: number()
})

export type CreateStep = z.infer<typeof CreateStepForm>;

