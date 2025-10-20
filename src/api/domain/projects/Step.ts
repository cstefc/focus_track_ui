import {Plan} from "./Plan";
import {Status} from "./predefined/Status";

export interface Step {
    id?: number,
    plan: Plan
    sequence: number,
    objective: string,
    description: string,
    requirements: string,
    status: Status
}
