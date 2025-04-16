const mongoose = require('mongoose'); 

const userModel = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    location: {type: String, required: true}, 
    savingAmount: {type: String}, 
    totalSavings: {type: String}, 
    image: {type: String}, 
    savedItems: {type: String},
     

}); 