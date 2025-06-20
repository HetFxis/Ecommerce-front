import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const RefreshAccessToken = async () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const response = await axios.post(`${baseURL}/accounts/refreshtoken/`, {
      refresh_token,
    });
    const newAccessToken = response.data.access_token;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    window.location.href = "/login";
    throw error;
  }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const IsAuthenticated = localStorage.getItem("IsAuthenticated");
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      IsAuthenticated
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await RefreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError.message);
      }
    }

    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
