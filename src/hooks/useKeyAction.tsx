import { useCallback, useEffect } from 'react'

type KeyAction = [
    (
        | 'ArrowUp'
        | 'ArrowDown'
        | 'ArrowLeft'
        | 'ArrowRight'
        | 'a'
        | 'b'
        | 'c'
        | 'd'
        | 'e'
        | 'f'
        | 'g'
        | 'h'
        | 'i'
        | 'j'
        | 'k'
        | 'l'
        | 'm'
        | 'n'
        | 'o'
        | 'p'
        | 'q'
        | 'r'
        | 's'
        | 't'
        | 'u'
        | 'v'
        | 'w'
        | 'x'
        | 'y'
        | 'z'
    ),
    (e: KeyboardEvent) => void
]

const useKeyAction = (
    keyActions: KeyAction[],
    event: 'keydown' | 'keyup' = 'keydown'
) => {
    const callback = useCallback(
        (e: KeyboardEvent) => {
            for (const kA of keyActions) if (kA[0] === e.key) kA[1](e)
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

export default useKeyAction
