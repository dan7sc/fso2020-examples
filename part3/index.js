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

app.get('/api/notes', (req, res) => {
    Note.find({})
        .then(notes => {
            res.json(notes.map(note => note.toJSON()))
        })
        .catch(error => next(error))
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

app.post('/api/notes', (req, res, next) => {
    const body = req.body
    if (body.content === undefined) {
        return res.status(400).json({error: 'content missing'})
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    note.save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
            res.json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body
    const id = req.params.id
    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(id, note, {new: true})
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({error: error.message})
    }
    next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
