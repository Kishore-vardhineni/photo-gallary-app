import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { getFindByUserId, getupdatedByUserid } from "../services/authService";
import toast from "react-hot-toast";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "",
        profilePic: ""
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getFindByUserId(id);
                const user = res.data.findUser;

                setFormData({
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    profilePic: user.profilePic
                })
            } catch (error) {
                if (error.response?.data?.message) {
                    toast.error(error.response?.data?.message);
                }
            }
        }
        fetchUser()
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const resData = await getupdatedByUserid(id, formData);
           toast.success(resData.data.message);
           navigate("/admin/all-users");
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Header */}

            <div class="flex items-center justify-between px-8 py-4 bg-gray-100 border-b">

                {/* Left Title */}
                <h1 class="text-xl font-semibold text-gray-800">
                    Edit User
                </h1>
            </div>

            {/* Breadcrumb */}
            <div class="px-8 py-4 text-sm text-gray-600">

                <NavLink
                    to="/admin/all-users"
                    className="text-blue-500 cursor-pointer hover:underline"
                >
                    Users
                </NavLink>
                <span class="mx-2">/</span>
                <span>Edit User</span>

            </div>

            {/* Main Card */}
            <div className="p-4 sm:p-6 lg:p-3 flex justify-center">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">

                    {/* Profile Section */}
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src={formData.profilePic || "https://i.pravatar.cc/150?img=3"}
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${formData.username}`;
                            }}
                        />
                        <button className="mt-2 text-sm text-blue-600 hover:underline">
                            Change Photo
                        </button>
                    </div>

                    {/* Form */}
                    <div className="w-full max-w-2xl mx-auto space-y-5">

                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>

                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 mt-8">
                                <button type="button" onClick={() => navigate(`/admin/all-users`)} className="w-full sm:w-auto px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100">
                                    Cancel
                                </button>
                                <button type="submit" className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                    Save Changes
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default EditUser