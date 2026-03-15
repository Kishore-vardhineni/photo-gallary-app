import { NavLink } from "react-router-dom";
import { SideMenubar } from "./SideMenubar";
import logo from "../../assets/images/Photo_Gallary_Logo.png";
import { X } from "lucide-react";

const SidebarItem = ({ role = "admin", sidebarOpen, setSidebarOpen }) => {

  const menuItems = SideMenubar[role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed z-50 lg:static
        inset-y-0 left-0
        w-64
        bg-[#0f172a]
        text-white
        transform
        transition-transform
        duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">

          <div>
              <img src={logo} className="w-10 h-10 rounded-full border-2 border-gray-300" alt="logo" />
          </div>
           <h1 className="text-white text-xl font-bold">
            {role === "admin" ? "Photo Gallary" : "Photo Gallery"}
          </h1>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>

        </div>


        {/* Menu */}
        <nav className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-yellow-500 text-black font-semibold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  )
}

export default SidebarItem