const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res, next) => {
  const notes = await Note.find({})
  res.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Note.findById(id)
    .then(note => {
      if (note) res.json(note.toJSON())
      else res.status(404).end()
    })
    .catch(error => next(error))
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body
  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date()
  })
  const savedNote = await note.save()
  res.json(savedNote.toJSON())
})

notesRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  const note = {
    content: body.content,
    important: body.important
  }
  Note.findByIdAndUpdate(id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = notesRouter