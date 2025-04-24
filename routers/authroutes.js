const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

router.get('/google', passport.authenticate('google',
    { scope: ['profile', 'email'] })
);

// router.get('/auth/google/dashboard', passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));

//router.get('/google/dashboard', passport.authenticate('google')

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {res.redirect('/dashboard.html');})

module.exports = router;





