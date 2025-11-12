import {Entry} from "./Entry";

export interface Log {
    id: number;
    archived: boolean;
    entries: Entry[];
}