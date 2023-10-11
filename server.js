const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Add a GET route for /signup to render the signup form
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Handle POST requests for /signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/signin'); // Redirect to the signin page
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Add a GET route for /signin to render the signin form
app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/public/signin.html');
});

// Handle POST requests for /signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send('Invalid email or password');
      return;
    }

    // Compare the hashed password
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      req.session.userId = user._id; // Store user ID in session
      res.redirect('/profile'); // Redirect to the profile page
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error signing in');
  }
});

// Add a GET route for /profile to render the profile page
app.get('/profile', async (req, res) => {
  try {
    // Check if the user is authenticated (assuming you store the user's ID in the session)
    if (!req.session.userId) {
      res.redirect('/signin'); // Redirect to the signin page if not authenticated
      return;
    }

    // Retrieve the user's data from the MongoDB database based on the session ID
    const user = await User.findById(req.session.userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Render the profile page and pass user data to it
    res.sendFile(__dirname + '/public/profile.html', { user }); // Pass user data to the template
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user data');
  }
});

// Add a POST route for /signout to log the user out
app.post('/signout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error signing out');
    } else {
      res.redirect('/signin'); // Redirect to the signin page after signing out
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
