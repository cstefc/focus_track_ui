import {Priority} from "../predefined/Priority";
import {number, string, z} from "zod";

export interface Goal {
    id: number;

    title: string;
    description: string;

    priority: Priority;
    estimate: string;
}

export const CreateGoalForm = z.object({
    projectId: string().min(1),

    title: string().min(1, "Event title is required."),
    description: string().min(1, "Event description is required."),

    priority: number(),
    estimate: string(),
})

export type CreateGoal = z.infer<typeof CreateGoalForm>;

export const UpdateGoalForm = z.object({
    id: number().min(0, "Goal id is required."),
    title: string().min(1, "Event title is required."),
    description: string().min(1, "Event description is required."),
    priority: number(),
    estimate: string(),
})

export type UpdateGoal = z.infer<typeof UpdateGoalForm>;
