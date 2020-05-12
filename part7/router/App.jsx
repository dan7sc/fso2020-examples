import React from 'react'
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  )
}

const Notes = () => {
  return (
    <div>
      <h2>Notes</h2>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>

      <Switch>
        <Route path='/notes'>
          <Notes />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2020</i>
      </div>
    </Router>
  )
}

export default App
