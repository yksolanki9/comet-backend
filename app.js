const express = require('express');
require('dotenv').config();
require('./mongoose');
const Note = require('./models/note.model');

const app = express();
app.use(express.urlencoded());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  try {
    res.redirect('/notes');
  } catch(err) {
    res.status(500).send(err);
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch(err) {
    res.status(500).send(err);
  }
});

app.post('/note', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.send(note);
  } catch(err) {
    res.status(500).send(err);
  }
})

app.get('/note/:noteId', async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    res.send(note);
  } catch(err) {
    res.status(500).send(err);
  }
});

app.patch('/note/:noteId', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.noteId, req.body);
    res.send(note);
  } catch(err) {
    res.status(500).send(err);
  }
})

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});