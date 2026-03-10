import login_image from "../assets/images/login_page_image.jpg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getResetPassword } from "../services/authService";
import { resetPasswodSchema } from "../validation/resetPasswordSchema";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const {
        register: resetPassword,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(resetPasswodSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await getResetPassword(data, token);
            toast.success(response.data.message);
            reset();
             navigate('/signin');
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }


    return (
        <div className="min-h-screen flex flex-col lg:flex-row">

            {/* LEFT SECTION */}
            <div className="w-full lg:w-1/2 bg-[#cfd6df] flex items-center justify-center px-6 py-10 sm:px-10 lg:px-20">

                <div className="bg-white w-full max-w-md sm:max-w-lg 
                        rounded-3xl shadow-2xl 
                        px-6 py-8 sm:px-10 sm:py-10">

                    <h2 className="text-3xl font-bold text-gray-800">
                        Reset Password
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Enter your email to reset your password.
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className="mt-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="Password"
                                placeholder="Enter your password"
                                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition-all duration-300"
                                {...resetPassword("password")}
                            />
                            <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-yellow-400/40 transition-all duration-300"
                        >
                            {isSubmitting ? "Reset Password In..." : "Send Reset Link"}
                        </button>
                        {/* <button
                            className="w-full mt-6 py-3 rounded-full font-semibold text-white
                       bg-gradient-to-r from-yellow-400 to-yellow-500
                       hover:opacity-90 transition duration-300 shadow-md"
                        >
                            Send Reset Link
                        </button> */}
                    </form>


                    {/* Back to login */}
                    <div className="mt-6 text-center text-sm">
                        <NavLink
                            to="/signin"
                            className="text-yellow-500 font-semibold ml-1 hover:underline"
                        >
                            Back to Login
                        </NavLink>
                        {/* <a href="/login" className="text-yellow-500 hover:underline">
                            
                        </a> */}
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION - IMAGE GALLERY */}
            <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center p-10">

                <img src={login_image} alt="" className="h-full w-full object-cover" />

            </div>

        </div>
    )
}

export default ResetPassword
