import { NavLink, Outlet } from "react-router-dom";
import { Lock, User } from "lucide-react";

const SettingsLayout = () => {
    return (
        <div lass="bg-gray-100 min-h-screen">

            <div class="flex items-center justify-between px-8 py-4 bg-gray-100 border-b">

                {/* Left Title */}
                <h1 class="text-xl font-semibold text-gray-800">
                    Settings
                </h1>
            </div>

            {/* Breadcrumb */}
            <div class="px-8 py-4 text-sm text-gray-600">

                <NavLink
                    to="/admin/all-users"
                    className="text-blue-500 cursor-pointer hover:underline"
                >
                    Settings
                </NavLink>
            </div>
            
            <div className="p-6 lg:p-10">
                <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row overflow-hidden">

                    {/* LEFT MENU */}
                    <div className="w-full lg:w-1/4 border-r p-6 bg-gray-50">
                        <div className="space-y-4">

                            <NavLink
                                to="/settings/profile"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-lg ${isActive
                                        ? "bg-yellow-50 border-l-4 border-yellow-400 font-semibold"
                                        : "text-gray-600"
                                    }`
                                }
                            >
                                <User size={18} />
                                Profile Settings
                            </NavLink>

                            <NavLink
                                to="/settings/change-password"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-lg ${isActive
                                        ? "bg-yellow-50 border-l-4 border-yellow-400 font-semibold"
                                        : "text-gray-600"
                                    }`
                                }
                            >
                                <Lock size={18} />
                                Change Password
                            </NavLink>

                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-full lg:w-3/4 p-6 sm:p-8">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>

    )
}

export default SettingsLayout