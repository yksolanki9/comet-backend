const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose;
const router = express.Router();
const Note = require('../../../models/note.model');
const UserNotes = require('../../../models/user-notes.model');

router.post('/', async (req, res) => {
  try {
    const note = new Note({
      _id: new mongoose.Types.ObjectId(),
      userId: req.user.userId,
      ...req.body
    });
    await note.save(async (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      try {
        const userNote = await UserNotes.findOneAndUpdate({userId: req.user.userId}, {
          '$push': { 'notes': note._id}
        });
      
        if (!userNote) {
          const newUserNote = new UserNotes({
            userId: req.user.userId,
            notes: [note._id]
          })
          await newUserNote.save();
        }
      }
      catch (err) {
        return res.status(500).send(err.message); 
      }
      return res.status(200).send(note);
    });
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
    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).send('Unauthorized to access data');
    }
    return res.status(200).send(note);
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
    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).send('Unauthorized to access data');
    }
    return res.status(200).send(note);
  } catch(err) {
    res.status(500).send({
      status: 500,
      message: err.message
    });
  }
});

module.exports = router;