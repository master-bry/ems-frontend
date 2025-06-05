import api from './api';

export const login = async (userData) => {
  const response = await api.post('/api/auth/login', userData);
  localStorage.setItem('username', userData.username);
  localStorage.setItem('password', userData.password);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const adminRegister = async (userData) => {
  const response = await api.post('/api/auth/register/admin', userData);
  return response.data;
};