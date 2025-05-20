const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const User = require('../models/usermodel'); 


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
}, 
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists
        const existingUser = await User.findOne({ googleId: profile.id });
        
        if (existingUser) {
            return done(null, existingUser);
        }

        // If user doesn't exist, create new user
        const newUser = await User.create({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName, 
            email: profile.emails[0].value,
        });

        return done(null, newUser);

    } catch (error) {
        return done(error, null);
    }
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



