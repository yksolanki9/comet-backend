const mongoose = require('mongoose');
const { Schema } = mongoose;

const userNotesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }],
});

const UserNotes = new mongoose.model('UserNotes', userNotesSchema);

module.exports = UserNotes;
  