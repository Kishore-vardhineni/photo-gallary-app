import {
    FiArrowLeft,
    FiShare2,
    FiInfo,
    FiStar,
    FiTrash2,
    FiMoreVertical,
} from "react-icons/fi";

const ImagePreview = ({ image, onClose }) => {
    return (
        <div>
            <div className="fixed inset-0 bg-black z-50 flex flex-col">

                {/* 🔹 Top Navbar */}
                <div className="flex items-center justify-between p-4 text-white">
                    <FiArrowLeft size={22} onClick={onClose} className="cursor-pointer" />

                    <div className="flex items-center gap-5">
                        <FiShare2 />
                        <FiInfo />
                        <FiStar />
                        <FiTrash2 />
                        <FiMoreVertical />
                    </div>
                </div>

                {/* 🔹 Image Full View */}
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src={image}
                        alt="preview"
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                    />
                </div>

            </div>
        </div>


    )
}

export default ImagePreview