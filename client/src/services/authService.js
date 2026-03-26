import axiosInstance from "./axiosInstance";

export const signUp = async (data) => {
    return axiosInstance.post("/auth/signup", data);
}

export const signIn = async (data) => {
    return axiosInstance.post("/auth/signin", data);
}

export const getAllUsers = async () => {
    return axiosInstance.get("/users/getallusers");
}

export const getTotalUsers = async () => {
    return axiosInstance.get("/users/total-users")
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