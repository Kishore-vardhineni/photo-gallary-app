const s3 = require("../middleware/s3Upload");
const dotenv = require('dotenv');
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const File = require("../models/fileModel");

dotenv.config();

const fileUpload = async (req, res) => {
  try {
    const file = req.file;

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

    await File.create({
        userId: req.user.id,
        key: key,
        fileType: req.file.mimetype
    })

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl,
    });

  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
}

const getMyFiles = async(req, res) => {
   try {
     
     const files = await File.find({ userId: req.user.id });

     if(!files) {
       return res.status(404).json({ message: "No files found" });
     }

     if(files[0].userId.toString() !== req.user.id) {
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
          fileType: file.fileType,
          url: signedUrl,
        };
      })
    );

     console.log("Files with", filesWithUrls);

     res.status(200).json({ message: "Getting the files", filedetails: filesWithUrls });
     

   } catch (err) {
       res.status(500).json({ message: "Error generating URL" });
   }
}

module.exports = { fileUpload, getMyFiles };
