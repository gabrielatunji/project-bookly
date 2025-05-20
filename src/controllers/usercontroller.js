const User = require('../models/usermodel'); 
const bcrypt = require('bcryptjs'); 
const cloudinary = require('cloudinary').v2
const Product = require('../models/productmodel'); 
const flutterwave = require('../services/flutterwave'); 
const { generatePaymentLink } = require('../services/flutterwave'); 

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
        return res.status(201).json({message: "Signed up Successfully", data: name, email})
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

exports.saveItems = async (req, res) => {
    const {location, savingAmount} = req.body; 
    const filePath = req.file.path; 
    const {_id} = req.query; 
    try{
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY, 
            api_secret: process.env.API_SECRET
        });

        const parent = await User.findOne({_id});  
        const uploadResult = await cloudinary.uploader.upload(filePath,
            { public_id: `image/${parent.name}_${parent.email}`,
              folder: 'Bookly'
           }); 
        const parentSave = await User.findOneAndUpdate({_id}, 
            {location: location, image: uploadResult.secure_url, savingAmount: savingAmount}, 
            {new: true}); 
            return res.status(201).json({message: `You will need to save ${parentSave.savingAmount} towards the item`})
       }catch(error){
           console.log(error);
           res.status(500).json({error: 'upload failed, Items not Saved'})
       };
};


exports.viewItems = async (req, res) => {
    try {
        // Get page number from query params, default to page 1
        const page = req.query.page;
        const limit = 5; // Items per page
        
        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Get total count of items
        const totalItems = await Product.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        // Fetch paginated items
        const items = await Product.find().skip(skip).limit(limit)

        if (!items || items.length === 0) {
            return res.status(404).json({message: 'Products Unavailable right now. Check back!'});
        }

        return res.status(200).json({data: {items, currentPage: page,totalPages},
            pagination: {
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null
            }
        });
    } catch (error) {
        console.error('View items error:', error);
        return res.status(500).json({
            success: false,
            message: "Error Fetching Products",
            error: error.message
        });
    }
};



exports.makePayment = async (req, res) => {
    const { _id } = req.query;

    try {
        const user = await User.find({_id});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.savingAmount <= 0) {
            return res.status(400).json({ message: "No saved items to pay for" });
        }

        const paymentLink = await generatePaymentLink(_id); 
        return res.status(200).json({
            message: "Payment link generated successfully",
            paymentLink
        });
    } catch (error) {
        console.error("Make payment error:", error);
        return res.status(500).json({
            message: "Failed to generate payment link",
            error: error.message
        });
    }
};