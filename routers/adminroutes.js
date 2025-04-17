const express = require('express'); 
const { inviteadmin, adminsignup, adminlogin } = require('./admincontroller');

const router = express.Router(); 


router.post('/invite_admin', inviteadmin); 
router.patch('/admin_signup', adminsignup); 
router.post('/admin_login', adminlogin); 




module.exports = router; 

console.log('Admin routes loaded') 