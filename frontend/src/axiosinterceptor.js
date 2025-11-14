import axios from "axios";


const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        console.log("the access token",accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
