const mongoose = require('mongoose'); 

const adminModel = new mongoose.Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true, unique: true}, 
    password: {type: String},
    role: {
        type: String,
        enum: ['super_admin, admin'], 
        default: 'admin', required: true} 
}, 

{timestamps: true}

); 


module.exports = mongoose.model('admin', adminModel); 