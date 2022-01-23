const express = require('express');
const router = express.Router();
const { Note } = require('../../../models/note.model');

console.log('NOETEEEEE', Note);

router.post('/', async (req, res) => {
  try {
    console.log(Req.body);
    const note = new Note(req.body);
    await note.save();
    res.send(note);
  } catch(err) {
    res.status(500).send(err);
  }
})

router.get('/:noteId', async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    res.send(note);
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.patch('/:noteId', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.noteId, req.body);
    res.send(note);
  } catch(err) {
    res.status(500).send(err);
  }
});

module.exports = router;