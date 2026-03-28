import { useEffect, useState } from "react";
import img1 from "../../assets/images/sriramnavami.png";
import img2 from "../../assets/images/carousel1.jpg";
import img3 from "../../assets/images/carousel3.jpg";
import img4 from "../../assets/images/carousel4.jpg";

const images = [img1, img2, img3, img4];

const Carousel = () => {
    const [current, setCurrent] = useState(0);


    // Auto slide
    useEffect(() => {
        const intervel = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervel);
    }, [])

    // Next
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    }

    // Previous
    const prevSlide = () => {
        setCurrent((prev) => (prev - 1) % images.length);
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">

            {/* Images */}
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt="carousel"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
      ${index === current ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
            >
                ❮
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
            >
                ❯
            </button>

            {/* Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer 
            ${current === index ? "bg-white" : "bg-gray-400"}`}
                    />
                ))}
            </div>
        </div>
    )

}

export default Carousel;
