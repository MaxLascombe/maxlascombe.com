import { useEffect, useState } from 'react'

export const useYearProgress = () => {
  const [yearProgress, setYearProgress] = useState(0)

  const updateYearProgress = () => {
    const now = new Date().getTime()
    const start = new Date(new Date().getFullYear(), 0, 0).getTime()
    const diff = now - start
    const newYear = new Date(new Date().getFullYear() + 1, 0, 0).getTime()
    setYearProgress(diff / (newYear - start))
  }

  if (yearProgress === 0) updateYearProgress()

  useEffect(() => {
    const timeout = setTimeout(updateYearProgress, 1000)
    return () => clearTimeout(timeout)
  }, [yearProgress])

  return yearProgress
}
