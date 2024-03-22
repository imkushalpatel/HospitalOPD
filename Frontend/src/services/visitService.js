import axios from "axios";

const API_URL = "http://localhost:3000/api/visits";
// const headers = {
//   Authorization: localStorage.getItem("token"),
// };

const visitService = {
  getAllVisits: async () => {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  getTodayVisits: async () => {
    const response = await axios.get(`${API_URL}/today`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  addVisit: async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
  deleteVisit: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  },
};

export default visitService;
