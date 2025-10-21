import {Log} from "@/api/domain/logging/Log";

export interface Events {
    id: number
    timed: boolean,
    name: string,
    date: Date,
    description: string,
    log: Log
}
