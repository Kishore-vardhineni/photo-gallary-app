const User = require("../models/userModel");
const File = require("../models/fileModel");
const s3 = require("../middleware/s3Upload");
const { DeleteObjectsCommand } = require("@aws-sdk/client-s3");

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
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true, runValidators: true, select: "password" }
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
};

const getDeleteByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const files = await File.find({ userId: id });

    const fileKeys = files.map((file) => file.key);

    if (fileKeys.length > 0) {
      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Delete: {
          Objects: fileKeys.map((key) => ({ Key: key })),
        },
      };

      await s3.send(new DeleteObjectsCommand(deleteParams));
    }

    // 4️⃣ Delete files from MongoDB
    await File.deleteMany({ userId: id });

    // 5️⃣ Delete user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    return res.status(200).json({
      success: true,
      message: "User and all files deleted successfully",
    });

  } catch (err) {
    console.error(err); // ✅ IMPORTANT for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

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


module.exports = { getAllUsers, getFindByUserId, getUpdatedByUserId, getDeleteByUserId, getTotalUsers, getRecentUsers };
