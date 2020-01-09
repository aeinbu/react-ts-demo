import React from "react"
import { RoutingRoot } from "../Roots/RoutingRoot"

export interface ITenantContext {
    tenantId: string|undefined,
    switchTenant: (tenantId: string) => void,
    routingRoot: RoutingRoot|undefined
}

export const TenantContext = React.createContext<ITenantContext>({
    tenantId: undefined,
    switchTenant: () => console.warn("*** TenantContext::switchTenant default version does nothing"),
    routingRoot: undefined
})
