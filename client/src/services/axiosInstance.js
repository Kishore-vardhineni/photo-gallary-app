import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        };
    });
    failedQueue = [];
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }, (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {

            if (originalRequest._retry) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((token) => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const res = await axios.post(
                    "http://localhost:3001/api/auth/refresh-token",
                    {},
                    { withCredentials: true }
                )
                const newAccessToken = res.data.access_token;
                localStorage.setItem("access_token", newAccessToken);

                axiosInstance.defaults.headers.common["Authorization"] =
                    `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                originalRequest.headers["Authorization"] =
                    `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);

            } catch (err) {
                processQueue(err, null);

                localStorage.removeItem("access_token");
                window.location.href = "/signin";

                return Promise.reject(err)
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
)


export default axiosInstance;