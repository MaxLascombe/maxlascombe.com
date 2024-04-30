import { useCallback, useEffect, useRef, useState } from 'react'

const useWindowIsFocused = () => {
  const [focused, setFocus] = useState(true)

  useEffect(() => {
    window.addEventListener('focus', () => setFocus(true))
    window.addEventListener('blur', () => setFocus(false))

    return () => {
      window.removeEventListener('focus', () => setFocus(true))
      window.removeEventListener('blur', () => setFocus(false))
    }
  }, [])

  return focused
}

export const useAnimationFrame = (
  stepFunction: (dt: number) => void,
  ...args: any[]
) => {
  const windowIsFocused = useWindowIsFocused()
  const lastTimeRef = useRef<number>()
  const animationRef: { current: any } = useRef()

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current !== undefined && windowIsFocused)
        stepFunction(time - lastTimeRef.current)
      lastTimeRef.current = time
      animationRef.current = requestAnimationFrame(animate)
    },
    [stepFunction, windowIsFocused]
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
