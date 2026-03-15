import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const AdminPhotos = () => {
    const initialPhotos = [
        {
            title: "Tropical Paradise",
            category: "Nature",
            author: "Mark Smith",
            date: "Apr 25, 2025",
            size: "2.4 MB",
            status: "Published",
        },
        {
            title: "Mountain Sunrise",
            category: "Landscape",
            author: "Sarah J.",
            date: "Apr 24, 2025",
            size: "1.8 MB",
            status: "Published",
        },
        {
            title: "City Lights",
            category: "Urban",
            author: "Alex Brown",
            date: "Apr 22, 2025",
            size: "3.1 MB",
            status: "Draft",
        },
    ];
    const [photos, setPhotos] = useState(initialPhotos);
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
        if (selected.length > 0 && selected.length < photos.length) {
            selectAllRef.current.indeterminate = true;
        } else {
            selectAllRef.current.indeterminate = false;
        }
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


            <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full text-left">

                    {/* Table Head */}
                    <thead>
                        <tr className="border-b text-gray-600 text-sm">
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
                            <th>Author</th>
                            <th>Upload Date</th>
                            <th>Size</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {photos.map((photo) => (
                            <tr
                                key={photo.id}
                                className={`border-b text-sm hover:bg-gray-50 ${selected.includes(photo.id) ? "bg-yellow-50" : ""
                                    }`}
                            >
                                <td className="py-3 px-2">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(photo.id)}
                                        onChange={() => handleSelectOne(photo.id)}
                                        className="w-4 h-4 accent-yellow-500"
                                    />
                                </td>

                                <td>
                                    <img
                                        src="https://picsum.photos/60"
                                        alt="preview"
                                        className="rounded w-14 h-14 object-cover"
                                    />
                                </td>

                                <td className="font-medium">{photo.title}</td>

                                <td>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                        {photo.category}
                                    </span>
                                </td>

                                <td>{photo.author}</td>
                                <td>{photo.date}</td>
                                <td>{photo.size}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${photo.status === "Published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {photo.status}
                                    </span>
                                </td>

                                <td className="flex gap-3">
                                    <Eye size={18} className="cursor-pointer hover:text-blue-600" />
                                    <Pencil size={18} className="cursor-pointer hover:text-green-600" />
                                    <Trash2 size={18} className="cursor-pointer hover:text-red-600" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default AdminPhotos;