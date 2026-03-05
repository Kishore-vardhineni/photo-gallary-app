import { Outlet } from "react-router-dom";
import SidebarItem from "../components/Sidebar/SidebarItem";
import { useState } from "react";


const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarItem role="admin" isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                <Outlet />   {/* ✅ VERY IMPORTANT */}
            </div>
        </div>
    )
}

export default AdminLayout;