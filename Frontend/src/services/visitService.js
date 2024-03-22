import axios from "axios";

const API_URL = "http://localhost:3000/api/visits";
// const headers = {
//   Authorization: localStorage.getItem("token"),
// };

axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});
const visitService = {
  getAllVisits: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getTodayVisits: async () => {
    const response = await axios.get(`${API_URL}/today`);
    return response.data;
  },
  addVisit: async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
  },
  deleteVisit: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default visitService;
