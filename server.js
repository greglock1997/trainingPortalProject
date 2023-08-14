// Install required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// Set express to app for quick use
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

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

// Route to serve your React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if ((username === "Me") && (password === "MyPassword")) {
    req.session.user = { username: username}
    req.session.loggedIn = true
    res.json({ success: true})
    console.log(req.session.user);
    console.log(req.session.loggedIn);
    console.log("LOGGED IN")
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed'});
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/check-auth', async (req, res) => {
  const loggedIn = req.session.loggedIn;
  console.log(loggedIn);
  res.send({ loggedIn });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});