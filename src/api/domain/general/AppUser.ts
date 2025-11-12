import {Role} from "../predefined/Role";

export interface AppUser {
    uuid: string;
    name: string;
    email: string;
    roles: Role[];
}
