import {Priority} from "./predefined/Priority";
import {Log} from "@/api/domain/logging/Log";
import {Step} from "@/api/domain/projects/Step";

export interface Plan {
    id?: number;
    goal: string,
    priority: Priority,
    estimate: Date,
    steps: Step[],
    log: Log
}