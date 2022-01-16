const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://yashsol:yashsol@comet-notes.gplt8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => console.log('Mongodb connected successfully'));

module.exports = db;
