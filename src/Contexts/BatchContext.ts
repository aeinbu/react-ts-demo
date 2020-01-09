import React from "react"
import { IBatchItemIdentifier } from "../Roots/RoutingRoot"

export interface IBatchContext {
    batch: Array<IBatchItemIdentifier>,
    modifyBatch: (batch: Array<IBatchItemIdentifier>) => void
}

export const BatchContext = React.createContext<IBatchContext>({
    batch: [],
    modifyBatch: () => console.warn("*** BatchContext::modifyBatch default version does nothing")
})
