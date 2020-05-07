import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Note'

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }

  return (
    <div>
      <h1>Note App</h1>
      <NewNote/>
      <div>
        all <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('ALL')}
        />
        important <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('IMPORTANT')}
        />
        nonimportant <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('NONIMPORTANT')}
        />
      </div>
      <Notes />
    </div>
  )
}

export default App
