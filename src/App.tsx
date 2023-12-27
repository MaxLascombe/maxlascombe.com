import { Redirect, Route, Router, Switch } from 'wouter'
import Boxes from './Boxes'
import { ProgressRoutes } from './progress/routes'

const App = () => {
  return (
    <div className='select-none truncate'>
      <Switch>
        <Route path='/'>
          <Boxes />
        </Route>
        <Router base='/progress'>
          <ProgressRoutes />
        </Router>
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default App
