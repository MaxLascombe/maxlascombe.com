import { useCallback, useEffect } from 'react'

type KeyAction = {
    key: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'n' | 'x'
    function: (e: KeyboardEvent) => void
}

export const useKeyAction = (
    keyActions: KeyAction[],
    event: 'keydown' | 'keyup' = 'keydown'
) => {
    const callback = useCallback(
        (e: KeyboardEvent) => {
            for (const kA of keyActions) if (kA.key === e.key) kA.function(e)
        },
        [keyActions]
    )
    return useEffect(() => {
        document.addEventListener(event, callback)
        return () => {
            document.removeEventListener(event, callback)
        }
    }, [keyActions, event, callback])
}
