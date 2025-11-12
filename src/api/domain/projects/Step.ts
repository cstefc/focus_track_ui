import {Status} from "../predefined/Status";
import {number, string, z} from "zod/index";

export interface Step {
    id: number,
    sequence: number,

    objective: string,
    description: string,
    requirements: string,

    status: Status
}


export const CreateStepForm = z.object({
    sequence: number().min(1, "Sequence is required."),

    objective: string().min(1, "Objective is required."),
    description: string(),
    requirements: string(),

    status: number()
})

export type CreateStep = z.infer<typeof CreateStepForm>;

