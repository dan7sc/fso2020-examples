import React from 'react'
import { createStore } from 'redux'
import './App.css'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state in the redux store',
    important: true,
    id: 1
  },
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2
  }
})

const generateId = () => {
  return Number(Math.random() * 1000000).toFixed(0)
}

function App() {
  const addNote = event => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId()
      }
    })
  }

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    })
  }

  return (
    <div>
      <h1>Note App</h1>
      <form onSubmit={addNote}>
        <input name='note'/>
        <button type='submit'>add</button>
      </form>
      <ul>
        {
          store.getState().map(note => {
            return (
              <li
                key={note.id}
                onClick={() => toggleImportance(note.id)}
              >
                {note.content} <strong>{note.important ? 'important' : ''}</strong>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default { App, store }
