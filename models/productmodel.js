const mongoose = require('mongoose'); 

const productModel = new mongoose.Schema({
    productName: {type: String, required: true}, 
    productAmount: {type: Number}, 
    productImage: {type: String},
}); 

module.exports = mongoose.model('product', productModel)