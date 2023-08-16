// Install required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

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
  resave: false,
  saveUninitialized: true
}));

// Inlcude body parser
app.use(express.json());

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname));

// Route to serve your React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for testing
module.exports = app;