const express = require('express');
const router = express.Router();
const Note = require('../../../models/note.model');

router.post('/', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.send(note);
  } catch(err) {
    res.status(500).send({
      status: 500,
      message: err.message
    });
  }
})

router.get('/:noteId', async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    res.send(note);
  } catch(err) {
    res.status(500).send({
      status: 500,
      message: err.message
    });
  }
});

router.patch('/:noteId', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.noteId, req.body);
    res.send(note);
  } catch(err) {
    res.status(500).send({
      status: 500,
      message: err.message
    });
  }
});

module.exports = router;