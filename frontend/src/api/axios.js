import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // dynamic base URL
  withCredentials: true, // if using cookies/auth
});

export default instance;
