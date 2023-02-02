const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide your full name."]
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enums: ['Admin', 'User'],
        default: 'Admin'
    }

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)