import axios from "axios";

const API_URL = "http://localhost:3000/api/patients";
// const headers = {
//   Authorization: localStorage.getItem("token"),
// };

axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

const patientService = {
  getAllPatients: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getTodayPatients: async () => {
    const response = await axios.get(`${API_URL}/today`);
    return response.data;
  },
  getPatient: async (patientId) => {
    const response = await axios.get(`${API_URL}/${patientId}`);
    return response.data;
  },
  addPatient: async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
  },
  deletePatient: async (patientId) => {
    const response = await axios.delete(`${API_URL}/${patientId}`);
    return response.data;
  },
};

export default patientService;
