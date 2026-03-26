import { Upload, MapPin, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getUplaodFile } from "../services/authService";

const AddUserPhoto = () => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        tags: "",
        location: ""
    });
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [progress, setProgress] = useState(0)
    const inputRef = useRef();

    useEffect(() => {
       return () => {
         if(preview) URL.revokeObjectURL(preview)
       }
    }, [preview]);

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(selectedFile.type)) {
            toast.error("Only JPG, PNG, WEBP allowed");
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            toast.error("File must be less than 5MB");
            return;
        }

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setProgress(0);
    };

    const handleSubmit = async () => {
        if (uploading) return; 
        if (!file) return toast.error("Please upload an image");

        if (!form.title || !form.description || !form.category) {
            return toast.error("Please fill all required fields");
        }

        const formData = new FormData();
        Object.keys(form).forEach((key) => formData.append(key, form[key]));
        formData.append("file", file);

        try {
            setUploading(true);
            setProgress(0);

            const response = await getUplaodFile(formData, (percent) => {
                setProgress(percent);
            });

            toast.success(response.data.message);

            // reset form
            setForm({
                title: "",
                description: "",
                category: "",
                tags: "",
                location: "",
            });
            setFile(null);
            setPreview("");
            setProgress(0);
        } catch (error) {
            toast.error(error.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        handleFile(e.target.files[0]);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0]
        handleFile(droppedFile)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold">Add / Edit Photo</h1>
                    <p className="text-gray-500 text-sm">Photos &gt; Add New Photo</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
                        Cancel
                    </button>
                    <button disabled={uploading}
                        onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg">
                        <Upload size={16} /> 
                        {uploading ? "Uploading..." : "Upload Photo"}
                    </button>
                </div>
            </div>

            {/* Main Container */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* LEFT SIDE */}
                    <div>
                        <h2 className="font-semibold mb-4">Photo Details</h2>

                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Photo Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter photo title"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => {
                                    setForm({ ...form, title: e.target.value })
                                }}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                placeholder="Enter description (min 10 characters)"
                                className="w-full border rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => {
                                    setForm({ ...form, description: e.target.value })
                                }}
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Provide a brief description of the photo.
                            </p>
                        </div>

                        {/* Category + Tags */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select className="w-full border rounded-lg px-3 py-2"
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                    <option value="">Select category</option>
                                    <option value="nature">Nature</option>
                                    <option value="travel">Travel</option>
                                    <option value="city">City</option>
                                    <option value="wildlife">Wildlife</option>
                                    <option value="food">Food</option>
                                    <option value="people">People</option>
                                    <option value="technology">Technology</option>
                                    <option value="sports">Sports</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="architecture">Architecture</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter tags separated by comma"
                                    className="w-full border rounded-lg px-3 py-2"
                                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Location
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter location (e.g. New York)"
                                    className="w-full border rounded-lg px-3 py-2 pr-10"
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                />
                                <MapPin
                                    size={18}
                                    className="absolute right-3 top-2.5 text-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        <h2 className="font-semibold mb-4">
                            Upload Photo <span className="text-red-500">*</span>
                        </h2>

                        {/* Upload Box */}
                        <div onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className="border-2 border-dashed rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition">
                            <div className="flex justify-center mb-3">
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            </div>
                            <p className="text-gray-600 mb-2">
                                Drag & Drop your image here
                            </p>

                            <button onClick={() => inputRef.current.click()} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                                Browse Files
                            </button>

                            <p className="text-xs text-gray-400 mt-2">
                                Supports: JPG, PNG, WEBP (Max 5MB)
                            </p>

                            <input type="file" ref={inputRef} onChange={handleChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
                        </div>

                        {/* Uploaded File */}
                        {file && (
                            <div className="mt-4 border rounded-lg p-3 flex items-center gap-3">
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-16 h-12 object-cover rounded-md"
                                />

                                <div className="flex-1">
                                    <p className="text-sm font-medium">
                                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>

                                    <div className="w-full bg-gray-200 h-2 rounded mt-1">
                                        <div className="bg-green-500 h-2 rounded transition-all" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>

                                <Trash2
                                    className="text-gray-400 cursor-pointer" size={18}
                                    onClick={() => {
                                        setFile(null);
                                        setPreview("");
                                        setProgress(0);
                                    }} />
                            </div>
                        )}


                        <p className="text-xs text-gray-400 mt-2">
                            Supports: JPG, PNG, WEBP (Max file size: 5MB)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUserPhoto