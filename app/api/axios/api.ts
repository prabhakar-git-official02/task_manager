import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_LOCAL_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use( (res) => res,async (err) => {
    const originalRequest = err.config;
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refreshLogin")
    ) {
      originalRequest._retry = true;

      try {
        console.log(" Trying refresh token...");

        await api.post("/api/auth/refreshLogin", {}, { withCredentials: true });

        console.log(" Token refreshed");

        return api(originalRequest);
      } catch (refreshErr) {
        console.log(" Refresh failed → logout");
        return Promise.reject(refreshErr);
      }
    }

    if (err.response?.status === 401) {
      console.log(" Session expired → login again");
    }

    return Promise.reject(err);
  }
);

export default api;