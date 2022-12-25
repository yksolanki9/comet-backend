const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const auth = require('./middleware/auth');
const cors = require('cors');

require('dotenv').config();
require('./config/mongoose');

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/api/v1', auth, require('./api/v1'));

app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send('All inputs are mandatory');
    }

    // Check if user already exists
    if (await User.findOne({email})) {
      return res.status(409).send('User with entered email already exists');
    }

    // Generate pwd hash with 10 saltRounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object and save it
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword
    });
    const savedUser = await newUser.save();

    const accessToken = jwt.sign({
      userId: savedUser._id,
      email
    }, process.env.TOKEN_SECRET, {
      expiresIn: '1h'
    });

    return res.status(201).send({
      message: 'User registered successfully',
      userId: savedUser._id,
      email,
      access_token: accessToken
    });
  } catch(err) {
    console.log(err);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send('All inputs are mandatory');
  }

  //Check if user is registered
  const user = await User.findOne({email});
  if(!user) {
    return res.status(401).send('No user exists with the entered email');
  }

  //Check if password is correct
  if(!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Incorrect password');
  };

  const accessToken = jwt.sign({
    userId: user._id,
    email
  }, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  });

  return res.status(200).send({
    message: 'Logged in successfully',
    userId: user._id,
    email,
    access_token: accessToken
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});