const mongoose = require('mongoose'); 

const adminModel = new mongoose.Schema({
    name: {type: String}, 
    email: {type: String, required: true, unique: true}, 
    password: {type: String},
    role: {type: String, enum: ['super_admin', 'admin'], default: 'admin'},
    status: {type: String, enum: ['pending', 'active'], default: 'pending'},
    inviteToken: {type: String},
    inviteExpires: {type: Date},
    lastLogin: {type: Date}
}, 

{timestamps: true}

); 

module.exports = mongoose.model('admin', adminModel);