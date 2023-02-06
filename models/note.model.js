const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    content: String,
    images: [
      {
        fileId: String,
        name: String,
        size: Number,
        versionInfo: { id: String, name: String },
        filePath: String,
        url: String,
        fileType: String,
        height: Number,
        width: Number,
        thumbnailUrl: String,
      },
    ],
    dateOfEntry: Date,
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
