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

export const getForgotPassword = async (data) => {
    return axiosInstance.post("/auth/forgot-password", data);
}

export const getResetPassword = async (data, token) => {
    return axiosInstance.post( `/auth/reset-password/${token}`, data);
}

