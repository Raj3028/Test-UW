//=====================Importing Packages=====================//
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

//=====================Creating Task's Schema=====================//
const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        requires: true
    },

    priority: {
        type: String,
        required: true,
        enum: ["high", "medium", "low"]
    },

    status: {
        type: Boolean,
        default: false
    },

    userId: {
        type: ObjectId,
        ref: "User"
    }

}, { timestamps: true })

//=====================Module Export=====================//
module.exports = mongoose.model("Task", taskSchema)