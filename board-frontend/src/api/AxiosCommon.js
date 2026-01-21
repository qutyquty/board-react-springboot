import axios from "axios";

const AxiosCommon = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosCommon;