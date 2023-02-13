import { Redirect, Route, Switch } from 'wouter'
import Boxes from './Boxes'
import Progress from './Progress'

const App = () => {
  return (
    <div className='select-none truncate'>
      <Switch>
        <Route path='/'>
          <Boxes />
        </Route>
        <Route path='/progress'>
          <Progress />
        </Route>
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default App
