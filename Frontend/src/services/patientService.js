import axios from "axios";

const API_URL = "http://localhost:3000/api/patients";

const patientService = {
  getAllPatients: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getPatientsAddedToday: async () => {
    try {
      const response = await axios.get(`${API_URL}/today`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addPatient: async (formData) => {
    try {
      const response = await axios.post(API_URL, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default patientService;
