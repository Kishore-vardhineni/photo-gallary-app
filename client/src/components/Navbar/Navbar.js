import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/Photo_Gallary_Logo.png";

const Navbar = () => {
  const { auth, login, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-9xl mx-auto px-6 py-4 flex items-center justify-between">


          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                Photo Gallary
              </h1>
              <p className="text-xs text-gray-500">
                Memories And Gifts Of Life
              </p>
            </div>
          </div>


          {/* Desktop Menu */}
          {/* BEFORE LOGIN */}
          <div className="hidden md:flex items-center space-x-8">

            {!auth && (
              <>
                <NavLink to="/" className="hover:text-yellow-500">
                  Home
                </NavLink>

                <NavLink to="/about" className="hover:text-yellow-500">
                  About Us
                </NavLink>

                <NavLink to="/contact" className="hover:text-yellow-500">
                  Contact
                </NavLink>
                <button
                  onClick={login}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-gray-800 transition"
                >
                  <NavLink to="/signin">Signin</NavLink>
                </button>

                <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-gray-800 transition">

                  <NavLink to="/signup">Signup</NavLink>
                </button>
              </>
            )}

            {/* Profile Section */}
            {/* AFTER LOGIN */}
            {auth && (
              <>
                {/* User Showing homepage */}
                {auth.role === "user" && (
                  <NavLink to="/" className="hover:text-yellow-500">
                    Home
                  </NavLink>
                )}

                {/* User Showing aboutpage */}
                {auth.role === "user" && (
                  <NavLink to="/about" className="hover:text-yellow-500">
                    About US
                  </NavLink>
                )}

                {/* User Showing contactpage */}
                {auth.role === "user" && (
                  <NavLink to="/contact" className="hover:text-yellow-500">
                    Contact
                  </NavLink>
                )}

                  {/* User Showing contactpage */}
                {auth.role === "user" && (
                  <NavLink to="/user-photos" className="hover:text-yellow-500">
                    UserPhotos
                  </NavLink>
                )}

                <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-gray-800 transition">
                  <NavLink to="/signup">Signup</NavLink>
                </button>

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
                          to="admin/admin-dashboard"
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
              </>

            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 pb-6 space-y-4">
            {!auth && (
              <>
                <NavLink to="/" className="block text-gray-700 font-medium">
                  Home
                </NavLink>

                <NavLink to="/about" className="block text-gray-700 font-medium">
                  About Us
                </NavLink>

                <NavLink to="/contact" className="block text-gray-700 font-medium">
                  Contact
                </NavLink>
                <button
                  onClick={login}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-gray-800 transition block"
                >
                  <NavLink to="/signin">Signin</NavLink>
                </button>

                <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-gray-800 transition">

                  <NavLink to="/signup">Signup</NavLink>
                </button>
              </>
            )}

            <div className="border-t pt-4">
              {auth && (
                <>
                  {/* User Showing homepage */}
                  {auth.role === "user" && (
                    <NavLink to="/" className="block text-gray-700 font-medium hover:text-yellow-500">
                      Home
                    </NavLink>
                  )}

                  {/* User Showing aboutpage */}
                  {auth.role === "user" && (
                    <NavLink to="/about" className="block text-gray-700 font-medium hover:text-yellow-500">
                      About US
                    </NavLink>
                  )}

                  {/* User Showing contactpage */}
                  {auth.role === "user" && (
                    <NavLink to="/contact" className="block text-gray-700 font-medium hover:text-yellow-500">
                      Contact
                    </NavLink>
                  )}

                  {auth.role === "user" && (
                    <NavLink to="/user-photos" className="block text-gray-700 font-medium hover:text-yellow-500">
                      UserPhotos
                    </NavLink>
                  )}

                  <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-gray-800 transition">
                    <NavLink to="/signup">Signup</NavLink>
                  </button>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src="https://i.pravatar.cc/150?img=3"
                      alt="profile"
                      className="w-10 h-10 rounded-full"
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
                  {auth?.role === "admin" && (
                    <NavLink
                      to="admin/admin-dashboard"
                      className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      🏢 Admin Dashboard
                    </NavLink>
                  )}

                  {/* User Dashboard */}
                  {auth?.role === "user" && (
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
                </>
              )}

            </div>
          </div>
        )}
      </nav>
    </>
  );

};

export default Navbar