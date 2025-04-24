const mongoose = require('mongoose'); 

const userModel = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    googleId: {type: String}, 
    location: {type: String}, 
    savingAmount: {type: Number}, 
    totalSavings: {type: String}, 
    image: {type: String}, 
    savedItems: {type: String}, 
}, 

{timestamps: true}

); 

module.exports = mongoose.model('user', userModel); 