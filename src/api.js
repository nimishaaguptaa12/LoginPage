import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const submitUser = async (formData) => {
  const data = new FormData();
  data.append('name', formData.name);
  data.append('email', formData.email);
  data.append('category', formData.category);
  data.append('rating', formData.rating);
  if (formData.image) {
    data.append('image', formData.image);
  }

  return axios.post(`${API_BASE_URL}/users`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchUsers = async () => {
  return axios.get(`${API_BASE_URL}/users`);
};