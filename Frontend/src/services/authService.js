import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";
const headers = {
  Authorization: localStorage.getItem("token"),
};

const authService = {
  login: async (formData) => {
    const response = await axios.post(`${API_URL}/login`, formData);
    return response.data;
  },
  register: async (formData) => {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  },
  logout: async () => {
    await axios.get(`${API_URL}/logout`, { headers });
  },
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },
};

export default authService;
