import React, { useContext } from "react"
import { TenantContext } from "../Contexts/TenantContext"


interface ITenant {
    id: string,
    name: string
}

const tenants : Array<ITenant> = [
    { id: "", name: "-- select from list --"},
    { id: "100", name: "Alfa" },
    { id: "200", name: "Bravo" },
    { id: "300", name: "Charlie" },
    { id: "400", name: "Delta" }
]

export const TenantSelector = () => {
    const tenantContext = useContext(TenantContext)

    return <>
        <select size={1} value={tenantContext.tenantId} onChange={(e) => tenantContext.switchTenant(e.target.value)}>
            {tenants.map(tenant => <option key={tenant.id} value={tenant.id}>{tenant.name}</option>)}
        </select>
    </>
}
