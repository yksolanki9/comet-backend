const express = require('express');
require('dotenv').config();
require('./mongoose');

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use('/api/v1', require('./api/v1'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});