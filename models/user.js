const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 30
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer',
        enum: ['customer', 'admin']
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);