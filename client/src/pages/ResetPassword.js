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

                    <h2 className="text-3xl font-bold text-gray-800">
                        Reset Password
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Enter your email to reset your password.
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

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

                    </form>

                    {/* Back to login */}
                    <div className="mt-6 text-center text-sm">
                        <NavLink
                            to="/signin"
                            className="text-yellow-500 font-semibold ml-1 hover:underline"
                        >
                            Back to Login
                        </NavLink>
                    </div>

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

export default ResetPassword
