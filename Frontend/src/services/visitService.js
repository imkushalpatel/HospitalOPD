// src/services/visitService.js

import axios from "axios";

const API_URL = "http://localhost:3000/api/visits";

const visitService = {
  getAllVisits: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTodaysVisitsForDoctor: async () => {
    try {
      const response = await axios.get(`${API_URL}/today`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addVisit: async (formData) => {
    try {
      const response = await axios.post(API_URL, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default visitService;
