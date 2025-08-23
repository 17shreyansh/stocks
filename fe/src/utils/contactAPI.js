import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/contact/submit`, {
      ...formData,
      source: 'homepage'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit form' };
  }
};