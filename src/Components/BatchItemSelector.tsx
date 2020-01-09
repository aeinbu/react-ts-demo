import React, { useContext, useState } from "react"
import { BatchContext } from "../Contexts/BatchContext"
import { identifiers } from "../data/identifiers"

export const BatchItemSelector = () => {
    const { batch, modifyBatch } = useContext(BatchContext)
    const [batchSelection, setBatchSelection] = useState(identifiers.map(key => ({
        key,
        isSelected: batch.some(x => x.productionOrderNumber === key.productionOrderNumber && x.endItemSerialNumber === key.endItemSerialNumber)
    })))

    return <>
        <h3>Modify batch</h3>
        {batchSelection.map((x, ix) =>
            <div key={ix} >
                <label>
                    <input type="checkbox" checked={x.isSelected} onChange={() => {
                        const newSelection = [
                            ...batchSelection.slice(0, ix),
                            { key: x.key, isSelected: !x.isSelected },
                            ...batchSelection.slice(ix + 1)
                        ]

                        setBatchSelection(newSelection)
                    }} />
                    {x.key.productionOrderNumber}/
                    {x.key.endItemSerialNumber}/
                    {x.key.operationNumber}
                </label>
            </div>
        )}
        <button onClick={() => modifyBatch(batchSelection.filter(x => x.isSelected).map(x => x.key))}>
            Store batch
        </button>
    </>
}
