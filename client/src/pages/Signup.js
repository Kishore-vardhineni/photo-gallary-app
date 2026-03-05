import login_image from "../assets/images/login_page_image.jpg";
import { Navigate, NavLink, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp } from "../services/authService";
import toast from "react-hot-toast";
import { signupSchema } from "../validation/signupSchema";

export const Signup = () => {

  const { register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      role: "user",
    },
  });

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
    <div className="min-h-screen flex">

      {/* LEFT SIDE (Gradient Background) */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 p-10">

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[420px]">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Photo Gallery
          </h2>

          <p className="text-gray-600 mb-8">
            The Faster You Fill Up The Faster You Enjoy!
          </p>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex items-center gap-6">

              <label className="text-gray-600 font-medium">
                Role
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


            <div>
              <label className="text-sm text-gray-600">User Name</label>
              <input
                type="text"
                placeholder="Enter your user name"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition-all duration-300"
                {...register("username")}
              />
              <p className="text-red-500 text-sm mb-2">{errors.username?.message}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition-all duration-300"
                {...register("email")}
              />
              <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition-all duration-300"
                {...register("password")}
              />
              <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition-all duration-300"
                {...register("confirmPassword")}
              />
              <p className="text-red-500 text-sm mb-2">{errors.confirmPassword?.message}</p>
            </div>

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


      {/* RIGHT SIDE (White Background) */}
      <div className="w-1/2 flex items-center justify-center bg-white">


        <img src={login_image} alt="" className="h-full w-full object-cover" />


      </div>

    </div>
  )
}
