const mongoose = require('mongoose'); 

const productModel = new mongoose.Schema({
    productName: {type: String, required: true}, 
    productAmount: {type: String}, 
    productImage: {type: String},
}); 

module.exports = mongoose.model('product', productModel)