import {Entry} from "./Entry";
import {AppUser} from "@/api/domain/general.json/AppUser";

export interface Log {
    id?: number,
    entries: Entry[];
    user: AppUser;
}

