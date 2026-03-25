const RecentUsers = ({ recentUser }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Recent Users</h2>

            <div className="space-y-4">
                {recentUser.map((user) => (
                    <div
                        key={user._id}
                        className="flex items-center justify-between"
                    >
                        {/* Left Side */}
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="user"
                                className="w-10 h-10 rounded-full"
                            />

                            <div>
                                <h4 className="font-medium text-gray-900">
                                    {user.username}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Role Badge */}
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-medium
          ${user.role === "admin"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {user.role}
                        </span>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default RecentUsers