import React, { useState, useEffect } from 'react'
import Note from './components/Note'

const get = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const post = async (url, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    const json = await response.json()
    return json
}

const put = async (url, data) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    const json = await response.json()
    return json
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        get('http://localhost:3001/notes').then(response => {
            setNotes(response)
        })
    }, [])
    console.log('render', notes.length, 'notes')

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }
        post('http://localhost:3001/notes', noteObject).then(response => {
            setNotes(notes.concat(response))
            setNewNote('')
        })
        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
          ? notes
          : notes.filter(note => note.important)

    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}
        put(url, changedNote).then(response => {
            setNotes(notes.map(note => note.id !== id ? note : response))
        })
    }

    return (
        <div>
          <h1>Notes</h1>
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
            </button>
          </div>
          <ul>
            {notesToShow.map((note, i) => {
                return <Note
                         key={i}
                         note={note}
                         toggleImportance={() => toggleImportanceOf(note.id)}
                       />
            })}
          </ul>
          <form onSubmit={addNote}>
            <input
              value={newNote}
              onChange={handleNoteChange}
            />
            <button type='submit'>save</button>
          </form>
        </div>
    )
}

export default App
