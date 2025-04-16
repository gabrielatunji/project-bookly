const admin = require('./models/adminmodel'); 
const jwt = require('jsonwebtoken'); 
require('dotenv'.config); 


exports.inviteadmin = async (req, res) => {
    const {name, email} = req.body; 
    try{
        const invitedAdmin = new admin({name, email}); 
        const token = jwt.sign(email, process.env.SECRET_KEY, {expiresIn: '30m'}); 
        const signuplink = `http://localhost:${process.env.PORT}/adminsignup/${token}`

        await new admin.save(); 
        res.send(signuplink); 
        res.status(200).json({message: 'Invite link sent'}); 
    }catch{
        console.log({error: 'failed to generate link'}); 
        res.status(500).json({message: 'server error'})
    }
}; 

exports.adminsignup = async (req, res) => {
    const {password} = req.body; 
    try{
        
    }
}
