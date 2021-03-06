const passport = require ('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
    new googleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'

    }, 
    (accessToken, refreshToken, profile, done) => {
       User.findOne({ googleId: profile.id })
        .then(() =>{
          if (existingUser){
            // we already have a record with the given profile ID
            done(null, existingUser);
          }else{
            // we do not have a user record with this ID, make a new record!  
            new User ({ googleId: profile.id })
            .save()
            .then(user => done(null, user));  

          }
        })
         }
      )
    );