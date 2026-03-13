
import {
    LayoutDashboard,
    Users,
    Image,
    Folder,
    BarChart3,
    Phone,
    Settings
} from "lucide-react";

export const navbarMenu = {
    admin: [
        { name: "Admin Dashboard", path: "admin/admin-dashboard" },
        { name: "All Users", path: "/all-users" },
        { name: "Contact", path: "/contact" },
    ],
    user: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ],
};

export const SideMenubar = {
    admin: [
        { name: "Admin Dashboard", path: "admin/admin-dashboard", icon: LayoutDashboard },
        { name: "All Users", path: "admin/all-users", icon: Users },
        { name: "Photos", path: "/admin-photos", icon: Image },
        { name: "Categories", path: "admin/categories", icon: Folder },
        { name: "Reports", path: "admin/reports", icon: BarChart3 },
        { name: "Contacts", path: "admin/contact", icon: Phone },
        { name: "Settings", path: "admin/settings", icon: Settings },
    ],
        user: [
            { name: "Home", path: "/", icon: LayoutDashboard },
            { name: "Contact", path: "/contact", icon: Phone },
        ],
}
