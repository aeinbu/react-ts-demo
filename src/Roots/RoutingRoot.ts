import { BehaviorSubject, Subject } from "rxjs"
import { routing } from "../data/routing"

export interface IBatchItemIdentifier {
    productionOrderNumber: string,
    endItemSerialNumber: string,
    operationNumber: Number
}

export interface ISignature {
    who: string,
    when: string,
    what: string
}

interface IOperationKey {
    productionOrderNumber: string,
    endItemSerialNumber: string
}

interface IOperation {
    signatures: Array<ISignature>,
    operationNumber: Number
}

interface IRoutingItem {
    key: IOperationKey,
    routing: Array<IOperation>
}


export class RoutingRoot {
    subject : Subject<void>
    private _data : Array<IRoutingItem> = []

    constructor(diagnostics: any) {
        this.subject = new BehaviorSubject<void>(undefined)
        this.load()
    }

    load(): void {
        this._data = routing

        this.subject.next()
    }

    // getRoutings(identifiers: Array<IBatchItemIdentifier>): Array<IOperation> {
    //     return identifiers.map(identifier => this._getRouting(identifier).routing)
    // }

    _getRouting(identifier: IBatchItemIdentifier): IRoutingItem | undefined {
        return this._data.find(({ key }) => key.productionOrderNumber === identifier.productionOrderNumber
            && key.endItemSerialNumber === identifier.endItemSerialNumber)
    }

    getSignatures(identifier: IBatchItemIdentifier) : Array<ISignature> {
        return this._getRouting(identifier)?.routing.find(x => x.operationNumber === identifier.operationNumber)?.signatures ?? []
    }

    sign(identifiers: Array<IBatchItemIdentifier>, signature: ISignature) {
        identifiers.forEach(identifier => {
            this._getRouting(identifier)?.routing.find(x => x.operationNumber === identifier.operationNumber)?.signatures.push(signature)
        })
        this.subject.next()
    }

    revoke(identifiers: Array<IBatchItemIdentifier>, signature: ISignature) {
        identifiers.forEach(identifier => {
            const signatures: Array<ISignature> = this._getRouting(identifier)?.routing.find((x: IOperation) => x.operationNumber === identifier.operationNumber)?.signatures ?? []
            const signatureToRevoke = signatures.find((x: ISignature) => x === signature)
            if (signatureToRevoke !== undefined) {
                signatureToRevoke.what = "revoked"
            }
        })
        this.subject.next()
    }
}
