import {Plan} from "./Plan";

export interface Project {
    id?: number;
    name: string,
    description: string,
    plans: Plan[]
}
