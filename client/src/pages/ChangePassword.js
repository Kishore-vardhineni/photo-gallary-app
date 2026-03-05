import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const ChangePassword = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


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
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrent(!showCurrent)}
                                    >
                                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
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
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                    >
                                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
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
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <div className="pt-4">
                                <button className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-full shadow hover:scale-105 transition-all duration-300">
                                    Update Password
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
           
        </div>
    )
}

export default ChangePassword;