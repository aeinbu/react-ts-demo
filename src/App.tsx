import React, { useState } from 'react'

import './App.scss'
// import './Ugly.css'
import { BatchList } from "./Components/BatchList"
import { Actions } from "./Components/Actions"
import { TenantSelector } from "./Components/TenantSelector"
import { BatchItemSelector } from "./Components/BatchItemSelector"

import { RoutingRoot, IBatchItemIdentifier } from "./Roots/RoutingRoot"

import { BatchContext, IBatchContext } from "./Contexts/BatchContext"
import { TenantContext, ITenantContext } from "./Contexts/TenantContext"


export const App : React.FC = () => <TenantFrame />


interface ITenantFrameState {
    tenantId: string
}


const TenantFrame : React.FC = () => {
    const [state, setState ] = useState<ITenantFrameState>({ tenantId: "" })

    const diagnostics = { tenantId: state.tenantId }
    const tenantContext : ITenantContext = {
        tenantId: state.tenantId,
        switchTenant: (tenantId) => setState({ ...state, tenantId }),
        routingRoot: new RoutingRoot(diagnostics)
    }

    return (
        <TenantContext.Provider value={tenantContext}>{
            state.tenantId === ""
                ? <TenantIsNotSelected />
                : <TenantIsSelected key={state.tenantId} />
        }</TenantContext.Provider>
    )
}


const TenantIsNotSelected : React.FC = () => <div className="large">
    Please select tenant: <TenantSelector />
</div>


const TenantIsSelected : React.FC = () => <>
    <section>
        Current tenant: <TenantSelector />
    </section>
    <div className="spacer half-line"></div>
    <BatchFrame />
</>




interface IBatchFrameState {
    batch: Array<IBatchItemIdentifier>
}

const BatchFrame : React.FC = () => {
    const [state, setState] = useState<IBatchFrameState>({ batch: [] })

    const batchContext : IBatchContext = {
        batch: state.batch,
        modifyBatch: (batch) => setState({ ...state, batch })
    }

    return (
        <BatchContext.Provider value={batchContext}>{
            state.batch.length === 0
                ? <BatchIsEmpty />
                : <BatchIsNotEmpty />
        }</BatchContext.Provider>
    )
}


const BatchIsEmpty : React.FC = () => <section>
    <BatchItemSelector />
</section>


const BatchIsNotEmpty : React.FC = () => <>
    <section className="main-grid">
        <section className="panel">
            <h2 className="heading" >Batch items</h2>
            <div className="body">
                <BatchList />
            </div>
        </section>
        <section className="panel">
            <h2 className="heading">Middle panel</h2>
            <div className="body">
            </div>
        </section>
        <section className="panel">
            <h2 className="heading">Actions</h2>
            <div className="body">
                <Actions />
            </div>
        </section>
    </section>
</>

