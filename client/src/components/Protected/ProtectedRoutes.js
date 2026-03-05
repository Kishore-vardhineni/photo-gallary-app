import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const ProtectedRoutes = ({ children, allowedRole }) => {

    const { isAuthenticated, auth } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // 🔐 Role protection
    if (allowedRole && auth?.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoutes;