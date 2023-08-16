// Install required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./server/models/User.js');

// Set express to app for quick use
const app = express();
const port = process.env.PORT || 3000;

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

// Login post test route
app.post('/login', async (req, res) => {
  req.session.user = req.body.username;
  req.session.isLoggedIn = true;
  res.status(200).send();
});

app.post('/logout', (req, res) => {
  console.log(req.session.user);
  req.session.destroy();
  res.json({ message: 'Logout successful' });
  console.log("Logging out")
})

app.get('/checkIsLoggedIn', (req, res) => {
  const isLoggedIn = req.session.user ? true : false;
  res.json({ isLoggedIn });
});

// Register test route
app.post('/register', (req, res) => {
  console.log("Request received");
});

// Route to serve your React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for testing
module.exports = app;