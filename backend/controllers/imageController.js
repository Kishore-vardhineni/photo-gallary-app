const Carousel = require("../models/carouselModel");

const uploadCarousel = async (req, res) => {
    try {
        const files = req.files; // ✅ correct
        const { imagetitle, category } = req.body; // ✅ match frontend

        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imagePaths = files.map(file => file.filename);

        const savedImage = await Carousel.create({
            title: imagetitle,
            category: category,
            images: imagePaths
        });

        res.status(200).json({
            message: "Images uploaded successfully",
            savedImage
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
};

const getCarousel = async (req, res) => {
    try {
        const images = await Carousel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Images fetched successfully",
            images
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch images" });
    }
};

module.exports = { uploadCarousel, getCarousel }

