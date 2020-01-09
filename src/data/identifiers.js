import { routing } from "./routing"

export const identifiers = routing.map(x => ({...x.key, operationNumber: 10}))