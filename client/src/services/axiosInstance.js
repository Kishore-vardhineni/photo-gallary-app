import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://13.127.122.73:3001/api",
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
       const token = localStorage.getItem("access_token");

       if(token) {
         config.headers.Authorization = `Bearer ${token}`;
       }
      return config
    }, (error) => {
         return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        if(error.response) {

            switch(error.response.status) {

                case 401:
                    console.log("Unauthorized - Token expired");
                    // localStorage.removeItem("access_token");
                    // window.location.href = "/signin";
                    break;

                case 403:
                    console.log("Forbidden access");
                    break;

                case 404: 
                    console.log("Page not found");
                    break;
                    
                case 500:
                    console.log("Server error");
                    break;
                    
                default:
                    console.log(error.response.data.message);
            } 
        }

        return Promise.reject(error);
    }
)


export default axiosInstance;