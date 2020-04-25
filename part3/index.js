const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
let notes = require('./db.json')

const PORT = 3001
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) return res.json(note)
    res.status(404).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({error: 'content missing'})
    }
    const newNote = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }
    notes = notes.concat(newNote)
    res.json(newNote)
})

app.put('/api/notes/:id', (req, res) => {
    const returnedNote = req.body
    notes = notes.map(note => note.id !== returnedNote.id ? note : returnedNote)
    res.json(returnedNote)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const generateId = () => {
    const maxId = notes.length > 0
          ? Math.max(...notes.map(note => note.id))
          : 0
    return maxId + 1
}
