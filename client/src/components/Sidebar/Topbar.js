import {
  Bell,
  Mail,
  Menu,
  X
} from "lucide-react";
import { SideMenubar } from "./SideMenubar";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { auth, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <div className="bg-white p-4 flex justify-between items-center shadow-sm">
      {/* Left */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Right */}
      <div className="flex items-center gap-6">
        <input
          type="text"
          placeholder="Search anything..."
          className="px-4 py-2 rounded-full bg-gray-200 outline-none"
        />

        <Bell className="cursor-pointer" />
        <Mail className="cursor-pointer" />

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
              <span className="font-semibold text-gray-700">
                {auth.username}
              </span>
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
                    to="/admin-dashboard"
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 pb-6 space-y-4">
            <a href="/" className="block text-gray-700 font-medium">
              Home
            </a>
            <a href="/about" className="block text-gray-700 font-medium">
              About Us
            </a>
            <a href="/contact" className="block text-gray-700 font-medium">
              Contact
            </a>

            <div className="border-t pt-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">Kishore</span>
              </div>

              <a href="/admin" className="block py-2">
                Admin Dashboard
              </a>
              <a href="/dashboard" className="block py-2">
                My Dashboard
              </a>
              <button className="text-red-500 font-semibold mt-2">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topbar