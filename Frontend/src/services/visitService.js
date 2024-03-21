import axios from "axios";

const API_URL = "http://localhost:3000/api/visits";
const headers = {
  Authorization: localStorage.getItem("token"),
};

const visitService = {
  getAllVisits: async () => {
    try {
      const response = await axios.get(API_URL, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTodayVisits: async () => {
    try {
      const response = await axios.get(`${API_URL}/today`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addVisit: async (formData) => {
    try {
      const response = await axios.post(API_URL, formData, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteVisit: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default visitService;
