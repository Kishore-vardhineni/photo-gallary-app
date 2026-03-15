import { Outlet } from "react-router-dom";
import SidebarItem from "../components/Sidebar/SidebarItem";
import { useState } from "react";
import Topbar from "../components/Sidebar/Topbar";


const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden"> 
           <SidebarItem role="admin" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

           <div className="flex flex-col flex-1">
              <Topbar setSidebarOpen={setSidebarOpen} />

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                     <Outlet /> 
              </div>

           </div>
        </div>
    )
}

export default AdminLayout;