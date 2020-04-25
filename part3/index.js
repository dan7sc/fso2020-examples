const express = require('express')
const notes = require('./db.json')

const app = express()

const PORT = 3001

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
