const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose; // Export the mongoose instance for use in other parts of your application
