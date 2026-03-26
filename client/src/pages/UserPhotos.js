import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { getPhotoFindById } from "../services/authService";
import { NavLink } from "react-router-dom";


const UserPhotos = () => {

  const [userPhoto, setUserPhoto] = useState([0]);
  console.log("data", userPhoto);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getPhotoFindById();
        setUserPhoto(res?.data?.filedetails || []);
      } catch (error) {
         if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="
  min-h-screen 
  bg-gradient-to-br from-gray-100 via-purple-100 to-blue-100
  p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10
">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Photos
        </h1>

        <button className="
      bg-yellow-500 hover:bg-yellow-600 
      text-black font-semibold 
      px-4 py-2 rounded-xl shadow
      w-full sm:w-auto
    ">
          <NavLink to="/add-photo">Add Photo</NavLink>
        </button>
      </div>

      {/* ================= SUCCESS MESSAGE ================= */}
      {/* <div className="
    bg-green-100 text-green-700 
    p-3 sm:p-4 rounded-xl 
    flex justify-between items-center
    mb-6
  ">
        <span className="text-sm sm:text-base">
          ✔ Photo uploaded successfully!
        </span>
        <span className="cursor-pointer text-lg">✕</span>
      </div> */}

      {/* ================= FILTER BAR ================= */}
      <div className="
    flex flex-col 
    md:flex-row 
    gap-3 mb-6
  ">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search photos..."
          className="
        flex-1 
        bg-gray-800 text-white
        px-4 py-3 
        rounded-xl 
        outline-none
      "
        />

        {/* CATEGORY */}
        <select className="bg-gray-800 text-white px-4 py-3 rounded-xl">
          <option>All Categories</option>
        </select>

        {/* SORT */}
        <select className="bg-gray-800 text-white px-4 py-3 rounded-xl">
          <option>Newest</option>
        </select>

        {/* ADD BUTTON */}
        <button className="
      bg-yellow-500 text-black 
      px-4 py-2 rounded-xl 
      font-semibold
    ">
          + Add
        </button>
      </div>

      {/* ================= PHOTO GRID ================= */}
      <div className="w-full">

        {!userPhoto?.length ? (
          <p className="text-center py-10 text-gray-500">
            No Data Available
          </p>
        ) : (

          <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-5
    ">

            {userPhoto?.map((photo) => (
              <div
                key={photo._id}  
                className="
            bg-white rounded-2xl 
            shadow-md hover:shadow-xl 
            transition duration-300
            overflow-hidden
          "
              >

                {/* IMAGE */}
                <img
                  src={photo.url}
                  className="w-full h-40 object-cover"
                  alt={photo.title || "photo"}
                />

                {/* CONTENT */}
                <div className="p-4">

                  <h3 className="text-lg font-semibold text-gray-800">
                    {photo.title || "Photo Title"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(photo.createdAt).toDateString()}
                  </p>

                  {/* USER + ACTIONS */}
                  <div className="flex items-center justify-between mt-3">

                    <div className="flex items-center gap-2">
                      <img
                        src={photo.user?.avatar || "https://i.pravatar.cc/30"}
                        className="w-7 h-7 rounded-full"
                        alt=""
                      />
                      <span className="text-sm text-gray-700">
                        {photo.author || "User"}
                      </span>
                    </div>

                    <div className="flex gap-3 text-gray-500">
                      <span className="cursor-pointer hover:text-blue-500">👁</span>
                      <span className="cursor-pointer hover:text-orange-500">✏️</span>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        )}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-end mt-8 gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded">1</button>
        <button className="px-3 py-1 bg-gray-200 rounded">2</button>
        <button className="px-3 py-1 bg-yellow-500 text-black rounded">
          Next
        </button>
      </div>

    </div>
  )
}

export default UserPhotos