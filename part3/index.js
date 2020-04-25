const express = require('express')
const notes = require('./db.json')

const app = express()

const PORT = 3001

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) return res.json(note)
    res.status(404).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
