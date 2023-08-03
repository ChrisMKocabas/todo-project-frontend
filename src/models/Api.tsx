import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4000/",
  baseURL: "https://todo-backend-m1by.onrender.com/",
});

// Add an interceptor to include the authorization header with the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
