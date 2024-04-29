import { useCallback, useEffect, useRef } from 'react'

export const useAnimationFrame = (
  stepFunction: (dt: number) => void,
  ...args: any[]
) => {
  const lastTimeRef = useRef<number>()
  const animationRef: { current: any } = useRef()

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current !== undefined)
        stepFunction(time - lastTimeRef.current)
      lastTimeRef.current = time
      animationRef.current = requestAnimationFrame(animate)
    },
    [stepFunction]
  )

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [args, animate])

  return animationRef
}

export const useAnimationTimeout = (
  toDo: () => void,
  timeout: number,
  ...args: any[]
) => {
  const dtRef = useRef(0)

  useAnimationFrame(
    dt => {
      dtRef.current += dt
      if (dtRef.current < timeout) return
      dtRef.current = 0
      toDo()
    },
    [timeout, ...args]
  )
}
