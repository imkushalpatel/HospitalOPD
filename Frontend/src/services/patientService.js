import axios from "axios";

const API_URL = "http://localhost:3000/api/patients";
const headers = {
  Authorization: localStorage.getItem("token"),
};

const patientService = {
  getAllPatients: async () => {
    try {
      const response = await axios.get(API_URL, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTodayPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/today`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getPatient: async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/${patientId}`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addPatient: async (formData) => {
    try {
      const response = await axios.post(API_URL, formData, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default patientService;
