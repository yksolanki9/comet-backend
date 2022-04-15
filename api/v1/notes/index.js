const express = require('express');
const router = express.Router();
const Note = require('../../../models/note.model');
const UserNotes = require('../../../models/user-notes.model');

router.get('/', async (req, res) => {
  try {
    await UserNotes.findOne({
      userId: req.user.userId
    }).populate('notes').exec((err, userNotes) => {
      if (err) {
        return res.status(500).send('Some issue at backend');
      }
      return res.status(200).send(userNotes);
    });
  } catch(err) {
    res.status(500).send({
      status: 500,
      message: err.message
    });
  }
});

module.exports = router;