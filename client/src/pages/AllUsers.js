import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getAllUsers, getDeleteByUserId, getDownloadUsersCSV } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeletePopupUser from "./DeletePopupUser";

const AllUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await getAllUsers();
                console.log("data", data.users)
                setUsers(data.users);
            } catch (error) {
                if (error.response?.data?.message) {
                    toast.error(error.response?.data?.message);
                }
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const filterdUsers = users.filter((user) =>
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()) ||
        user.createdAt.toLowerCase().includes(search.toLocaleLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const currentUsers = filterdUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    )

    const totalPages = Math.ceil(filterdUsers.length / usersPerPage);

    const handleDeleteConfirm = async () => {
        try {
            const response = await getDeleteByUserId(selectedUserId);
            toast.success(response.data.message);
            setUsers((prev) =>
                prev.filter((u) => u._id !== selectedUserId)
            );

            setShowModal(false);

            setSelectedUserId(null);
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    const downloadUsersCsv = async () => {
    try {
        const response = await getDownloadUsersCSV(search);

        // Create file URL
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        // Create temporary link
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.csv");

        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success("CSV downloaded successfully");
    } catch (error) {
        toast.error("Failed to download CSV");
    }
};

    return (

        <div className="p-4 lg:p-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                {/* LEFT: Title */}
                <h2 className="text-xl md:text-2xl font-semibold">
                    All Users
                </h2>

                {/* RIGHT: Search + Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                    {/* Buttons */}
                    <div className="flex gap-2 w-full sm:w-auto">

                        <button
                            
                            className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg whitespace-nowrap"
                        >
                            Download Excel
                        </button>

                        <button
                            onClick={downloadUsersCsv}
                            className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
                        >
                            Download CSV
                        </button>

                    </div>
                    <div class="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Search Icon */}
                        <svg
                            class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </div>

                </div>

            </div>

            {/* Breadcrumb */}
            <div class="px-8 py-4 text-sm text-gray-600">

                <span class="text-blue-500 cursor-pointer">Users</span>
                <span class="mx-2">/</span>

            </div>



            {/* ✅ Desktop TABLE VIEW */}
            <div className="hidden lg:block bg-white rounded-xl shadow">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-gray-500 text-sm">
                            <th className="p-4">Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3">
                                    <img
                                        src={user?.profilePic || "https://i.pravatar.cc/150?img=3"}
                                        alt="profile"
                                        className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${user?.username}`;
                                        }}
                                    />


                                    <div>
                                        <p className="font-medium">{user.username}</p>
                                        <p className="text-sm text-gray-400">{user.email}</p>
                                    </div>
                                </td>

                                <td>{user.email}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${user.role === "admin"
                                            ? "bg-red-100 text-red-500"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td>{new Date(user.createdAt).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })}</td>

                                <td className="px-6 py-4 flex gap-3">
                                    <button onClick={() => navigate(`/admin/edit-user/${user._id}`)} className="flex items-center gap-1 px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">
                                        <FiEdit size={14} /> Edit
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedUserId(user._id);
                                            setShowModal(true);
                                        }}
                                        className="flex items-center gap-1 px-3 py-1 border rounded-md text-red-500 hover:bg-red-50"
                                    >
                                        <MdDelete size={16} /> Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="hidden lg:flex justify-between items-center mt-6 bg-white px-6 py-4 rounded-xl shadow">

                    <p className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>

                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 boreder rounded-md text-gray-600 hover:ng-gray-100 disabled:opacity-50">Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index} onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-blue-600 text-white" : "border text-gary-600 hover: bg-gray-100"}`}>{index + 1}</button>
                        ))}

                        <button onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage === totalPages} className="px-3 py-1 boreder rounded-md text-gray-600 hover:ng-gray-100 disabled:opacity-50">Next
                        </button>
                    </div>


                </div>
            </div>

            {/* ✅ Tablet + Mobile CARD VIEW */}
            <div className="space-y-4 lg:hidden">
                {filterdUsers.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        No Data Available
                    </p>
                ) : (
                    filterdUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-md"
                        >
                            {/* LEFT */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">

                                <img
                                    src={user?.profilePic || "https://i.pravatar.cc/150?img=3"}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${user?.username}`;
                                    }}
                                />

                                <div className="min-w-0">
                                    <p className="text-gray-800 font-medium truncate">
                                        {user.username}
                                    </p>

                                    <span className="inline-block mt-1 px-3 py-1 text-sm  rounded-full">
                                        {user.email}
                                    </span>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex flex-row sm:items-end text-sm text-gray-600 gap-6">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs w-fit">
                                    {user.role}
                                </span>

                                {/* Created Date */}
                                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                </p>

                            </div>

                            {/* RIGHT BUTTONS */}
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button onClick={() => navigate(`/admin/edit-user/${user._id}`)} className="flex-1 sm:flex-none px-3 py-2 border rounded-lg hover:bg-gray-100">
                                    ✏️ Edit
                                </button>

                                <button onClick={() => {
                                    setSelectedUserId(user._id);
                                    setShowModal(true);
                                }} className="flex-1 sm:flex-none px-3 py-2 border rounded-lg hover:bg-red-100 text-red-500">
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <DeletePopupUser isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleDeleteConfirm} />
        </div>
    )
}

export default AllUsers;