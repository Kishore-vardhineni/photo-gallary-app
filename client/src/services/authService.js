import axiosInstance from "./axiosInstance";

export const signUp = async (data) => {
    return axiosInstance.post("/auth/signup", data);
}

export const sendOTP = async (data) => {
    return axiosInstance.post("/auth/send-otp", data);
}

export const signIn = async (data) => {
    return axiosInstance.post("/auth/signin", data);
}

export const getRefreshToken = async () => {
    return axiosInstance.post( `/auth/refresh-token`, {}, {
         withCredentials: true
    });
}

export const getAllUsers = async () => {
    return axiosInstance.get("/users/getallusers");
}

export const getFindByUserId = async (id) => {
   return axiosInstance.get(`/users/getfindbyuserid/${id}`);
}

export const getupdatedByUserid = async (id, data) => {
    return axiosInstance.put(`/users/getupdatedbyuserid/${id}`, data);
}

export const getDeleteByUserId = async (id) => {
    return axiosInstance.delete(`/users/deleteByUserId/${id}`);
}

export const getTotalUsers = async () => {
    return axiosInstance.get("/users/total-users")
}

export const getDownloadUsersCSV = async (search = "") => {
    return axiosInstance.get("/users/export/csv", {
        params: { search },
        responseType: "blob"
    });
}

export const getDownloadUsersExcel = async (search = "") => {
    return axiosInstance.get("/users/export/excel", {
        params: { search },
        responseType: "blob"
    });
}

export const getRecentUsers = async () => {
    return axiosInstance.get("/users/recent-users")
}

export const getTotalPhotos = async () => {
    return axiosInstance.get("/files/total-photos")
}
export const getForgotPassword = async (data) => {
    return axiosInstance.post("/auth/forgot-password", data);
}

export const getResetPassword = async (data, token) => {
    return axiosInstance.post( `/auth/reset-password/${token}`, data);
}

export const getChangePassword = async (data) => {
    return axiosInstance.post( `/auth/change-password`, data);
}

export const getAllPhotos = async () => {
    return axiosInstance.get( `/files/get-files`);
}

export const getPhotoFindById = async () => {
    return axiosInstance.get( `/files/getphotofindbyid`);
}

export const getUplaodFile = async (data, onUploadProgress) => {
    return axiosInstance.post( `/files/upload`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );

            // send ONLY percentage to component
            if (onUploadProgress) {
                onUploadProgress(percentCompleted);
            }
        }
    });
}

