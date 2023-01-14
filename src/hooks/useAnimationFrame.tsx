import { useEffect, useRef } from 'react'

const useAnimationFrame = (
    stepFunction: (dt: number) => void,
    ...args: any[]
) => {
    const lastTimeRef = useRef<number>()
    const animationRef: { current: any } = useRef()

    const animate = (time: number) => {
        if (lastTimeRef.current !== undefined)
            stepFunction(time - lastTimeRef.current)
        lastTimeRef.current = time
        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationRef.current)
    }, args)

    return animationRef
}

export default useAnimationFrame
