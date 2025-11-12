import {Priority} from "../predefined/Priority";
import {number, string, z} from "zod/index";

export interface Goal {
    id: number;

    title: string;
    description: string;

    priority: Priority;
    estimate: Date;
}


export const CreateGoalForm = z.object({
    title: string().min(1, "Event title is required."),
    description: string().min(1, "Event description is required."),

    priority: number(),
    estimate: Date()
})

export type CreateGoal = z.infer<typeof CreateGoalForm>;
