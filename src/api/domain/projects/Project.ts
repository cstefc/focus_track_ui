import {Plan} from "./Plan";

export interface Project {
    id?: number;
    ownerId: number,
    name: string,
    description: string,
    plans: Plan[]
}
