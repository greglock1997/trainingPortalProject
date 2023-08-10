const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/trainingPortal-test'; // Replace with your MongoDB URI

// Application crashes when useUnifiedTopology is set to 'true'
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
