const mongoose = require("mongoose");
const User = require("../models/userModel");

const fileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    key: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    location: {
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String
    },
    status: {
        type: String,
        enum: ["Published", "Draft"],
        default: "Published"
    },
    fileType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("File", fileSchema);