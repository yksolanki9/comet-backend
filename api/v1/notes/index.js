const express = require("express");
const router = express.Router();
const Note = require("../../../models/note.model");
const verifyToken = require("../../../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.userId,
    }).sort({
      dateOfEntry: -1,
    });

    return res.status(200).send(notes);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
});

module.exports = router;
