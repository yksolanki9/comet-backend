const express = require('express');
const router = express.Router();
const Note = require('../../../models/note.model');


router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch(err) {
    res.status(500).send({
      status: 500,
      message: err.message
    });
  }
});

module.exports = router;