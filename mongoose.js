const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD } = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@comet-notes.gplt8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => console.log('Mongodb connected successfully'));

module.exports = db;
