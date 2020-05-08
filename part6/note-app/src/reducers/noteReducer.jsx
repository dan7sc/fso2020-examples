const noteReducer = (state = [], action) => {
  console.log('ACTION:', action)

  switch(action.type) {
  case 'NEW_NOTE':
    return [...state, action.data]
  case 'INIT_NOTES':
    return action.data
  case 'TOGGLE_IMPORTANCE': {
    const id = action.data.id
    const noteToChange = state.find(n => n.id === id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    }
    return state.map(note => {
      return note.id !== id ? note : changedNote
    })
  }
  default:
    return state
  }
}

const generateId = () => {
  return Number(Math.random() * 1000000).toFixed(0)
}

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes
  }
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer
