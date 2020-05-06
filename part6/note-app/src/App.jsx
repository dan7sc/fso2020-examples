import React from 'react'
import { createStore } from 'redux'
import './App.css'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.data)
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state in the redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

function App() {
  return (
    <div>
      <h1>Note App</h1>
      <ul>
        {
          store.getState().map(note => {
            return (
              <li key={note.id}>
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
