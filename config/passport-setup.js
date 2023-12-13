const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel'); 

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://cse-341-yn7m.onrender.com/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // Check if user already exists in your DB
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have the user
                done(null, currentUser);
            } else {
                // if not, create user in your db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    // other fields as necessary
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id); 
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
