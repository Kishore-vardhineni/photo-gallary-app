import { useEffect, useState } from "react";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getAllUsers } from "../services/authService";
import toast from "react-hot-toast";
import Topbar from "../components/Sidebar/Topbar";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await getAllUsers();
                console.log("data", data.users)
                setUsers(data.users);
            } catch (error) {
                console.log(error);
                toast.error(error.response);
            }
        };

        fetchUsers();
    }, []);


    const filterdUsers = users.filter((user) =>
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Topbar */}
            <Topbar />

            <div class="flex items-center justify-between px-8 py-4 bg-gray-100 border-b">

                {/* Left Title */}
                <h1 class="text-xl font-semibold text-gray-800">
                    All Users
                </h1>

                {/* Right Section */}
                <div class="flex items-center gap-4">

                    {/* Search */}
                    <div class="relative">
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Save Button */}
                   <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
                        Search
                    </button>

                </div>
            </div>

            {/* Breadcrumb */}
            <div class="px-8 py-4 text-sm text-gray-600">

                <span class="text-blue-500 cursor-pointer">Users</span>
                <span class="mx-2">/</span>

            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

                <table className="w-full text-left">

                    {/* Table Header */}
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-gray-600 font-semibold">Name</th>
                            <th className="px-6 py-4 text-gray-600 font-semibold">Email</th>
                            <th className="px-6 py-4 text-gray-600 font-semibold">Role</th>
                            <th className="px-6 py-4 text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {filterdUsers.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50 transition">

                                {/* Name + Image */}
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <img
                                        src="https://i.pravatar.cc/150?img=3"
                                        alt={user.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate max-w-[200px]">
                                            {user.email}
                                        </p>
                                    </div>
                                </td>

                                {/* Email Column */}
                                <td className="px-6 py-4 text-gray-600">
                                    {user.email}
                                </td>

                                {/* Role Badge */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full font-medium ${user.role === "admin"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 flex gap-3">
                                    <button onClick={() => navigate(`/admin/edit-user/${user._id}`)} className="flex items-center gap-1 px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">
                                        <FiEdit size={14} /> Edit
                                    </button>

                                    <button className="flex items-center gap-1 px-3 py-1 border rounded-md text-red-500 hover:bg-red-50">
                                        <MdDelete size={16} /> Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4">
                    <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                            1
                        </button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                            2
                        </button>
                        <span>...</span>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                            10
                        </button>
                    </div>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Next
                    </button>
                </div>


            </div>
        </div>
    )
}

export default AllUsers