const express = require("express");
const router = express.Router();
const Note = require("../../../models/note.model");
const UserNotes = require("../../../models/user-notes.model");
const verifyToken = require("../../../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    await UserNotes.findOne({
      userId: req.user.userId,
    })
      .populate({
        path: "notes",
        options: {
          sort: {
            dateOfEntry: -1,
          },
        },
      })
      .exec((err, userNotes) => {
        if (err) {
          return res.status(500).send("Some issue at backend");
        }
        return res.status(200).send(userNotes);
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
});

module.exports = router;
