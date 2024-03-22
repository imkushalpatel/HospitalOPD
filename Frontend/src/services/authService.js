import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";
// const headers = {
//   Authorization: localStorage.getItem("token"),
// };

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
    await axios.get(`${API_URL}/logout`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },

  getUser: async () => {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/user/all`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_URL}/user/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
};

export default authService;
