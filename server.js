const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const passportSetup = require('./config/passport-setup'); // Import the passport setup
const session = require('express-session');


const port = process.env.PORT || 8080;
const app = express();

app.use(session({
  secret: 'your_secret', // Replace with a real secret from environment variables
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: false, // Set to true if using https
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Required-With, Content-Type, Accept, Z-Key'
   );
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   next();
});
app.use('/', require('./routes'));
  
// Auth Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  // User is logged in, handle accordingly
  res.send('You reached the redirect URI');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});