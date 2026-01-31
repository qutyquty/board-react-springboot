import axios from "axios";

const AxiosCommon = axios.create({
  baseURL: "http://localhost:8080/api",
});

// JWT용
AxiosCommon.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosCommon;