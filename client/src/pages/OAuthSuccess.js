import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const OAuthSuccess = () => {
   const navigate = useNavigate();
   const { login } = useAuth();
   
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const access_token = params.get("access_token");

    const userParam = params.get("user");
    const user = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

    const error = params.get("error");

    if (access_token && user) {
      const credentials = {
        access_token,
        user
      };

      login(credentials);

      navigate(user.role === "admin" ? "/admin/admin-dashboard" : "/");

    } else if (error) {
      toast.error(error);
      navigate("/signin"); // optional redirect
    }

  }, [login, navigate]);
  
  return (
    <div>Loading....</div>
  )
}

export default OAuthSuccess