const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cors = require("cors");
const dns = require('dns');
const passport = require('passport');
require("./config/passport");
const session = require("express-session");
dotenv.config();

// Force IPv4 if needed (optional) and use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const app = express();
app.use(cors({
  origin: "https://13.127.122.73.nip.io",
  credentials: true
}));
app.use(express.json());


app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Backend server is running");
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/files", fileRoutes);
app.use('/api/images', imageRoutes);

const connect = async () => {
   try {
     await mongoose.connect(process.env.MONGO_URI)
     console.log("database connected");
   } catch (error) {
      console.error("Database connection failed:", error.message);
   }
   
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   connect();
  console.log(`Server is running on port ${PORT}`);
});
