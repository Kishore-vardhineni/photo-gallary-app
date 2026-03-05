const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes')

const cors = require("cors");
const dns = require('dns');
// Force IPv4 if needed (optional) and use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Backend server is running");
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

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
