import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllPhotos } from "../services/authService";

const AdminPhotos = () => {

    const [photos, setPhotos] = useState([0]);
    const [selected, setSelected] = useState([]);

    const selectAllRef = useRef();

    // Handle Select All
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelected(photos.map((p) => p.id));
        } else {
            setSelected([]);
        }
    };

    // Handle Single Select
    const handleSelectOne = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    // Indeterminate state logic
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAllPhotos();

                console.log("data", res?.data?.filedetails);

                setPhotos(res.data.filedetails);
            } catch (error) {
                if (error.response?.data?.message) {
                    toast.error(error.response?.data?.message);
                }
            }
        };


        // if (selected.length > 0 && selected.length < photos.length) {
        //     selectAllRef.current.indeterminate = true;
        // } else {
        //     selectAllRef.current.indeterminate = false;
        // }
        fetchUsers();
    }, [selected, photos.length]);

    // Bulk Delete Example
    const handleBulkDelete = () => {
        const filtered = photos.filter((photo) => !selected.includes(photo.id));
        setPhotos(filtered);
        setSelected([]);
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">

            {/* Bulk Action Bar */}
            {selected.length > 0 && (
                <div className="mb-4 flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-yellow-700">
                        {selected.length} item(s) selected
                    </span>

                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
                    >
                        Delete Selected
                    </button>
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    + Upload
                </button>
                <button className="border px-4 py-2 rounded-lg text-sm">
                    Manage Categories
                </button>
            </div>





            <div className="w-full">
                {/* Mobile Card View */}
                <div className="block md:hidden">
                    {photos.length === 0 ? (
                        <p className="text-center py-10 text-gray-500">No Data Available</p>
                    ) : (
                        photos.map((photo, index) => (
                            <div key={index} className="bg-white shadow rounded-xl p-4 mb-4">

                                {/* Top Section */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={photo.url}
                                        alt="admin-photo"
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">{photo.title}</p>
                                        <p className="text-xs text-gray-500">{photo.category}</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="mt-3 text-sm text-gray-600 space-y-1">

                                    <p><span className="font-medium">Date:</span> {new Date(photo.uploadDate).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}</p>
                                    <p><span className="font-medium">Size:</span> {photo.size > 1024 * 1024
                                        ? (photo.size / (1024 * 1024)).toFixed(2) + " MB"
                                        : (photo.size / 1024).toFixed(2) + " KB"}
                                    </p>
                                    <p><span className="font-medium">Discription:</span> {photo.description}</p>
                                </div>

                                {/* Status + Actions */}
                                <div className="flex justify-between items-center mt-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                                        {photo.status}
                                    </span>

                                    <div className="flex gap-3">
                                        <Eye size={18} className="cursor-pointer hover:text-blue-600" />
                                        <Pencil size={18} className="cursor-pointer hover:text-green-600" />
                                        <Trash2 size={18} className="cursor-pointer hover:text-red-600" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">

                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-600 border-b">
                                <th className="py-3 px-2">
                                    <input
                                        type="checkbox"
                                        ref={selectAllRef}
                                        onChange={handleSelectAll}
                                        checked={
                                            photos.length > 0 && selected.length === photos.length
                                        }
                                        className="w-4 h-4 accent-yellow-500"
                                    />
                                </th>
                                <th>Preview</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Upload Date</th>
                                <th>Size</th>
                                <th>Description</th>
                                <th>Tags</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {photos.length === 0 ? (
                                <p className="text-center py-10 text-gray-500">No Data Available</p>
                            ) : (
                                photos.map((photo) => (
                                    <tr key={photo._id}
                                        className={`border-b text-sm hover:bg-gray-50 ${selected.includes(photo._id) ? "bg-yellow-50" : ""
                                            }`}>
                                        <td className="py-3 px-2">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(photo._id)}
                                                onChange={() => handleSelectOne(photo._id)}
                                                className="w-4 h-4 accent-yellow-500"
                                            />
                                        </td>

                                        <td>
                                            <img src={photo.url} alt="preview" className="w-10 h-10 rounded" />
                                        </td>
                                        <td>{photo.title}</td>
                                        <td>
                                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                                                {photo.category}
                                            </span>
                                        </td>
                                        <td>{new Date(photo.uploadDate).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}</td>
                                        <td>{photo.size > 1024 * 1024
                                            ? (photo.size / (1024 * 1024)).toFixed(2) + " MB"
                                            : (photo.size / 1024).toFixed(2) + " KB"}</td>
                                        <td>{photo.description}</td>
                                        <td>{photo.tags}</td>
                                        <td>
                                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                                                {photo.status}
                                            </span>
                                        </td>
                                        <td className="flex gap-3">
                                            <Eye size={18} className="cursor-pointer hover:text-blue-600" />
                                            <Pencil size={18} className="cursor-pointer hover:text-green-600" />
                                            <Trash2 size={18} className="cursor-pointer hover:text-red-600" />
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default AdminPhotos;