import { useForm } from "react-hook-form";
import login_image from "../assets/images/login_page_image.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { singinSchema } from "../validation/signinSchema";
import toast from "react-hot-toast";
import { signIn } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";


const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: singin,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(singinSchema),
    defaultValues: {
      role: "user",
    },
  });

  const password = watch("password") || "";

  // password checks
  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
    length: password.length >= 8
  };

  const Rule = ({ valid, text }) => (
    <p
      className={`flex items-center gap-2 text-sm transition-all duration-200 ${valid ? "text-green-600" : "text-gray-400"
        }`}
    >
      <span>{valid ? "✔" : "○"}</span>
      {text}
    </p>
  );

  const onSubmit = async (data) => {
    try {
      const { data: resData } = await signIn(data);
      toast.success(resData.message);
      login(resData);
      reset();
      if (resData.user.role === "admin") {
        navigate("/admin/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error", error)
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };
  
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* FORM SECTION */}
      <div className="flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 p-10">

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[420px]">

          <h1 className="text-2xl font-bold text-gray-800">
            Photo Gallery
          </h1>

          <p className="text-gray-500 mb-6 text-sm">
            The Faster You Fill Up The Faster You Enjoy!
          </p>


          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition-all duration-300"
                {...singin("email")}
              />
              <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>
              <div className="flex items-center border rounded-xl px-4 py-3">
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex-1 outline-none"
                  placeholder="Enter password"
                  {...singin("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>
            </div>

            {/* Password Rules */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              <Rule valid={checks.uppercase} text="1 Uppercase letter" />
              <Rule valid={checks.lowercase} text="1 Lowercase letter" />
              <Rule valid={checks.number} text="1 Number" />
              <Rule valid={checks.special} text="1 Special character" />
              <Rule valid={checks.length} text="Minimum 8 characters" />
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-yellow-500" />
                Remember me
              </label>

              <span className="text-yellow-500 hover:underline cursor-pointer">
                <NavLink to="/forgot-password">
                  Forgot Password
                </NavLink>
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-yellow-400/40 transition-all duration-300"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>


          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?
            <NavLink
              to="/signup"
              className="text-yellow-500 font-semibold ml-1 hover:underline"
            >
              Sign Up
            </NavLink>
          </p>

        </div>

      </div>


      {/* IMAGE GALLERY */}
      <div className="bg-gray-50">

        <div >

          <img src={login_image} alt="" className="h-full w-full object-cover" />

        </div>

      </div>

    </div>
  )
}

export default Signin