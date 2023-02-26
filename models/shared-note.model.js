const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const sharedNoteSchema = {
  noteId: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
};

const SharedNote = mongoose.model("SharedNote", sharedNoteSchema);

module.exports = SharedNote;
