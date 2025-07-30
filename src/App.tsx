import { Redirect, Route, Router, Switch } from 'wouter'
import Boxes from './Boxes'
import { BucketList } from './bucket-list'
import CharlottesBirthday from './charlottes-bday'
import Breakfast from './charlottes-bday/breakfast'
import Drinks from './charlottes-bday/drinks'
import { ProgressRoutes } from './progress/routes'

const App = () => {
  return (
    <div className='truncate'>
      <Switch>
        <Route path='/'>
          <Boxes />
        </Route>
        <Route path='/bucket-list'>
          <BucketList />
        </Route>
        <Route path='/charlottes-bday'>
          <CharlottesBirthday />
        </Route>
        <Route path='/charlottes-bday/breakfast'>
          <Breakfast />
        </Route>
        <Route path='/charlottes-bday/drinks'>
          <Drinks />
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
