import { useEffect, useState } from "react";
import { getRecentUsers, getTotalPhotos, getTotalUsers } from "../services/authService";
import toast from "react-hot-toast";
import StatCard from "./StatCard";
import RecentUsers from "./RecentUsers";

export default function AdminDashboard() {

  const [totalUsers, setTotalUsers] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await getTotalUsers();
        setTotalUsers(usersRes?.data?.totalUsers);
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      }

      // 👉 Photos API
      try {
        const photosRes = await getTotalPhotos();
        setTotalPhotos(photosRes.data.totalPhotos);
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      }

      // 👉 Recent Users API
      try {
        const resentUsersRes = await getRecentUsers();
        setRecentUsers(resentUsersRes.data.users);
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Content */}
        <main className="p-6 overflow-y-auto space-y-6">
          {/* Stats */}


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            <div className="bg-white rounded-xl shadow p-5">
              <StatCard title="Total Users" value={totalUsers} route="/admin/all-users" />
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <StatCard title="Total Photos" value={totalPhotos} route="/admin/admin-photos" />
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <StatCard title="Categories" value="56" route="/admin/categories" />
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <StatCard title="Monthly Views" value="$8,250" />
            </div>

          </div>


          {/* MIDDLE SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* CHART */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
              <h3 className="text-lg font-semibold mb-4">
                User Growth (Last 6 Months)
              </h3>

              {/* Chart Placeholder */}
              <div className="h-64 bg-gray-100 rounded-lg flex items-end justify-around p-4">
                {[20, 40, 30, 50, 70, 90].map((val, i) => (
                  <div
                    key={i}
                    className="w-6 bg-blue-500 rounded"
                    style={{ height: `${val}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white p-6 rounded-xl shadow">
              <RecentUsers recentUser={recentUsers} />
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