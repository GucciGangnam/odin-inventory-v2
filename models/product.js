const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}, { collection: 'Products' }); // Specify the collection name here

// Export the model
module.exports = mongoose.model('Products', productsSchema);