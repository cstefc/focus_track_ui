import {Entry} from "./Entry";
import {AppUser} from "@/api/domain/general/AppUser";

export interface Log {
    id?: number,
    entries: Entry[];
    user: AppUser;
}

