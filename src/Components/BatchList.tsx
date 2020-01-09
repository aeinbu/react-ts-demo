import React, { useContext } from "react"
import { BatchContext } from "../Contexts/BatchContext"
import { TenantContext } from "../Contexts/TenantContext"
import { useSubscribedState } from "../Hooks/SubscriptionHooks"
import { ISignature } from "../Roots/RoutingRoot"
import { IBatchItemIdentifier } from "../Roots/RoutingRoot"


const identifierToKey = (identifier: IBatchItemIdentifier) => `${identifier.productionOrderNumber}::${identifier.endItemSerialNumber}::${identifier.operationNumber}`


export function BatchList() {
    const { batch } = useContext(BatchContext)
    return <>{batch.map((identifier) => <BatchListItem key={identifierToKey(identifier)} identifier={identifier} />)}</>
}


interface IBatchListItemState {
    signatures: Array<ISignature>
}

interface IBatchListItemProps {
    identifier : IBatchItemIdentifier
}

// const BatchListItem = ({ identifier } : IBatchListItemProps) => {
// const BatchListItem = ({ identifier } : { identifier : IBatchItemIdentifier}) => {
const BatchListItem: React.FC<IBatchListItemProps> = ({ identifier }) => {
// const BatchListItem: React.FC<{ identifier: IBatchItemIdentifier }> = ({ identifier }) => {
    const { routingRoot } = useContext(TenantContext)

    const [state] = useSubscribedState<IBatchListItemState>(
        { signatures: [] },
        routingRoot?.subject,
        state => ({
            ...state,
            signatures: routingRoot?.getSignatures(identifier) ?? []
        })
    )

    const { signatures } = state
    return <>
        <article>
            <div className="flex horizontal">
                <div>
                    <small>Prod. order</small>
                    <br />
                    {identifier.productionOrderNumber}
                </div>
                <div>
                    <small>SN</small>
                    <br />
                    {identifier.endItemSerialNumber}
                </div>
                <div>
                    <small>Operation</small>
                    <br />
                    {identifier.operationNumber}
                </div>
            </div>
            <div className="spacer half-line"></div>
            <div className="flex horizontal">
                <div>
                    <div><small>Signatures</small></div>
                </div>
                <div>
                    <button onClick={() => routingRoot?.sign([identifier], { who: "arjan", when: "2019-12-18 09:56:12", what: "sign" })}>Sign</button>
                </div>
            </div>
            <Signatures identifier={identifier} signatures={signatures} />

        </article>
    </>
}


const Signatures: React.FC<{ identifier: IBatchItemIdentifier, signatures: Array<ISignature> }> = ({ identifier, signatures }) =>
    signatures.length === 0
        ? <em>No signatures yet.</em>
        : <>{signatures.map((signature, ix) => <Signature key={ix} identifier={identifier} signature={signature} />)}</>

// const Signatures = ({ identifier, signatures } : { identifier: IBatchItemIdentifier, signatures: Array<ISignature> }) =>
//     signatures.length === 0
//         ? <em>No signatures yet.</em>
//         : signatures.map((signature, ix) => <Signature key={ix} identifier={identifier} signature={signature} />)


const Signature: React.FC<{ identifier: IBatchItemIdentifier, signature: ISignature }> = ({ identifier, signature }) => {
    const { routingRoot } = useContext(TenantContext)

    return signature.what === "revoked"
        ? <>
            <div className="flex horizontal">
                <div className="revoked signature">
                    {signature.who} ({signature.when})
                </div>
            </div>
        </>
        : <>
            <div className="flex horizontal">
                <div className="signed signature">
                    {signature.who} ({signature.when})
                </div>
                <div>
                    <button onClick={() => routingRoot?.revoke([identifier], signature)}>Revoke</button>
                </div>
            </div>
        </>

}