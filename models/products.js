const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('product', productSchema);