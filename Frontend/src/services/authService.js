// src/services/authService.js

import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const authService = {
  login: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await axios.get(`${API_URL}/logout`);
      localStorage.removeItem("token");
    } catch (error) {
      throw error;
    }
  },
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, false otherwise
  },
};

export default authService;
