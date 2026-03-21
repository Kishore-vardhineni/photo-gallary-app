import { useEffect, useState } from "react";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getAllUsers } from "../services/authService";
import toast from "react-hot-toast";
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

        <div className="p-4 lg:p-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold">All Users</h2>

                <div className="flex gap-2">
                     <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                </div>
            </div>

            {/* Breadcrumb */}
            <div class="px-8 py-4 text-sm text-gray-600">

                <span class="text-blue-500 cursor-pointer">Users</span>
                <span class="mx-2">/</span>

            </div>



            {/* ========================= */}
            {/* ✅ Desktop TABLE VIEW */}
            {/* ========================= */}
            <div className="hidden lg:block bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-gray-500 text-sm">
                            <th className="p-4">Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filterdUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3">
                                   <img
                                        src="https://i.pravatar.cc/150?img=3"
                                        alt={user.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-medium">{user.name}</p>
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
            </div>

            {/* ========================= */}
            {/* ✅ Tablet + Mobile CARD VIEW */}
            {/* ========================= */}
            <div className="lg:hidden space-y-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-xl p-4 shadow"
                    >
                        <div className="flex items-center gap-4">

                            {/* Avatar */}
                            <img
                                src="https://i.pravatar.cc/150?img=3"
                                alt={user.username}
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                {/* Email */}
                                <p className="text-gray-700 truncate">
                                    {user.email}
                                </p>

                                {/* Role */}
                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${user.role === "admin"
                                        ? "bg-red-100 text-red-500"
                                        : "bg-green-100 text-green-600"
                                        }`}
                                >
                                    {user.role}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                                    className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm hover:bg-gray-100"
                                >
                                    <FiEdit size={14} />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                                    className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm hover:bg-gray-100"
                                >
                                    <MdDelete size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default AllUsers