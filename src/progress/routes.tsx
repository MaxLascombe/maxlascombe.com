import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import { goals } from './goals'
import { Progress } from './progress'

const useYear = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const updateYear = () => setYear(new Date().getFullYear())
  useEffect(() => {
    const interval = setInterval(updateYear, 1000)
    return () => clearInterval(interval)
  }, [])
  return year
}

export const ProgressRoutes = () => {
  const year = useYear()
  return (
    <Switch>
      {Object.keys(goals).map(year => (
        <Route key={year} path={`/${year}`}>
          <Progress
            year={parseInt(year)}
            newsletterLink={goals[parseInt(year)].link}
          />
        </Route>
      ))}
      <Redirect to={`/${year}`} />
    </Switch>
  )
}
