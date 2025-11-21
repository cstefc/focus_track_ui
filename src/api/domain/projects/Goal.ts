import {Priority} from "../predefined/Priority";
import {number, string, z} from "zod";
import {UpdateStepForm, Step} from "@/api/domain/projects/Step";

export interface Goal {
    id: number;

    title: string;
    description: string;

    priority: Priority;
    estimate: Date;

    steps: Step[]
}

export const CreateGoalForm = z.object({
    title: string().min(1, "Event title is required."),
    description: string().min(1, "Event description is required."),

    priority: number(),
    estimate: Date(),

    steps: z.array(UpdateStepForm)
})

export type CreateGoal = z.infer<typeof CreateGoalForm>;

export const UpdateGoalForm = z.object({
    id: number().min(1, "Goal id is required."),
    title: string().min(1, "Event title is required."),
    description: string().min(1, "Event description is required."),
    priority: number(),
    estimate: z.date(),
})

export type UpdateGoal = z.infer<typeof UpdateGoalForm>;
