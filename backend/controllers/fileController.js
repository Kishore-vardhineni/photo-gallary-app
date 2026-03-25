const s3 = require("../middleware/s3Upload");
const dotenv = require('dotenv');
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const File = require("../models/fileModel");

dotenv.config();

const fileUpload = async (req, res) => {
  try {
    const file = req.file;
    const { title, category, author, status } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const key = `${req.user.id}/${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));
    const fileUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/${params.Key}`;

    const savedFile = await File.create({
      userId: req.user.id,
      title,
      category,
      author,
      status: status || "Published",
      uploadDate: new Date(),
      size: file.size,
      fileType: file.mimetype,
      key,
      url: fileUrl
    });

    res.status(200).json({
      message: "File uploaded successfully",
      savedFile,
    });

  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
}

const getMyFiles = async (req, res) => {
  try {

    if (req.user.role === 'admin') {
      // ✅ Admin → get ALL files
      files = await File.find().sort({ createdAt: -1 });

    } else {
      // ✅ Normal user → only their files
      files = await File.find({ userId: req.user.id })
        .sort({ createdAt: -1 });
    }

    if (!files) {
      return res.status(404).json({ message: "No files found" });
    }

    //  if(files[0].userId.toString() !== req.user.id) {
    //    return res.status(403).json({ message: "Unauthorized access" });
    //  }

    const filesWithUrls = await Promise.all(
      files.map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: file.key,
        });

        const signedUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        return {
          _id: file._id,
          url: signedUrl,
          userid: file._userid,
          title: file.title,
          category: file.category,
          author: file.author,
          key: file.key,
          uploadDate: file.uploadDate,
          size: file.size,
          status: file.status,
          fileType: file.mimetype,
          createdAt: file.createdAt
        };
      })
    );

    console.log("Files with", filesWithUrls);

    res.status(200).json({ message: "Getting the files", filedetails: filesWithUrls });
  } catch (err) {
    res.status(500).json({ message: "Error generating URL" });
  }
}

const getTotalPhotos = async (req, res) => {
  try {
    const count = await File.countDocuments()
    res.status(200).json({ totalPhotosData: count });
  } catch (err) {
     res.status(500).json({ message: "Error generating URL" });
  }
}

const getPhotoFindById = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      // ✅ Admin → get ALL files
      files = await File.find().sort({ createdAt: -1 });

    } else {
      // ✅ Normal user → only their files
      files = await File.find({ userId: req.user.id }).sort({ createdAt: -1 });
    }

    if (!files || files.length === 0) {
      return res.status(200).json({ message: "No files found" });
    }

    if (files[0].userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const filesWithUrls = await Promise.all(
      files.map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: file.key,
        });

        const signedUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        return {
          _id: file._id,
          url: signedUrl,
          userid: file._userid,
          title: file.title,
          category: file.category,
          author: file.author,
          key: file.key,
          uploadDate: file.uploadDate,
          size: file.size,
          status: file.status,
          fileType: file.mimetype,
          createdAt: file.createdAt
        };
      })
    );

    console.log("Files with", filesWithUrls);

    res.status(200).json({ message: "Getting the files", filedetails: filesWithUrls });

  } catch (err) {

  }
}

module.exports = { fileUpload, getMyFiles, getTotalPhotos, getPhotoFindById };
