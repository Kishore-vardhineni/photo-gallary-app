import {
  Bell,
  Mail,
  Menu,
} from "lucide-react";
import { SideMenubar } from "./SideMenubar";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ setSidebarOpen }) => {
  const { auth, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  // Find current menu item
  const currentPage = SideMenubar.admin.find((item) =>
    location.pathname.startsWith(item.path)
  );

  const title = currentPage?.name || "Admin Panel";


  const logoutFunc = () => {
    logout();
    navigate("/");
    setDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex itmes-center justify-between px-4 sm:px-6 lg:px-8 h-16">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <h2 className="text-lg font-semibold">
            {title}
          </h2>
        </div>

        {/* Center */}
        {/* <div className="hidden md:block w-96">

          <input
            className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none"
            placeholder="Search anything..."
          />

        </div> */}

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* <input
            type="text"
            placeholder="Search anything..."
            className="px-4 py-2 rounded-full bg-gray-200 outline-none"
          /> */}

          <Bell className="cursor-pointer" />

          <Mail className="cursor-pointer" />

          {/* <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full"
            alt=""
          /> */}

              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <img
                      src="https://i.pravatar.cc/150?img=3"
                      alt="profile"
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                  </div>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-xl p-4">

                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="profile"
                          className="w-12 h-12 rounded-full"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-800 truncate">
                            {auth?.username}
                          </h3>

                          <p className="text-gray-500 text-sm break-all sm:truncate">
                            {auth?.email}
                          </p>
                        </div>
                      </div>

                      <hr className="mb-4 border-t border-gray-200" />

                      {/* Admin Dashboard */}
                      {auth.role === "admin" && (
                        <NavLink
                          to="admin-dashboard"
                          className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          🏢 Admin Dashboard
                        </NavLink>
                      )}

                      {/* User Dashboard */}
                      {auth.role === "user" && (
                        <NavLink
                          to="/user-dashboard"
                          className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          📁 User Dashboard
                        </NavLink>
                      )}
                      <hr className="my-4" />

                      <div>
                        <button onClick={logoutFunc} className="text-red-500 py-2 px-2 rounded-lg hover:bg-red-50 cursor-pointer transition">
                          Logout
                        </button>
                      </div>

                    </div>
                  )}
                </div>

              </div>

            </div>
          
        </div>

    </header>

  )
}

export default Topbar