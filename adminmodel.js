const mongoose = require('mongoose'); 

const adminModel = mongoose.Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}

}); 

module.exports = mongoose.model('admin', adminModel); 