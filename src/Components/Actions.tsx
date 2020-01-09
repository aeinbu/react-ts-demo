import React, { useContext, useState } from "react"
import { BatchContext } from "../Contexts/BatchContext"
import { TenantContext } from "../Contexts/TenantContext"


export const Actions = () => {
    return <>
        <article>
            <h3>Comment</h3>
            <button>Comment...</button>
        </article>
        <article>
            <RegisterComponent />
        </article>
        <article>
            <SignOperations />
        </article>
    </>
}


const RegisterComponent = () => {
    const [inputText, setInputText] = useState("")
    const register = () => {
        console.log("*** registering component", inputText)
        setInputText("")
    }

    return <>
        <h3>Register component</h3>
        <input type="text" value={inputText} onChange={event => setInputText(event.target.value)} />
        <button onClick={() => register()}>Register</button>
    </>
}



const SignOperations = () => {
    const { batch } = useContext(BatchContext)
    const { routingRoot } = useContext(TenantContext)

    return <>
        <h3>Sign</h3>
        <button onClick={() => routingRoot?.sign(batch, { who: "paul", when: "2019-12-18 10:03:38", what: "sign" })}>Sign all</button>
    </>
}