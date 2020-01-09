
export const routing = [{
        key: { productionOrderNumber: "123000456", endItemSerialNumber: "SN2201" },
        routing: [{
                operationNumber: 10,
                signatures: [
                    { who: "arjan", when: "2017-10-13 10:30:00", what: "revoked" },
                    { who: "peter", when: "2017-10-13 10:30:00", what: "sign" },
                    { who: "mary", when: "2017-10-13 10:45:00", what: "sign" }
                ]
            },
            { operationNumber: 20, signatures: [] },
            { operationNumber: 30, signatures: [] },
            { operationNumber: 40, signatures: [] }
        ]
    },
    {
        key: { productionOrderNumber: "123000456", endItemSerialNumber: "SN2202" },
        routing: [{
                operationNumber: 10,
                signatures: [
                    { who: "arjan", when: "2017-10-13 10:31:00", what: "sign" },
                    { who: "mary", when: "2017-10-13 10:47:00", what: "sign" }
                ]
            },
            {
                operationNumber: 20,
                signatures: [
                    { who: "lisa", when: "2017-10-15 10:30:00", what: "sign" }
                ]
            },
            { operationNumber: 30, signatures: [] },
            { operationNumber: 40, signatures: [] }
        ]
    },
    {
        key: { productionOrderNumber: "123000456", endItemSerialNumber: "SN2203" },
        routing: [
            { operationNumber: 10, signatures: [] },
            { operationNumber: 20, signatures: [] },
            { operationNumber: 30, signatures: [] },
            { operationNumber: 40, signatures: [] }
        ]
    },
    {
        key: { productionOrderNumber: "123000456", endItemSerialNumber: "SN2204" },
        routing: [
            { operationNumber: 10, signatures: [] },
            { operationNumber: 20, signatures: [] },
            { operationNumber: 30, signatures: [] },
            { operationNumber: 40, signatures: [] }
        ]
    },
    {
        key: { productionOrderNumber: "123000456", endItemSerialNumber: "SN2205" },
        routing: [
            { operationNumber: 10, signatures: [
                { who: "lisa", when: "2017-10-15 10:30:00", what: "sign" }
            ] },
            { operationNumber: 20, signatures: [] },
            { operationNumber: 30, signatures: [] },
            { operationNumber: 40, signatures: [] }
        ]
    }
]
