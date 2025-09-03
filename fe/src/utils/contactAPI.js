import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/contact/lead`, {
      ...formData,
      formType: formData.formType || 'homepage'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit form' };
  }
};

export const contactAPI = {
  getContent: async () => {
    try {
      const response = await axios.get(`${API_BASE}/contact/content`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  saveContent: async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/contact/content`, data, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default { submitContactForm, contactAPI };