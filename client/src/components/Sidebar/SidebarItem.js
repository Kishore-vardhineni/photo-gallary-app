import { NavLink } from "react-router-dom";
import { SideMenubar } from "./SideMenubar";
import logo from "../../assets/images/Photo_Gallary_Logo.png";

const SidebarItem = ({ role = "admin", isOpen, setIsOpen }) => {

  const menuItems = SideMenubar[role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 
        bg-gradient-to-b from-[#0f172a] to-black p-5 
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-8 flex">
          <div className="flex gap-1">
            <div className="flex items-center justify-center">
              <img src={logo} className="w-10 h-10 rounded-full border-2 border-gray-300" alt="logo" />
            </div>
          </div>
          <h1 className="text-white text-xl font-bold">
            {role === "admin" ? "Photo Gallary" : "Photo Gallery"}
          </h1>
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
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