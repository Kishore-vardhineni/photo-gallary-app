const mongoose = require("mongoose");
const User = require("../models/userModel");

const fileSchema = new mongoose.Schema({
    userId: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // ✅ FIXED (string name of model)
        required: true
    },
    key: {
        type: String,
        required: true
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