import { Station } from "../Station/Station";

export interface Trip{
    id: number,
    startTime: string,
    endTime: string,
    fromStation: Station,
    toStation: Station
}