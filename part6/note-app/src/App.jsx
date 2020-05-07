import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Note'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  return (
    <div>
      <h1>Note App</h1>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
