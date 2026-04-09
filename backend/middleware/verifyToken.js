const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {
  
    try {
      const authHeader = req.headers['authorization'];

      if(!authHeader || !authHeader.startsWith("Bearer ")) {
         return res.status(401).json({ message: "Access denied, no token provided" });
      }

      const token = authHeader.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const user = await User.findById(decode.id);

      if(!user) {
         return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();

    } catch (error) {
       if(error.name === "TokenExpiredError") {
         return res.status(401).json("token expired");
      }
      return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = verifyToken;