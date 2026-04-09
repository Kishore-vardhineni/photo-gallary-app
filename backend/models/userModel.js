const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  profilePic: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
},
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
