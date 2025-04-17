const User = require('../models/usermodel'); 
const bcrypt = require('bcryptjs'); 

exports.usersignup = async (req, res) => {
    const {name, email, password} = req.body; 
    try{
        if(!email || !password){
            return res.status(400).json({message: "Input your Login Credentials"})
        }
        const existingUser = await User.findOne({email})
         if(existingUser){
            return res.status(403).json({message: "User already exists"})
            }
            const hashedPassword = await bcrypt.hash(password, 10); 
            const newUser = new User({name, email, password: hashedPassword})
            await newUser.save(); 
        return res.status(200).json({message: "Signed up Successfully", data: name, email})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
}; 

exports.userlogin = async (req, res) => {
    const {email, password} = req.body; 
    try{
        if(!email || !password){
            return res.status(400).json({message: "Input Login Credentials"})
        }
        const user = await User.findOne({email})
            if(!user){
            return res.status(404).json({message: "User does not exist"})
            }
            const passMatch = await bcrypt.compare(password, user.password)
              if(!passMatch){
               return res.status(400).json({message: "Invalid Credentials"})
            }
        return res.status(200).json({message: "User Logged In Successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Server Error"})
    }
}; 