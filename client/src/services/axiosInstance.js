import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://13.127.122.73:3001/api",
    headers: {
        "Content-Type": "application/json"
    }
})
export default axiosInstance;