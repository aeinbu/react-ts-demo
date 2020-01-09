import { useEffect, useState } from "react"
import { Subject } from "rxjs"


export function useSubscription(subject : Subject<void> | undefined, action : () => void) : void {
    return useEffect(() => {
            const subscription = subject?.subscribe(action)

            return () => {
                // unsubscribe to ensure no memory leaks
                subscription?.unsubscribe()
            }
        },
        // eslint-disable-next-line
        [])
}


export function useSubscribedState<TState>(initialState : TState, subject : Subject<void> | undefined, action : (state: TState) => TState) : [TState, (state: TState) => void] {
    const [state, setState] = useState<TState>(initialState)
    useSubscription(subject, () => setState(action))
    return [state, setState]
}
