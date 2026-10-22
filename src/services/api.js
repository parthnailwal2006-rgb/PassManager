
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("localvault_token");

    // Don't attach an invalid placeholder token
    if (token && token !== "undefined" && token !== "null") {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // Only handle 401s from protected endpoints.
    // Incorrect login credentials should remain on the login page.
    const isAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register");

    if (status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("localvault_token");
      localStorage.removeItem("localvault_user");

      // Redirect only if the user isn't already on the login page.
      if (window.location.pathname !== "/") {
      window.location.href = "/";
}
    }

    return Promise.reject(error);
  }
);

export default api;