import login_image from "../assets/images/login_page_image.jpg";
import { Navigate, NavLink, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendOTP, signUp } from "../services/authService";
import toast from "react-hot-toast";
import { signupSchema } from "../validation/signupSchema";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

export const Signup = () => {

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const { register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      role: "user",
    },
  });

  const password = watch("password") || "";

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

  const handleSendOtp = async () => {
    try {
      const email = watch("email");

      if(!email) {
        return toast.error("Enter email first");
      }

      const response = await sendOTP({ email });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await signUp(data);
      toast.success(response.data.message);
      reset();
      Navigate("/signin")
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* FORM SECTION */}
      <div className="flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 p-10">

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[480px]">

          <h1 className="text-2xl font-bold text-gray-800">
            Photo Gallery
          </h1>

          <p className="text-gray-500 mb-6 text-sm">
            The Faster You Fill Up The Faster You Enjoy!
          </p>


          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Role */}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                Role <span className="text-red-500">*</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="user"
                  {...register("role")}
                  className="w-4 h-4"
                />
                <span>User</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="admin"
                  {...register("role")}
                  className="w-4 h-4"
                />
                <span>Admin</span>
              </label>
              <p className="text-red-500 text-sm">{errors.role?.message}</p>
            </div>

            {/* Username */}
            <div>
              <label className="block font-medium">
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your user name"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition-all duration-300"
                {...register("username")}
              />
              <p className="text-red-500 text-sm mb-2">{errors.username?.message}</p>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-2">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-yellow-400 
                 text-gray-700 placeholder-gray-400"
                  {...register("username")}
                />

                {/* Button */}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-2 py-3 rounded-xl 
                 bg-gradient-to-r from-yellow-400 to-yellow-500 
                 text-white font-semibold 
                 hover:from-yellow-500 hover:to-yellow-600 
                 transition-all duration-200 shadow"
                >
                  Send OTP
                </button>
                
              </div>
              <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>
            </div>

            {otpVerified && (
              <>
                {/* Password */}
                <div>
                  <label className="block font-medium">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border rounded-xl px-4 py-3">
                    <Lock size={18} className="text-gray-400 mr-3" />
                    <input
                      type={showNew ? "text" : "password"}
                      className="flex-1 outline-none"
                      placeholder="Enter new password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>
                </div>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  <Rule valid={checks.uppercase} text="1 Uppercase letter" />
                  <Rule valid={checks.lowercase} text="1 Lowercase letter" />
                  <Rule valid={checks.number} text="1 Number" />
                  <Rule valid={checks.special} text="1 Special character" />
                  <Rule valid={checks.length} text="Minimum 8 characters" />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 font-medium">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border rounded-xl px-4 py-3">
                    <Lock size={18} className="text-gray-400 mr-3" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      className="flex-1 outline-none"
                      placeholder="Confirm new password"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-red-500 text-sm mb-2">{errors.confirmPassword?.message}</p>
                </div>
              </>
            )}


            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>



          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?
            <span className="text-yellow-500 font-semibold ml-1 cursor-pointer hover:underline">
              <NavLink to="/signin">Sign In</NavLink>
            </span>
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
