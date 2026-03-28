import { useState } from "react";


const AdminUploadPhotos = () => {
    const [category, setCategory] = useState("Carousel Photos");
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles([...e.dataTransfer.files]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleUpload = () => {
        console.log({ title, category, files });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex p-4">

            {/* Card */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
                    Upload Photos
                </h2>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Title</label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Dropdown */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">Select Type</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option>Carousel Photos</option>
                        <option>Featured Photos</option>
                    </select>
                </div>

                {/* Upload Box */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-blue-300 rounded-xl p-6 sm:p-10 text-center mb-6 cursor-pointer hover:bg-blue-50 transition"
                >
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileUpload"
                    />

                    <label htmlFor="fileUpload" className="cursor-pointer block">
                        <div className="text-blue-500 text-4xl mb-2">☁️</div>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Drag & Drop or Click to Upload
                        </p>
                    </label>
                </div>

                {/* File Preview */}
                {files.length > 0 && (
                    <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-2 text-xs text-center truncate"
                            >
                                {file.name}
                            </div>
                        ))}
                    </div>
                )}

                {/* Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleUpload}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition w-full sm:w-auto"
                    >
                        + Upload
                    </button>
                </div>
            </div>
        </div>

    )
}

export default AdminUploadPhotos