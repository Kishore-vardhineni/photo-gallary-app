import { useEffect, useState } from "react";
import Topbar from "../components/Sidebar/Topbar";
import { getTotalUsers } from "../services/authService";
import toast from "react-hot-toast";

export default function AdminDashboard() {

  const [totalUsers, setTotalUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getTotalUsers();
        console.log("data", data)
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.log(error);
        toast.error(error.response);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="p-6 overflow-y-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard title="Total Users" value={totalUsers} />
            <StatCard title="Total Photos" value="3420" />
            <StatCard title="Categories" value="56" />
            <StatCard title="Monthly Views" value="$8,250" />
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Chart */}
            <div className="col-span-2 bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                User Growth (Last 6 Months)
              </h2>

              {/* Fake chart */}
              <div className="h-64 bg-gray-100 rounded-lg flex items-end p-6 gap-4">
                {[100, 300, 250, 350, 550, 780].map((height, i) => (
                  <div
                    key={i}
                    className="bg-blue-500 w-8 rounded-t"
                    style={{ height: `${height / 4}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Users</h2>

              <UserItem name="John Doe" role="Admin" />
              <UserItem name="Emma Smith" role="User" />
              <UserItem name="Michael Lee" role="User" />
              <UserItem name="Sophia Brown" role="User" />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Category Donut */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Photos by Category
              </h2>

              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-orange-400"></div>

              <ul className="mt-4 space-y-2 text-sm">
                <li>Nature (40%)</li>
                <li>Events (25%)</li>
                <li>People (20%)</li>
                <li>Other (15%)</li>
              </ul>
            </div>

            {/* Activity */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

              <ActivityItem text="New user registered" time="2 min ago" />
              <ActivityItem text="5 new photos uploaded" time="1 hour ago" />
              <ActivityItem text="User report received" time="3 hours ago" />
            </div>

            {/* System Status */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">System Status</h2>

              <StatusItem label="Server" status="Online" green />
              <StatusItem label="Database" status="Connected" green />
              <StatusItem label="Storage" status="76% Used" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const UserItem = ({ name, role }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/40"
        alt=""
        className="rounded-full"
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">example@email.com</p>
      </div>
    </div>

    <span
      className={`px-3 py-1 text-xs rounded-full ${role === "Admin"
          ? "bg-green-100 text-green-600"
          : "bg-blue-100 text-blue-600"
        }`}
    >
      {role}
    </span>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div className="mb-3">
    <p className="text-sm">{text}</p>
    <p className="text-xs text-gray-400">{time}</p>
  </div>
);

const StatusItem = ({ label, status, green }) => (
  <div className="flex justify-between mb-3">
    <span>{label}</span>
    <span className={green ? "text-green-600 font-medium" : ""}>
      {status}
    </span>
  </div>
);