const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("../../../middleware/auth");
const router = express.Router();
const Note = require("../../../models/note.model");
const UserNotes = require("../../../models/user-notes.model");
const { uploadImages } = require("../../../utils/imagekit");

router.post("/", verifyToken, async (req, res) => {
  try {
    let imageDetails = [];
    //Upload images to imageKit and get imageKit metadata
    if (req.body.images && req.body.images.length > 0) {
      imageDetails = await uploadImages(req.body.images);
    }
    delete req.body.images;

    //Create new note
    const note = new Note({
      _id: new mongoose.Types.ObjectId(),
      userId: req.user.userId,
      ...req.body,
      images: imageDetails,
    });
    await note.save(async (err) => {
      if (err) {
        return res.status(500).send({
          message: err.message,
        });
      }
      try {
        const userNote = await UserNotes.findOneAndUpdate(
          { userId: req.user.userId },
          {
            $push: {
              notes: note._id,
            },
          }
        );

        if (!userNote) {
          const newUserNote = new UserNotes({
            userId: req.user.userId,
            notes: [note._id],
          });
          await newUserNote.save();
        }
      } catch (err) {
        return res.status(500).send({
          message: err.message,
        });
      }
      return res.status(200).send(note);
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
});

router.get("/:noteId", verifyToken, async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).send({
        message: "Note with id does not exist",
      });
    }
    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).send({
        message: "Unauthorized to access data",
      });
    }
    return res.status(200).send(note);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
});

router.patch("/:noteId", verifyToken, async (req, res) => {
  try {
    let imageDetails = [];
    //Upload images to imageKit and get imageKit metadata
    if (req.body.images && req.body.images.length > 0) {
      imageDetails = await uploadImages(req.body.images);
    }
    delete req.body.images;
    const note = await Note.findByIdAndUpdate(req.params.noteId, {
      ...req.body,
      images: imageDetails,
    });
    if (!note) {
      return res.status(404).send({
        message: "Note with id does not exist",
      });
    }
    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).send({
        message: "Unauthorized to access data",
      });
    }
    return res.status(200).send(note);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
});

router.delete("/:noteId", verifyToken, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) {
      return res.status(404).send({
        message: "Note with id does not exist",
      });
    }
    await UserNotes.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $pull: { notes: req.params.noteId },
      }
    );
    return res.status(200).send({
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
});

module.exports = router;
