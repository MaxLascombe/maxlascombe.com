import { useEffect, useRef } from 'react'

const useAnimationFrame = (stepFunction: (a: number) => void) => {
    const animationRef: { current: any } = useRef()

    const animate = (time: number) => {
        stepFunction(time)
        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationRef.current)
    }, [])

    return animationRef
}

export default useAnimationFrame
