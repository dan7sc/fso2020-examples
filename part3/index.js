require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findById(id)
        .then(note => {
            if (note) res.json(note.toJSON())
            else res.status(404).end()
        })
        .catch(error => next(error))
})

app.post('/api/notes', (req, res) => {
    const body = req.body
    if (body.content === undefined) {
        return res.status(400).json({error: 'content missing'})
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    note.save().then(savedNote => {
        res.json(savedNote.toJSON())
    })
})

// app.put('/api/notes/:id', (req, res) => {
//     const returnedNote = req.body
//     notes = notes.map(note => note.id !== returnedNote.id ? note : returnedNote)
//     res.json(returnedNote)
// })

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
