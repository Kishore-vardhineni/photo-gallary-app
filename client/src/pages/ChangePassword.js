import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { changePasswordSchema } from "../validation/changePasswordSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getChangePassword } from "../services/authService";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register: changePassword,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await getChangePassword(data);
            toast.success(response.data.message);
            reset();
        } catch (error) {
            console.log("error", error)
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <div>
            <div className="flex-1 px-6 lg:px-10">

                {/* RIGHT CHANGE PASSWORD FORM */}
                <div className="w-full lg:w-3/4 p-6 sm:p-8">

                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                        Change Password
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Update your password to secure your account.
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6 max-w-lg">

                            {/* CURRENT PASSWORD */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Current Password
                                </label>
                                <div className="flex items-center border rounded-xl px-4 py-3">
                                    <Lock size={18} className="text-gray-400 mr-3" />
                                    <input
                                        type={showCurrent ? "text" : "password"}
                                        className="flex-1 outline-none"
                                        placeholder="Enter current password"
                                        {...changePassword("currentPassword")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrent(!showCurrent)}
                                    >
                                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-red-500 text-sm mb-2">{errors.oldPassword?.message}</p>
                            </div>

                            {/* NEW PASSWORD */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    New Password
                                </label>
                                <div className="flex items-center border rounded-xl px-4 py-3">
                                    <Lock size={18} className="text-gray-400 mr-3" />
                                    <input
                                        type={showNew ? "text" : "password"}
                                        className="flex-1 outline-none"
                                        placeholder="Enter new password"
                                         {...changePassword("newPassword")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                    >
                                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                 <p className="text-red-500 text-sm mb-2">{errors.newPassword?.message}</p>
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Confirm New Password
                                </label>
                                <div className="flex items-center border rounded-xl px-4 py-3">
                                    <Lock size={18} className="text-gray-400 mr-3" />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        className="flex-1 outline-none"
                                        placeholder="Confirm new password"
                                        {...changePassword("confirmPassword")}
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

                            {/* BUTTON */}
                            <div className="pt-4">
                                <button disabled={isSubmitting} className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-full shadow hover:scale-105 transition-all duration-300">
                                    Update Password
                                </button>
                            </div>

                        </div>
                    </form>


                </div>
            </div>

        </div>
    )
}

export default ChangePassword;