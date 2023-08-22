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
const UserData = require('./server/models/UserData.js');

// Set express to app for quick use
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/testDataBase01', {
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
      return res.json({status: 401, message: 'Invalid credentials' });
    }

    // Check that password input matches with the encrypted password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password does not match the one found in the database send message
    if(!isPasswordValid) {
      return res.json({ status: 401, message: 'Invalid credentials' });
    }

    // Test to use cookies to store user session data
    res.cookie('user', username, { maxAge: 3600000, httpOnly: true });
    res.json({status: 200, message: 'Login successful' });
  } catch(error) {
    console.error('Error during login: ', error);
    res.json({status: 500, message: 'An error occurred'});
  }

  console.log(req.cookies.user);
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.json({ message: 'Logout successful' });
})

// Check to see if user is logged in
app.get('/check-auth', (req, res) => {
  const isLoggedIn = !!req.cookies.user;
  res.json({ isLoggedIn });
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check to see if user is already present in database
  const registeredUser = await User.findOne({ username });

  try {
    if (registeredUser) {
      console.log("user already registered");
      return res.json({ status: 409, message: 'User already registered' });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Create blank user data
    const newUserData = new UserData({ username, unitsCompleted: [] });
    await newUserData.save();

    res.json({status: 200, message: 'User registered successfully' });
  } catch(error) {
    res.json({status: 500, message: 'Error registering user' });
  }
});

// Get unit data
app.get('/get-data', async (req, res) => {
  const username = req.cookies.user;
  const userData = await UserData.findOne({ username });
  console.log(userData);

  if (userData) {
    const completedUnits = await userData.unitsCompleted || [];
    const completedUnitsArray = completedUnits.map(unit => unit.unitId);
    console.log(completedUnitsArray);
    return res.json(completedUnitsArray);
  }
});

// Save data
app.post('/save-data', async (req, res) => {
  const username = req.cookies.user;
  const unitNumber = req.body.unitNumber;

  console.log(unitNumber);

  const userData = await UserData.findOne({ username });

  console.log(userData);
  console.log(userData.unitsCompleted);
  
  const isCompleted = userData.unitsCompleted.some(
    unit => unit.unitId.toString() === unitNumber
  );

  if (isCompleted) {
    console.log("unit already completed");
  } else {
    userData.unitsCompleted.push({
      unitId: unitNumber,
      completedDate: Date.now()
    });
  }

  await userData.save();
  console.log(userData);
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