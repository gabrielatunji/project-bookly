const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/usermodel');
require('dotenv').config();

// Configure the Facebook strategy for use by Passport
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/dashboard",
    profileFields: ['id','name', 'emails'],
  },
  async (accessToken, refreshToken, profile, cb)  => {
    try{
      const existingUser = await User.findOne({ facebookId: profile.id });
      // Check if user exists
      if (existingUser) {
        return cb(null, existingUser);
      }

      // If user doesn't exist, create new user
      const newUser = await User.create({
        facebookId: profile.id,
        firstName: profile.name.displayName,
        lastName: profile.name.familyName,
        email: profile.emails && 
        profile.emails[0] ? profile.emails[0].value : null, // Handle cases where no email attached to profile
      });

      return cb(null, newUser);

    }catch (error) {
      return cb(error);
    }
    //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
   //  return cb(err, user);
})); 


// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
}); 

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}); 


module.exports = passport;



