// Install required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

// Config file
const config = require('./config');

// Database models
const User = require('./server/models/User.js');
const UserData = require('./server/models/UserData.js');

// Set express to app for quick use
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());

// Connect to the MongoDB database
/*
mongoose.connect('mongodb://localhost:27017/testDataBase01', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/

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

// Check to see if user is logged in as admin
app.get('/check-admin', async (req, res) => {
  const username = req.cookies.user;

  try {
    // First, find current user
    const currentUser = await User.findOne({ username });
    if (currentUser) {
      if (currentUser.admin) {
        console.log("Admin");
        res.json({ isAdmin: true});
      } else {
        console.log("User")
        res.json({ isAdmin: false});
      }
    } else {
      console.log("User not found");
      res.json({ isAdmin: false });
    }
  } catch (error) {
    console.error('Error checking admin status: ', error);
  }
})

// Email authentification
app.post('/signup-email', async (req, res) => {
    // Create transporter using outlook
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });

    // Extract info
    const { email, confirmationCode } = req.body;

    // Send confirmation email
    const mailOptions = {
      from: 'greglock1997@outlook.com',
      to: email,
      subject: 'Signup Confirmation Code',
      text: confirmationCode.toString()
    }

    await transporter.sendMail(mailOptions);
});

// Reset password email 
app.post('/reset-password-email', async (req, res) => {
  // Create transporter using outlook
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });

  // Extract info
  const { email, confirmationCode } = req.body;

  // Send confirmation email
  const mailOptions = {
    from: 'greglock1997@outlook.com',
    to: email,
    subject: 'Reset Password Code',
    text: confirmationCode.toString()
  }

  await transporter.sendMail(mailOptions);
});

// Check user is already registered
app.post('/check-user', async (req, res) => {
  const { username } = await req.body;

  // Find user in database
  const registeredUser = await User.findOne({ username });

  if (registeredUser) {
    res.json({ status: 409});
  } else {
    res.json({ status: 200});
  }
});

// Check username
app.get('/check-username', async (req, res) => {
  const username = await req.cookies.user;
  res.json({ username });
})

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = await req.body;

  // Find user
  const registeredUser = await User.findOne({ username: email });

  // Hash password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  registeredUser.password = hashedPassword;
  await registeredUser.save();
})

// Register route
app.post('/register-user', async (req, res) => {
  const { username, password } = req.body;

  //  Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  // Create blank user data
  const newUserData = new UserData({ username, unitsCompleted: [] });
  await newUserData.save();

  res.json({status: 200, message: 'User registered successfully' });
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
  const userAnswerData = req.body.correctlyAnsweredQuestions;

  const userData = await UserData.findOne({ username });
  
  console.log("correctlyAnsweredQuestions", req.body.correctlyAnsweredQuestions);
  console.log("Answer Data", userAnswerData);

  const isCompleted = userData.unitsCompleted.some(
    unit => unit.unitId.toString() === unitNumber
  );

  if (isCompleted) {
    console.log("unit already completed");
  } else {
    userData.unitsCompleted.push({
      unitId: unitNumber,
      completedDate: Date.now(),
      answeredQuestions: userAnswerData
    });
  }

  await userData.save();

  // Check data
  const unitIndex = userData.unitsCompleted.findIndex(
    unit => unit.unitId.toString() === unitNumber
  );
  console.log(userData.unitsCompleted[unitIndex].answeredQuestions);
})

app.get('/get-trainee-data', async (req, res) => {
  const traineeData = await UserData.find({});
  console.log(traineeData);
  res.json({ traineeData });
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