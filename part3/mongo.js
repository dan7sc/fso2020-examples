const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
      `mongodb+srv://fshelyui:${password}@cluster0-rvapt.mongodb.net/note-app?retryWrites=true&w=majority`

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, dbOptions)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    date: new Date(),
    important: true
})

note.save().then(result => {
    console.log('note saved')
    mongoose.connection.close()
})
