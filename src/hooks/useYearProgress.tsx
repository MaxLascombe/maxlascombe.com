import { useEffect, useState } from 'react'

export const useYearProgress = (year?: number) => {
  const [yearProgress, setYearProgress] = useState(0)

  const updateYearProgress = () => {
    const now = new Date().getTime()
    const start = new Date(new Date().getFullYear(), 0, 0).getTime()
    const diff = now - start
    const newYear = new Date(new Date().getFullYear() + 1, 0, 0).getTime()
    setYearProgress(diff / (newYear - start))
  }

  if (
    (year === undefined || year <= new Date().getFullYear()) &&
    yearProgress === 0
  )
    updateYearProgress()

  useEffect(() => {
    if (year !== undefined && year !== new Date().getFullYear()) {
      if (year < new Date().getFullYear()) return setYearProgress(1)
      return setYearProgress(0)
    }
    const timeout = setTimeout(updateYearProgress, 1000)
    return () => clearTimeout(timeout)
  }, [year, yearProgress])

  return yearProgress
}
