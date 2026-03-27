const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Carousel", carouselSchema);
