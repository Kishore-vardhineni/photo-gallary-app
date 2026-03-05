const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const { fileUpload, getMyFiles } = require("../controllers/fileController");
const router = express.Router();

router.post('/upload', verifyToken, upload.single("file"), fileUpload);
router.get("/get-files", verifyToken, getMyFiles)

module.exports = router;
