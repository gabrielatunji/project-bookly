const express = require('express'); 
const router = express.Router(); 
const { inviteadmin, adminsignup, adminlogin, adminuploadproduct } = require('../controllers/admincontroller');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post('/invite_admin', inviteadmin); 
router.patch('/admin_signup', adminsignup); 
router.post('/admin_login', adminlogin); 
router.post('/upload_product', upload.single('productImage'), adminuploadproduct); 





module.exports = router;