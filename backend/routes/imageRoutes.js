const express = require('express');
const { uploadCarousel, getCarousel } = require('../controllers/imageController');
const upload = require("../middleware/multerUpload");

const router = express.Router();

router.post('/upload-carousel', upload.array("images", 2), uploadCarousel);
router.get('/get-carousel', getCarousel);

module.exports = router;