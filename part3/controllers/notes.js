const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const note = await Note.findById(id)
  if (note) res.json(note.toJSON())
  else res.status(404).end()
})

notesRouter.post('/', async (req, res) => {
  const body = req.body
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date()
  })
  const savedNote = await note.save()
  res.json(savedNote.toJSON())
})

notesRouter.put('/:id', async (req, res) => {
  const body = req.body
  const id = req.params.id
  const note = {
    content: body.content,
    important: body.important
  }
  const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true })
  res.json(updatedNote.toJSON())
})

notesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Note.findByIdAndRemove(id)
  res.status(204).end()
})

module.exports = notesRouter
