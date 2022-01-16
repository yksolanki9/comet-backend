const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  images: [String]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;