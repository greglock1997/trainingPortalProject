// Install required packages
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Set express to app for quick use
const app = express();
const port = process.env.PORT || 3000;

// Inlcude body parser
app.use(bodyParser.json());

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

// Test use of api for submitting form data
app.post('/api/submit-form', (req, res) => {
    console.log("Data")
    const formData = req.body;
    console.log(formData);
});

// Route to serve your React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});