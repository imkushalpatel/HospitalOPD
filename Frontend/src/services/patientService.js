import axios from "axios";

const API_URL = "http://localhost:3000/api/patients";
// const headers = {
//   Authorization: localStorage.getItem("token"),
// };

const patientService = {
  getAllPatients: async () => {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  getTodayPatients: async () => {
    const response = await axios.get(`${API_URL}/today`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  getPatient: async (patientId) => {
    const response = await axios.get(`${API_URL}/${patientId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  addPatient: async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  deletePatient: async (patientId) => {
    const response = await axios.delete(`${API_URL}/${patientId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
};

export default patientService;
