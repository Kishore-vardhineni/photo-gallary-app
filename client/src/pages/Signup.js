import login_image from "../assets/images/login_page_image.jpg";
import { NavLink, useNavigate, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendOTP, signUp, verifyOTP } from "../services/authService";
import toast from "react-hot-toast";
import { signupSchema } from "../validation/signupSchema";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
];

export const Signup = () => {

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();


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
  const emailValue = watch("email") || "";

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

      if (!email) {
        toast.error("Enter email first");
      }

      if (!isValidEmail(email)) {
        toast.error("Enter a valid email");
      }

      const response = await sendOTP({ email });
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");

    if (!value) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  }

  const handleVerifyOtp = async () => {
    try {
      const enteredOtp = otp.join("");

      if (enteredOtp.length !== 6) {
        return toast.error("Enter complete OTP");
      }

      const email = watch("email");

      const response = await verifyOTP({
        email,
        otp: enteredOtp
      });
      toast.success(response.data.message);
      setOtpVerified(true);
      setOtpSent(false);

    } catch (error) {

    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await signUp({
        ...data,
        otp: otp.join("")
      });
      toast.success(response.data.message);
      reset();
      navigate("/signin")
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

      {/* LEFT SIDE */}
      <div className="lg:w-1/2 bg-black text-white p-6 md:p-10 flex flex-col justify-between">

        {/* Top Section */}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">📷 Photo Gallery</h1>

          </div>

          <div className="mt-8 md:mt-12">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Capture. Share. <br />
              <span className="text-blue-500">Inspire.</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-md">
              A place to store your memories and share your perspective.
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-6">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="gallery"
              className="rounded-xl object-cover h-28 sm:h-32 md:h-40 w-full hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 md:p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-blue-500 text-4xl mb-2">🖼️</div>
            <h2 className="text-xl md:text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">
              Login to access your photo gallery
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

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
                  {...register("email")}
                />

                {/* Button */}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!isValidEmail(emailValue) || otpSent}
                  className={`px-2 py-3 rounded-xl text-white font-semibold 
                  transition-all duration-200 shadow whitespace-nowrap
                  ${isValidEmail(emailValue) && !otpSent
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 cursor-pointer"
                      : "bg-yellow-200 cursor-not-allowed opacity-50"
                    }`}
                >
                  {otpSent ? "OTP Sent ✓" : "Send OTP"}
                </button>

              </div>
              <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>
            </div>

            {otpSent && (
              <div className="mt-4">

                <div className="flex items-center gap-1.5">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                  ))}

                  <button type="button" onClick={handleVerifyOtp} className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    Verify
                  </button>
                </div>

                <p className="text-gray-500 mt-2">
                  Valid for <span className="text-yellow-500 font-semibold">2:57</span>
                </p>
              </div>
            )}

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
    </div>
  )
}
