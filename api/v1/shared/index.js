const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("../../../middleware/auth");
const SharedNote = require("../../../models/shared-note.model");
const Note = require("../../../models/note.model");
const User = require("../../../models/user.model");

const router = express.Router();

router.post("/:noteId", verifyToken, async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    const { recipientEmail } = req.body;

    //Check if note exists
    if (!note) {
      return res.status(404).send({
        message: "Note with id does not exist",
      });
    }

    //Check if the user owns the note
    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).send({
        message: "Unauthorized to access data",
      });
    }

    //Check if the receipient email is provided
    if (!recipientEmail) {
      return res.status(404).send({
        message: "Please provide the recipient's email",
      });
    }

    const recipient = await User.findOne({ email: recipientEmail });

    //Check if recipient email is valid
    if (!recipient) {
      return res.status(404).send({
        message: "User does not exist",
      });
    }

    //Add entry in sharedNote collection
    const sharedNote = new SharedNote({
      _id: new mongoose.Types.ObjectId(),
      ownerId: req.user.userId,
      recipientId: recipient._id,
      noteId: req.params.noteId,
    });

    await sharedNote.save();

    return res.status(200).send(sharedNote);
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const sharedNotes = await SharedNote.find({
      recipientId: req.user.userId,
    });
    return res.status(200).send(sharedNotes);
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.get("/:noteId", verifyToken, async (req, res) => {
  try {
    const sharedNotes = await SharedNote.findOne({
      noteId: req.params.noteId,
      recipientId: req.user.userId,
    });
    return res.status(200).send(sharedNotes);
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.patch("/:noteId", verifyToken, async (req, res) => {
  res.status(401).send({
    message: "Not Authorized",
  });
});

module.exports = router;
