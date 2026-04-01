

const DeletePopupUser = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}>

            {/* Modal Box */}
            <div
                className="bg-white rounded-2xl shadow-xl w-full 
        max-w-md sm:max-w-lg md:max-w-xl
        p-6 sm:p-8 text-center animate-fadeIn"
            >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-4 rounded-full">
                        <span className="text-red-500 text-3xl">⚠️</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Are you sure?
                </h2>

                {/* Message */}
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Are you sure you want to delete this user?
                    <br />
                    This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    {/* Cancel */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    {/* Delete */}
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletePopupUser