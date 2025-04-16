const mongoose = require('mongoose'); 

const userModel = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    location: {type: String, required: true}, 
    savingAmount: {type: String}, 
    totalSavings: {type: String}, 
    image: {type: String}, 
    savedItems: {type: String},
     

}); 

module.exports = mongoose.model('user', userModel); 