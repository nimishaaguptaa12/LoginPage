import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const createUser = (userData) => {
  const formData = new FormData();
  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('age', userData.age);
  formData.append('rating', userData.rating);
  
  if (userData.profilePicture) {
    formData.append('profilePicture', userData.profilePicture);
  }

  return API.post('/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};