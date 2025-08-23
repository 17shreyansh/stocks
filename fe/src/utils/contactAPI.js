import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL ;

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