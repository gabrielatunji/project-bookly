const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/dashboard', passport.authenticate('google'),
    (req, res) => {res.redirect('/dashboard.html');

    }); 

router.get('/facebook', passport.authenticate('facebook'));
  
router.get('/auth/facebook/dashboard', passport.authenticate('facebook', 
    { failureRedirect: '/login' }, {successRedirect: '/dashboard.html'}),
);

module.exports = router;





