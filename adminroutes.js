const express = require('express'); 
const { inviteadmin, adminsignup } = require('./admincontroller');

const router = express.Router(); 


router.post('/inviteadmin', inviteadmin); 
router.patch('/adminsignup', adminsignup); 





module.exports = router; 