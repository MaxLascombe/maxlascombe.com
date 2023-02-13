import { Route } from 'wouter'
import Boxes from './Boxes'
import Progress from './Progress'

const App = () => {
  return (
    <div className='select-none truncate'>
      <Route path='/'>
        <Boxes />
      </Route>
      <Route path='/progress'>
        <Progress />
      </Route>
    </div>
  )
}

export default App
