const express = require('express'); 
const router = express.Router(); 
const { usersignup, userlogin, saveItems } = require("../controllers/usercontroller");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post('/user_signup', usersignup); 
router.post('/user_login', userlogin); 
router.post('/save_items', upload.single('image'), saveItems)


module.exports = router; 