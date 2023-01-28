//=====================Importing Packages=====================//
const mongoose = require('mongoose')

//=====================Creating User's Schema=====================//
const userModel = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLen: 8,
        maxLen: 15,
        trim: true
    }

}, { timestamps: true })

//=====================Module Export=====================//
module.exports = mongoose.model('User', userModel)