const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  content: String,
  images: [String]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;