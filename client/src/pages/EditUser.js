import { NavLink } from "react-router-dom"


const EditUser = () => {
    return (
        <div class="bg-gray-100 min-h-screen">

            <div class="flex items-center justify-between px-8 py-4 bg-gray-100 border-b">

                {/* Left Title */}
                <h1 class="text-xl font-semibold text-gray-800">
                    Edit User
                </h1>

                {/* Right Section */}
                <div class="flex items-center gap-4">

                    {/* Search */}
                    <div class="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            class="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                    {/* Save Button */}
                    <button
                        class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
                    >
                        Save Changes
                    </button>

                </div>
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

             <div className="p-6 lg:p-10">
                <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row overflow-hidden">


                    {/* RIGHT CONTENT */}
                    <div className="w-full lg:w-3/4 p-6 sm:p-8">
                        
                    </div>

                </div>
            </div>

        </div>
    )
}

export default EditUser