// Install required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

// Database models
const User = require('./server/models/User.js');

// Set express to app for quick use
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use express-session middleware
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: false
}));

// Inlcude body parser
app.use(express.json());

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname));

// Login post route
app.post('/login', async (req, res) => {
  // Extract user data from login form
  const { username, password } = req.body;

  try {
    // Find user in database
    const user = await User.findOne({ username });

    // If no user is found, send a message back to the login page
    if(!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check that password input matches with the encrypted password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password does not match the one found in the database send message
    if(!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Test to use cookies to store user session data
    res.cookie('user', username, { maxAge: 3600000, httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch(error) {
    console.error('Error during login: ', error);
    res.status(500).json({ message: 'An error occurred'});
  }

  console.log(req.cookies.user);
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('user');
  console.log("User logged out")
  console.log(req.cookies.user);
  res.json({ message: 'Logout successful' });
})

// Check to see if user is logged in
app.get('/check-auth', (req, res) => {
  //const isLoggedIn = req.session.user ? true : false;
  const isLoggedIn = !!req.cookies.user;
  console.log("Checking authorisation");
  res.json({ isLoggedIn });
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check to see if user is already present in database
  const registeredUser = await User.findOne({ username });

  if (registeredUser) {
    return await res.status(409).json({ message: 'User already registered' });
  }

  try {
    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch(error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Save data
app.post('/save-data', async (req, res) => {
  console.log("Saved");
})

// Route to serve your React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for testing
module.exports = app;