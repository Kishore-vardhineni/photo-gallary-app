import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { About } from "../pages/About";
import Contact from "../pages/Contact";
import Signin from "../pages/Signin";
import { Signup } from "../pages/Signup";
import MainLayout from "../layouts/MainLayout";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AllUsers from "../pages/AllUsers";
import ProtectedRoutes from "../components/Protected/ProtectedRoutes";
import AdminLayout from "../layouts/AdminLayout";
import ForgotPassword from "../pages/ForgotPassword";
import AdminPhotos from "../pages/AdminPhotos";
import ResetPassword from "../pages/ResetPassword";
import ChangePassword from "../pages/ChangePassword";
import SettingsLayout from "../pages/SettingsLayout";

const AppRoutes = () => {
  return (
    <>
      <Routes>

        {/* Routes WITH Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/user-dashboard" element={
            <ProtectedRoutes allowedRole="user">
              <UserDashboard />
            </ProtectedRoutes>
          }
          />
        </Route>

        {/* ================= ADMIN LAYOUT ================= */}
      <Route element={<AdminLayout />}>

        <Route
          path="admin/admin-dashboard"
          element={
            <ProtectedRoutes allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="admin/all-users"
          element={
            <ProtectedRoutes allowedRole="admin">
              <AllUsers />
            </ProtectedRoutes>
          }
        />

        <Route
          path="admin/admin-photos"
          element={
            <ProtectedRoutes allowedRole="admin">
              <AdminPhotos />
            </ProtectedRoutes>
          }
        />

        {/* ================= SETTINGS NESTED ROUTES ================= */}
        <Route
          path="admin/settings"
          element={
            <ProtectedRoutes allowedRole="admin">
              <SettingsLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<ChangePassword />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

      </Route>



        {/* Routes WITHOUT Navbar & Footer */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

    </>
  )
}

export default AppRoutes;