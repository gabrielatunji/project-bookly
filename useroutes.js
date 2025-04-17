const express = require('express'); 
const router = express.Router(); 
const { usersignup, userlogin } = require("./usercontroller");


router.post('/user_signup', usersignup); 
router.post('/user_login', userlogin); 


module.exports = router; 