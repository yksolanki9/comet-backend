const express = require('express');
require('dotenv').config();
require('./mongoose');
const Note = require('./models/note.model');


const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use('/api/v1', require('./api/v1'));


// So the issue that Note is working here, but is undefined inside Note/Notes routes
// Need to figure out the reason for the same

app.get('/', async (req, res) => {
  console.log(await Note.find());
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});