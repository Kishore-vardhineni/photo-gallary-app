const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    res.status(200).json({
      sucess: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getFindByUserId = async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id, {}, { password: 0 });

    res.status(200).json({
      sucess: true,
      count: findUser.length,
      findUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUpdatedByUserId = async (req, res) => {
  const { id } = req.params;

  if (req.user.id === id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true, runValidators: true, projection: { password: 0 } }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        updatedUser,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

const deleteByUserId = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(400).json({ message: "User doesnot existing!" });
    } else {
      return res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getTotalUsers = async (req, res) => {
  try {
    const count = await User.countDocuments()
      return res.status(200).json({ totalUsers: count });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .select("username email role");

    res.status(200).json({
      success: true,
      users
    });
  } catch (err) {
     res.status(500).json({
      message: err.message
    });
  }
}


module.exports = { getAllUsers, getFindByUserId, getUpdatedByUserId, deleteByUserId, getTotalUsers, getRecentUsers };
