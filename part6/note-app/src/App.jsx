import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Note'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const localGetAll = async () => {
      const notes = await noteService.getAll()
      dispatch(initializeNotes(notes))
    }
    localGetAll()
  }, [])

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
